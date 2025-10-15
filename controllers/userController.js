const User = require("../modules/authModule");

// get User page
const getProfilePage = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .populate("posters")
      .lean();

    res.render("user/profile", {
      title: `${user.username}`,
      user,
      posters: user.posters,
      isAuth: req.session.isLogged,
      url: process.env.URL,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = getProfilePage;
