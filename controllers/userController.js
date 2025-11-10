const User = require("../modules/authModule");

// get User page
const getProfilePage = async (req, res) => {
  try {
    const userProfile = await User.findOne({ username: req.params.username }).populate("posters").lean();

      console.log("userProfile._id", userProfile._id)
    let isMe = false;
    if (req.session.user) {
      isMe = userProfile._id.toString() == req.session.user._id.toString();
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

const updateProfile = async (req, res) => {
  try {
    res.render("user/update", {
      title: req.session.user.username,
      user: req.session.user,
      isAuth: req.session.isLogged,
      url: process.env.URL,
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { getProfilePage, updateProfile };
