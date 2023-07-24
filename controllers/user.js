const router = require("express").Router()
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const SALT = Number(process.env.SALT)
const JWT_KEY = process.env.JWT_KEY
const adminValidation = require("../middleware/admin")

// ? CREATE user -----------------------------------------------//
router.post("/register", async (req, res) => {
    try {
        const { firstName, lastName, email, password} = req.body;

        if ( !firstName || ! lastName || !email || !password) {
            throw Error("Need all fields")
        } 
        
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, SALT),
        });

        await newUser.save();
        const token = jwt.sign(
            { _id: newUser._id },
            JWT_KEY,
            { expiresIn: 60 * 60 * 24 }
        );
        
        let foundUser = await User.findOne({ email });

        const name = foundUser.firstName;
        const id = foundUser._id

        res.status(201).json({
            message: "User created",
            newUser,
            token,
            name,
            id
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
        
    }
})

// ? LOGIN user ------------------------------------------------//
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(bcrypt.hashSync(password, SALT));
        let foundUser = await User.findOne({ email });
        
        if (!foundUser) throw Error("User not found");

        const verifyPassword = await bcrypt.compare(password, foundUser.password);

        if (!verifyPassword) throw Error("Incorrect Password");

        const token = jwt.sign(
            { _id: foundUser._id },
            JWT_KEY,
            { expiresIn: 60 * 60 * 24 }
        )
        const name = foundUser.firstName;
        const id = foundUser._id

        res.status(200).json({
            message: "Login succesful",
            token,
            name,
            id

        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
})

// ! ADMIN ONLY
// ? PUT update one user ---------------------------------------//
router.put("/update/:id", adminValidation, async (req, res) => {
    try {
        const { id: _id } = req.params;

        const newInfo = req.body;

        const updatedUser = await User.updateOne({ _id }, { $set: newInfo });

        if (updatedUser.matchedCount === 0) throw Error("User not found");

        res.status(200).json({
            message: "User updated",
            updatedUser
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
})

// ! ADMIN ONLY
// ? DEL delete user
router.delete("/delete/:id", adminValidation, async (req, res) => {
    try {
        const { id: _id } = req.params;

        const deleteUser = await User.findByIdAndDelete({ _id });
    
        if (!deleteUser) throw Error("ID not found");
        
        res.status(200).json({
            message: "User deleted"
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
})

module.exports = router;