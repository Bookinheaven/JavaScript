const Discord = require('discord.js')
const ms = require("parse-ms");
const economyModel = require('../../models/guildstuff')
const ecostoreModel = require('../../models/userstuff')
module.exports.run = async (client, message, args) => {

    const data = await ecostoreModel.findOne({
        UserID: message.author.id
    })
    let replies = ['Programmer','Builder','Waiter','Busboy','Chief','Mechanic']
    let result = Math.floor((Math.random() * replies.length));
    let amount = Math.floor(Math.random() * 10000) + 8000;
    if (!data) {
        let newData = new ecostoreModel({
            UserID: message.author.id,
            Balance: parseInt(amount)
    
        })
            await newData.save()
                    .catch(err => console.log(err));
            let embed1 = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`You worked as a ${replies[result]} and earned ${amount} coins`);
            message.channel.send(embed1)
        }

    if (data) {
        let timeout = 10800000;
        let lastwork = data.Timeofautho
        if (lastwork !== null && timeout - (Date.now() - lastwork) > 0) {
            let time = ms(timeout - (Date.now() - lastwork));

            let timeEmbed = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`You have already worked recently\n\nTry again in ${time.minutes}m ${time.seconds}s `);
            message.channel.send(timeEmbed)
        } else {
            data.Balance += parseInt(amount);
            data.Timeofautho = Date.now()
            await data.save()
                .catch(err => console.log(err));
            let embed1 = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`You worked as a ${replies[result]} and earned ${amount} coins`);
            message.channel.send(embed1)
        };
    
    } 

}



exports.help = {
    name: "work",
    description: "work And earn .",
    usage: "work",
    example: "work "
}

exports.conf = {
    aliases: ['wr']
}
