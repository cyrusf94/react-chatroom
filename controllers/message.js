const router = require("express").Router()
const Message = require("../models/Message")
const sessionValidation = require("../middleware/token")

// ? GET all messages ------------------------//
router.get("/", async (req, res) => {
    try {
        const findAll = await Message.find({})
        if (findAll.length === 0) throw Error("No entries found")
        res.status(200).json(findAll)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
})

// ? GET message by id -----------------------//
router.get("/:id", async (req, res) => {
    try {
        const { id: _id } = req.params
        const findMessage = await Message.findOne({ _id })
        if (!findMessage) throw Error("No message found")
        res.status(200).json(findMessage)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
})

// ? GET message by room ---------needs work!---------//
router.get("/room/:room", async (req, res) => {
    try {
        const { room: roomName } = req.params
        const roomMessage = await Message.find({ room: roomName })
        if (!roomMessage) throw Error("Room does not exist")
        res.status(200).json(roomMessage)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
})

// ? POST create message ----------------------//
router.post("/create", async (req, res) => {
    try {
        const { user, room, body } = req.body
        if (!user || !room || !body) throw Error("Please include all criteria")
        const newMessage = new Message({ user, room, body })
        await newMessage.save()
        res.status(201).json({
            message: 'message saved',
            newMessage
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

// ? PUT update room by id-------//
router.put("/update/:id", sessionValidation, async (req, res) => {
    try {
        const { id: _id } = req.params
        const updateMessage = req.body
        const updated = await Message.updateOne({_id}, { $set: updateMessage })
        if (!updated) throw Error("ID not found")
        res.status(200).json({
            message: `Item updated`,
            updateMessage
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
})

// ? DEL room by id -------------//
router.delete("/delete/:id", sessionValidation, async (req, res) => {
    try {
        const { id: _id } = req.params
        const deleteMessage = await Message.findByIdAndDelete(_id)
        if(!deleteMessage) throw Error("ID not found")
        res.status(200).json({
            message: `Message deleted`,
            deleteMessage
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
})

module.exports = router;