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
    category: {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    all: {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    members: {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    bots: {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    channels: {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    text: {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    voice: {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    categories: {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    announcement: {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    roles: {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    role: {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    roleid: {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    emojis: {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    static: {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    animated: {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    boosts: {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    tier: {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    settime: {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    settimer: {
        type: mongoose.SchemaTypes.String,
        required: false
    }/*,
    joininvites: {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    joininvitestype: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        default: 0
    },
    joininvitestext: {
        type: mongoose.SchemaTypes.String,
        required: true,
        default: '<member> joined, Invited by **<target_username>** **(<regular> Invites)**'
    },
    joininviting: {
        type: mongoose.SchemaTypes.Boolean,
        required: true,
        default: false
    },
    leftinvites: {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    leftinvitestype: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        default: 0
    },
    leftinvitestext: {
        type: mongoose.SchemaTypes.String,
        required: true,
        default: '<member> leaved, Invited by **<target_username>** **(<regular> Invites)**'
    },
    leftinviting: {
        type: mongoose.SchemaTypes.Boolean,
        required: true,
        default: false
    }*/
})


module.exports = mongoose.model("onlyguildstat", guildSchema);