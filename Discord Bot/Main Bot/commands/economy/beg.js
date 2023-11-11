const Discord = require("discord.js");
const ecostoreModel = require('../../models/userstuff')
let ms = require("parse-ms");

module.exports.run = async (client, message, args) => {    

        let timeout = 120000;
        let amount = Math.floor(Math.random() * 1000) + 200;;
        const data = await ecostoreModel.findOne({
            UserID: message.author.id
        })
        let beg = await data.Timeofbeg

        if (beg !== null && timeout - (Date.now() - beg) > 0) {
            let time = ms(timeout - (Date.now() - beg));

            let timeEmbed = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setDescription(`You've already begged recently\n\nBeg again in ${time.minutes}m ${time.seconds}s `);
            message.channel.send(timeEmbed)
        } else {
            let moneyEmbed = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setDescription(`<a:cat_beg:806484116261306419> You've begged and received ${amount} coins`);
            message.channel.send(moneyEmbed)
            data.Balance += amount;
            data.Timeofbeg = Date.now()
            data.begs += 1
            await data.save().catch(err => console.log(err))
        }
    }

exports.help = {
    name: "beg",
    description: "beg for money"
  }
  
  exports.conf = {
    aliases: [],
    cooldown: 10
  }