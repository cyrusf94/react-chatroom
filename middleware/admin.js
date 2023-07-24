const jwt = require("jsonwebtoken")
const User = require("../models/User")
const JWT_KEY = process.env.JWT_KEY

// ! SEE notes.js FOR ADMIN PROCESS

const adminValidation = async (req, res, next) => {
    try {
        if (req.method === "OPTIONS") next()
        if (!req.headers.authorization) throw Error("Forbidden")
        const authToken = req.headers.authorization.includes("Bearer")
            ? req.headers.authorization.split(" ")[1]
            : req.headers.authorization
        const payload = authToken ? jwt.verify(authToken, JWT_KEY) : undefined
        if (!payload) throw Error("Invalid token")
        const foundUser = await User.findOne({ _id: payload._id })
        if (!foundUser) throw Error("User not found")
        req.user = foundUser
        console.log(req.user)
        const isAdmin = foundUser.admin;
        if (!isAdmin) throw Error("You are not an admin")
        next()
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
}

module.exports = adminValidation