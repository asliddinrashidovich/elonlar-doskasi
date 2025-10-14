const getLoginPage = (req,res) => {
    res.render("auth/login", {
        title: "Login",
        url: process.env.URL
    })
}

const getRegisterPage = (req,res) => {
    res.render("auth/signup", {
        title: "Signup",
        url: process.env.URL
    })
}

module.exports = {
    getLoginPage,
    getRegisterPage
}