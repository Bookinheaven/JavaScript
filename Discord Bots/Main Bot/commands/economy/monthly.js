const Discord = require("discord.js");
const ms = require("parse-ms");
//const { chocolor } = require('../../otherfuntions')
const ecostoreModel = require('../../models/userstuff')
module.exports.run = async (client, message, args) => {
    const user = await ecostoreModel.findOne({
        UserID: message.author.id
    })

    if (!user){
        message.channel.send('You Need To Use Monthly Command Once In My Life')
    }
    if (user) {
        let timeout = 2.628e+9;
        let amount = Math.floor(Math.random() * 400000) + 100000;
        let monthly = user.Timeofmonthly

        if (monthly !== null && timeout - (Date.now() - monthly) > 0) {
            let time = ms(timeout - (Date.now() - monthly));
           // let colors = 
        let timeEmbed = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`You have already collected your Monthly reward\n\nCollect it again in ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s `);
            message.channel.send(timeEmbed)
        } else {
        let moneyEmbed = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`You've collected your Monthly reward of ${amount} coins`);
        message.channel.send(moneyEmbed)
        user.Balance += parseInt(amount);
        user.Timeofmonthly = Date.now()
        user.save().catch(err => console.log(err))


  }
}
}


exports.help = {
    name: "monthly",
    description: "Collect the monthly credits."
}

exports.conf = {
    aliases: ["month"],
    cooldown: 10
}
