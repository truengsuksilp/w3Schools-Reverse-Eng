/* === System Variables  === */
const authRoutes = [
    {
        href: "/signup",
        buttonTitle: "Sign Up",
        class: "",
        id: "is-w3-green",
    },
    {
        href: "/login",
        buttonTitle: "Log In",
        class: "",
        id: ""
    },
]

const sessionRoutes = [
    {
        href: "/logout",
        buttonTitle: "Log Out",
        class: "",
        id: ""
    }
]

/* === navLink Function to run  === */

const navLinks = (req, res, next) => {
    if (req.session.currentUser) {
        res.locals.user = req.session.currentUser;
        res.locals.routes = sessionRoutes;
    } else {
        res.locals.routes = authRoutes;
    }

    next();
}

/* === Module Exports - for app.use('/utils/navlinks') */
module.exports = navLinks;