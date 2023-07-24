const router = require("express").Router()
const Room = require("../models/Room")
const adminValidation = require("../middleware/admin")
const sessionValidation = require("../middleware/token")

// ? GET all rooms---------------------//
router.get("/", async (req, res) => {
    try {
        const findAll = await Room.find({})
        if(findAll.length === 0) throw Error("No rooms found")
        res.status(200).json(findAll)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
})

// ? POST create room---------------------//
router.post("/create", sessionValidation, async (req, res) => {
    try {
        const { name, description, addedUsers } = req.body
        if(!name || !description || !addedUsers) throw Error("provide all schema")
        const newRoom = new Room ({ name, description, addedUsers })
        await newRoom.save()
        res.status(200).json({
            message: `Room saved`,
            newRoom
        })
    } catch (err) {
        err.name === "ValidationError"
        ? res.status(400).json({
            message: `Data type no good`
        })
        : res.status(500).json({
            message: `${err}`
        })
    }
})

// ! PUT update a room ADMIN ONLY----------------//
router.put("/update/:id", adminValidation, async (req, res) => {
    try {
        const { id: _id } = req.params
        const update = req.body
        const updated = await Room.updateOne({_id}, { $set: update })
        if (!updated) throw Error("ID not found")
        res.status(200).json({
            message: `Room updated`,
            update
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
})

// ! DEL room by id ADMIN ONLY -----------------// 
router.delete("/delete/:id", adminValidation, async (req, res) => {
    try {
        const { id: _id } = req.params
        const deleteRoom = await Room.findByIdAndDelete(_id)
        if(!deleteRoom) throw Error("ID not found")
        res.status(200).json({
            message: `Room deleted`,
            deleteRoom
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
})
// ! Additional routes that may be used later
/*  // ? GET one room by name------body or params?------------//
router.get("/name", async (req, res) => {
    try {
        const { name } = req.body
        if(!name) throw Error("Please provide name of room")
        const foundRoom = await Room.findOne({ name })
        if(!foundRoom) throw Error("Room not found")
        res.status(200).json(foundRoom)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
})

// ? GET room by user--------body or params?-------//
router.get("/user", async (req, res) => {
    try {
        const { user } = req.body
        if(!user) throw Error("Please provide a user")
        const foundRoom = await Room.findOne({ user })
        if(!foundRoom) throw Error("Room not found")
        res.status(200).json(foundRoom)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
})
 */


/* // ! PUT add users to a room ADMIN ONLY ------might need work---//
router.put("/add/:id", adminValidation, async (req, res) => {
    try {
        const { id: _id } = req.params
        const addUser = req.body
        const update = await Room.updateOne(_id, { $addToSet: addUser })
        if (!update) throw Error("ID not found")
        res.status(200).json({
            message: `User added`,
            addUser
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
}) */

/* // ! PUT remove user from room ADMIN ONLY -----------//
router.put("/remove/:id", adminValidation, async (req, res) => {
    try {
        const { id: _id } = req.params
        const user = req.body
        const update = await Room.findOneAndRemove({ user })
        if(!update) throw Error("Not found")
        res.status(200).json({
            message: `User removed`,
            user
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
}) */


module.exports = router;