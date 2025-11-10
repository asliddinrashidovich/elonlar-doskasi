const Poster = require("../modules/postersModule");

const getHomePage = async (req, res) => {
  try {
    const posters = await Poster.find().lean();
    res.render("home", {
      title: "home",
      posters: posters.reverse(),
      user: req.session.user,
      isLogged: req.session.isLogged,
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getHomePage,
};
