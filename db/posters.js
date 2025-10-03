const fs = require('fs');
const path = require('path');

const addNewPosterToDB = async (poster) => {
    const data = () => fs.readFileSync(path.join(__dirname, "db.json"), "utf-8")
    const db = JSON.parse(data())
    db.push(poster)
    fs.writeFile(path.join(__dirname, "db.json"), JSON.stringify(db), (err) => {
        if (err) throw err
    })
}

const getAllPosters = async () => {
    const data = () => fs.readFileSync(path.join(__dirname, "db.json"), "utf-8")
    const posters = JSON.parse(data())
    return posters
}

const getPosterByID = async (id) => {
    const data = () => fs.readFileSync(path.join(__dirname, "db.json"), "utf-8")
    const posters = JSON.parse(data())
    const poster = posters.find(p => p.id === id)
    return poster
}

const editPosterBydId = async (id, newPoster) => {
    const data = () => fs.readFileSync(path.join(__dirname, "db.json"), "utf-8") 
    const posters = JSON.parse(data())
    const index = posters.findIndex(p => p.id === id)
    posters[index] = {
        id: posters[index].id,
        title: newPoster.title,
        amount: newPoster.amount,
        region: newPoster.region,
        image: newPoster.image,
        description: newPoster.description
    }
    fs.writeFileSync(path.join(__dirname, "db.json"), JSON.stringify(posters), "utf-8")
}

const deletePosterById = async (id) => {
    const data = () => fs.readFileSync(path.join(__dirname, "db.json"), "utf-8")
    let posters = JSON.parse(data())
    posters = posters.filter(p => p.id != id)
    fs.writeFileSync(path.join(__dirname, "db.json"), JSON.stringify(posters), "utf-8")
}

module.exports = {
    addNewPosterToDB,
    getAllPosters,
    getPosterByID,
    editPosterBydId,
    deletePosterById
}