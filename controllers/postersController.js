const { v4 } = require("uuid")
const { addNewPosterToDB, getAllPosters, getPosterByID, editPosterBydId, deletePosterById } = require("../db/posters")

const posterController = async (req, res) => {
    const posters = await getAllPosters()
    res.render("posters/posters", {
        title: "posters",
        url: process.env.URL,
        posters
    })
}

const getOnePoster = async (req, res) => {
    const poster = await getPosterByID(req.params.id)
    res.render("posters/one", {
        title: poster.title,
        poster
    })
}

const updatePoster = async (req, res) => {
    const editedPoster = {
        title: req.body.title,
        amount: req.body.amount,
        image: req.body.image,
        region: req.body.region,
        description: req.body.description,
    }
    await editPosterBydId(req.params.id, editedPoster)
    res.redirect("/posters")
}

const deletePoster = async (req, res) => {
    await deletePosterById(req.params.id)
    res.redirect("/posters")
}

const getEditPosterPage = async (req, res) => {
    const poster = await getPosterByID(req.params.id)
    res.render("posters/edit-poster", {
        title: "Edit poster",
        poster
    })
}

const addPosterController = (req, res) => {
    res.render("posters/add-posters", {
        title: "Add posters",
        url: process.env.URL
    })
}

const addNewPosterController = async (req, res) => {
    const poster = {
        id: v4(),
        title: req.body.title,
        amount: req.body.amount,
        region: req.body.region,
        image: req.body.image,
        description: req.body.description
    }
    await addNewPosterToDB(poster)
    res.redirect("/")
}


module.exports = {
    posterController,
    addPosterController,
    addNewPosterController,
    getOnePoster,
    getEditPosterPage,
    updatePoster,
    deletePoster
}