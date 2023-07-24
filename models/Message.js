const { mongoose } = require("../db");

const Message = new mongoose.Schema(
    {
        user: {
            type: String,
            required: true
        },
        room: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model("message", Message);