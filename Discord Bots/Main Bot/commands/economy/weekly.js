const Discord = require("discord.js");
const ms = require("parse-ms");
const economyModel = require('../../models/guildstuff')
const ecostoreModel = require('../../models/userstuff')
module.exports.run = async (client, message, args) => {
    const user = await ecostoreModel.findOne({
        UserID: message.author.id
    })
    if (!user){
        message.channel.send('You Need To Use Daily Command Once In My Life')
    }
    if (user) {
        let timeout = 604800000;
        let amount = Math.floor(Math.random() * 40000) + 10000;
        let weekly = user.Timeofweekly

        if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
            let time = ms(timeout - (Date.now() - weekly));
  
        let timeEmbed = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`You have already collected your weekly reward\n\nCollect it again in ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s `);
            message.channel.send(timeEmbed)
        } else {
        let moneyEmbed = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`You've collected your weekly reward of ${amount} coins`);
        message.channel.send(moneyEmbed)
        user.Balance += parseInt(amount);
        user.Timeofweekly = Date.now()
        user.save().catch(err => console.log(err))


  }
}
}


exports.help = {
    name: "weekly",
    description: "Collect the Weekly credits."
}

exports.conf = {
    aliases: ["week"],
    cooldown: 10
}
