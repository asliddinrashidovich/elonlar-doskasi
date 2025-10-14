const User = require("../modules/authModule")

// get login page
const getLoginPage = (req,res) => {
    res.render("auth/login", {
        title: "Login",
        url: process.env.URL
    })
}

// get singUP page
const getRegisterPage = (req,res) => {
    res.render("auth/signup", {
        title: "Signup",
        url: process.env.URL
    })
}

// sign up method
const registerNewUser = async (req,res) => {
    try {
        const {email, password, phone, username, password2} = req.body
        const isExist = await User.findOne({email})

        if(isExist) {
            return res.redirect("/auth/signup")
        }

        if(password !== password2) {
            return res.redirect("/auth/signup")
        }

        await User.create({
            email,
            password,
            username,
            phone,
        })
        return res.redirect("/auth/login")

    } catch (error) {
        console.log(error)
    }
}

// login method 

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        const isExist = await User.findOne({email})

        if(isExist) {
            const matchPassword = isExist.password === password
            if(matchPassword) {
                req.session.user = isExist,
                req.session.isLogged = true,
                req.session.save(err => {
                    if(err) throw err
                    res.redirect(`/profile/${req.session.user.username}`)
                })
            } else {
                res.redirect("/auth/login")
            }
        } else {
            res.redirect("/auth/login")
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getLoginPage,
    getRegisterPage,
    registerNewUser,
    loginUser
}