const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    UserID: {
    type: mongoose.SchemaTypes.String,
    required: true
    },
    Balance: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        default: 0
    },
    rob: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        default: 0
    },
    Bankspace: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        default: 1000
    },
    Bank: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        default: 0
    },
    lootbox: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        default: 0
    },
    lootboxs: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        default: 0
    },
    BronzeVIP: {
        type: mongoose.SchemaTypes.Boolean,
        required: true,
        default: false
    },
    GoldVIP: {
        type: mongoose.SchemaTypes.Boolean,
        required: true,
        default: false
    },
    FishingRod: {
        type: mongoose.SchemaTypes.Boolean,
        required: true,
        default: false
    },
    Hunter: {
        type: mongoose.SchemaTypes.Boolean,
        required: true,
        default: false
    },
    fishs: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        default: 0
    },
    Huntings: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        default: 0
    },
    begs: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        default: 0
    },
    crimes: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        default: 0
    },
    padlocks: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        default: 0
    },
    banknotes: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        default: 0
    },
    Timeofdialy: {
        type: mongoose.SchemaTypes.Number,
        required: false
    },
    Timeofweekly: {
        type: mongoose.SchemaTypes.Number,
        required: false
    },
    Timeofbeg: {
        type: mongoose.SchemaTypes.Number,
        required: false
    },
    Timeofgam: {
        type: mongoose.SchemaTypes.Number,
        required: false
    },
    Timeofautho: {
        type: mongoose.SchemaTypes.Number,
        required: false
    },
    Timeofmonthly: {
        type: mongoose.SchemaTypes.Number,
        required: false
    },
    Timeoffish: {
        type: mongoose.SchemaTypes.Number,
        required: false
    },
    Timeofhunt: {
        type: mongoose.SchemaTypes.Number,
        required: false
    },
    Timeofcrime: {
        type: mongoose.SchemaTypes.Number,
        required: false
    },
    Timeofrob: {
        type: mongoose.SchemaTypes.Number,
        required: false
    },
    apple: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        default: 0
    },
    goldenapple: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        default: 0
    },
    pizza: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        default: 0
    },
    orange: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        default: 0
    },
    chocolate: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        default: 0
    },
    icecream: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        default: 0
    },
    toys: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        default: 0
    },
    games: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        default: 0
    },
    robb: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        default: 0
    }
})


module.exports = mongoose.model("userstat", userSchema);