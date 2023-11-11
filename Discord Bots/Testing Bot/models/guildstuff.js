const mongoose = require("mongoose")


const guildSchema = mongoose.Schema({
    GuildID: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    UserID: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    PeaceMode: {
        type: mongoose.SchemaTypes.Boolean,
        required: true,
        default: false
    },
    padlock: {
        type: mongoose.SchemaTypes.Boolean,
        required: true,
        default: false
    },
    Timeofpadlock: {
        type: mongoose.SchemaTypes.Number,
        required: false
    },
    Timeofpeace: {
        type: mongoose.SchemaTypes.Number,
        required: false
    },
    XP: {
        type: mongoose.SchemaTypes.Number,
        required: false,
        default: 0
    },
    Levels: {
        type: mongoose.SchemaTypes.Number,
        required: false,
        default: 0
    },
    total_mutes: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        default: 0
    },
    total_warns: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        default: 0
    }
})


module.exports = mongoose.model("guildstat", guildSchema);