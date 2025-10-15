const Poster = require("../modules/postersModule");
const User = require("../modules/authModule");

const posterController = async (req, res) => {
  try {
    const posters = await Poster.find().lean();
    res.render("posters/posters", {
      title: "posters",
      url: process.env.URL,
      posters: posters.reverse(),
    });
  } catch (error) {
    console.log(error);
  }
};

const getOnePoster = async (req, res) => {
  try {
    const poster = await Poster.findByIdAndUpdate(req.params.id, { $inc: { visits: 1 }}, { new: true }).lean();
    res.render("posters/one", {
      title: poster?.title,
      url: process.env.URL,
      user: req.session.user,
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
      description: req.body.description,
    })
    await User.findByIdAndUpdate(req.session.user._id, 
      { $push: {posters: newPoster._id}},
      { new: true, upsert: true}
    )
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
