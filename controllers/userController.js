const User = require("../modules/authModule");

// get User page
const getProfilePage = async (req, res) => {
  try {
    const userProfile = await User.findOne({ username: req.params.username })
      .populate("posters")
      .lean();

    let isMe = false;
    if (req.session.user) {
      isMe = userProfile._id == req.session.user._id.toString();
    }
    res.render("user/profile", {
      title: `${userProfile.username}`,
      user: req.session.user,
      userProfile,
      isMe,
      myposters: req.session.user.username,
      posters: userProfile.posters,
      isAuth: req.session.isLogged,
      url: process.env.URL,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = getProfilePage;
