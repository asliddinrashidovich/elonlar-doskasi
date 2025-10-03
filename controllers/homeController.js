const homeController = (req, res) => {
    res.render("home", {
        title: "home"
    })
}

module.exports = {
    homeController
}