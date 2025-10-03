const posterController = (req, res) => {
    res.render("posters/posters", {
        title: "posters",
        url: process.env.URL
    })
}

const addPosterController = (req, res) => {
    res.render("posters/add-posters", {
        title: "Add posters",
        url: process.env.URL
    })
}

const addNewPosterController = (req, res) => {
    console.log(req.body);
}


module.exports = {
    posterController,
    addPosterController,
    addNewPosterController
}