const Poster = require("../modules/postersModule");
const User = require("../modules/authModule");
const filtering = require("../utils/filtering");

const posterController = async (req, res) => {
  try {
    const pageLimit = 10
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const total = await Poster.countDocuments()
    
    // redirect
    if(req.url === "/") {
      return res.redirect(`?page=1&limit=${pageLimit}`)
    }
    if (req.query.search) {
      const { search } = req.query;
      const posters = await Poster.searchPartial(search).lean();

      return res.status(200).render("posters/searchResult", {
        title: "Search results",
        url: process.env.URL,
        posters: posters.reverse(),
        querySearch: req.query.search,
        user: req.session.user,
      });
    }

    if (!req.query.limit || !req.query.page) {
      const { from, to, region } = req.query;

      const filterings = filtering(from, to, region);
      const posters = await Poster.find(filterings).lean();
      return res.render("posters/searchResult", {
        title: "Filter results",
        url: process.env.URL,
        posters: posters.reverse(),
        querySearch: req.query.search,
        user: req.session.user,
      });
    }
    const posters = await Poster
      .find()
      .sort({createdAt: -1})
      .skip((page*limit)-limit)
      .limit(limit)  
      .lean()
    return res.render("posters/posters", {
      title: "posters",
      pagination: {
        page,
        limit,
        pageCount: Math.ceil(total/limit)
      },
      url: process.env.URL,
      posters: posters.reverse(),
      user: req.session.user,
    });
  } catch (error) {
    console.log(error);
  }
};

const getOnePoster = async (req, res) => {
  try {
    const poster = await Poster.findByIdAndUpdate(
      req.params.id,
      { $inc: { visits: 1 } },
      { new: true }
    )
      .populate("author")
      .lean();
    res.render("posters/one", {
      title: poster?.title,
      url: process.env.URL,
      user: req.session.user,
      author: poster.author,
      poster,
    });
  } catch (error) {
    console.log(error);
  }
};

const updatePoster = async (req, res) => {
  try {
    const editedPoster = {
      title: req.body.title,
      amount: req.body.amount,
      image: req.body.image,
      region: req.body.region,
      description: req.body.description,
    };
    await Poster.findByIdAndUpdate(req.params.id, editedPoster).lean();
    res.redirect("/posters");
  } catch (error) {
    console.log(error);
  }
};

const deletePoster = async (req, res) => {
  await Poster.findByIdAndDelete(req.params.id).lean();
  res.redirect("/posters");
};

const getEditPosterPage = async (req, res) => {
  const poster = await Poster.findById(req.params.id).lean();
  res.render("posters/edit-poster", {
    title: "Edit poster",
    poster,
  });
};

const addPosterController = (req, res) => {
  res.render("posters/add-posters", {
    title: "Add posters",
    url: process.env.URL,
  });
};

const addNewPosterController = async (req, res) => {
  try {
    const newPoster = new Poster({
      title: req.body.title,
      amount: req.body.amount,
      region: req.body.region,
      image: "uploads/" + req.file.filename,
      author: req.session.user._id,
      description: req.body.description,
    });
    await User.findByIdAndUpdate(
      req.session.user._id,
      { $push: { posters: newPoster._id } },
      { new: true, upsert: true }
    );
    const savedPoster = await newPoster.save();
    res.redirect("/posters/" + savedPoster._id);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  posterController,
  addPosterController,
  addNewPosterController,
  getOnePoster,
  getEditPosterPage,
  updatePoster,
  deletePoster,
};
