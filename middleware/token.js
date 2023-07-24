const jwt = require("jsonwebtoken")
const User = require("../models/User")
const JWT_KEY = process.env.JWT_KEY

// Verifies user has valid token
const sessionValidation = async (req, res, next) => {
    try {
        if (req.method === "OPTIONS") next()
        if (!req.headers.authorization) throw Error('You are not authorized')
        const authToken = req.headers.authorization.includes("Bearer")
            ? req.headers.authorization.split(" ")[1]
            : req.headers.authorization
        const payload = authToken ? jwt.verify(authToken, JWT_KEY) : undefined
        if (!payload) throw Error("Invalid token")
        const foundUser = await User.findOne({ _id: payload._id })
        if (!foundUser) throw Error("User not found")
        req.user = foundUser
        next()
    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
}

module.exports = sessionValidation;