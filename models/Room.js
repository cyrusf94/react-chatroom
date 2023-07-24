const { mongoose } = require("../db");

const Room = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        addedUsers: {
            type: Array,
            required: true
        }
    }
)

module.exports = mongoose.model("room", Room);