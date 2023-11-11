const mongoose = require("mongoose")


const guildSchema = mongoose.Schema({
    // Main Guild
    GuildID: {
        type: mongoose.SchemaTypes.String,
        required: true
    },          //Prefix System!
    Prefix: {
        type: mongoose.SchemaTypes.String,
        required: true,
        default: `+`
    },          //ModLog!
    modlogchannel: {
        type: mongoose.SchemaTypes.String,
        required: false,
    },
    modlog: {
        type: mongoose.SchemaTypes.Boolean,
        required: true,
        default: false
    },          //WelcomeSystem!
    Welcome: {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    welcometype: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        default: 0
    },
    Welcometext: {
        type: mongoose.SchemaTypes.String,
        required: true,
        default: 'Hey <member>, Welcome to **<server>**!'
    },
    Welcoming: {
        type: mongoose.SchemaTypes.Boolean,
        required: true,
        default: false
    },          //GoodBye System
    left: {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    lefttype: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        default: 0
    },
    lefttext: {
        type: mongoose.SchemaTypes.String,
        required: true,
        default: '<member>, Left The Server **<server>**!'
    },
    lefting: {
        type: mongoose.SchemaTypes.Boolean,
        required: true,
        default: false
    },          //antiads
    antiads: {
        type: mongoose.SchemaTypes.Boolean,
        required: true,
        default: false
    },          //Leveling system
    Levelingsch: {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    leveling: {
        type: mongoose.SchemaTypes.Boolean,
        required: true,
        default: false
    },          //server stats!!!
    setups: {
        type: mongoose.SchemaTypes.Boolean,
        required: true,
        default: false
    },
    all: {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    members: {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    channels: {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    role: {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    category: {
        type: mongoose.SchemaTypes.String,
        required: false
    }
})


module.exports = mongoose.model("onlyguildstat", guildSchema);