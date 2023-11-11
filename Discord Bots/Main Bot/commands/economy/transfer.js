const Discord = require("discord.js");
const economyModel = require('../../models/guildstuff')
const ecostoreModel = require('../../models/userstuff')
module.exports.run = async (client, message, args) => {

    let amountpay = args[1]
    let user;
    if (message.mentions.users.first()) {
        user = message.mentions.users.first();
    } else if (amountpay) {
        user = message.guild.members.cache.get(amountpay).user;
    }
    if (user.bot || user === client.user) {
        return message.channel.send("This User Is A Bot.");
        // If the user was a bot, ignore it.
    }
    
    let embed1 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(` Mention someone to pay`);

    if (!user) {
        return message.channel.send(embed1)
    }
    let embed2 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`Specify an amount to pay`);

    if (!amountpay) {
        return message.channel.send(embed2)
    }
    let embed3 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`You can't pay someone negative money`);

    if (message.content.includes('-')) { 
        return message.channel.send(embed3)
    }
    let embed4 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`You don't have that much money`);

    
    const data = await ecostoreModel.findOne({
        UserID: user.id
    })
    const authordata = await ecostoreModel.findOne({
        UserID: message.author.id
    })
    if (authordata.Balance < amountpay) {
        return message.channel.send(embed4)
    }
    if (data) { 
        data.Balance += parseInt(amountpay);
        await data.save()
            .catch(err => console.log(err));
            if(authordata) {
                authordata.Balance -= parseInt(amountpay);
                authordata.save().catch(err => console.log(err));
            }
        let embed5 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`:white_check_mark: You gave ${user.tag} ${amountpay}, now you have ${authordata.Balance} and they've got ${amountpay} coins`);
        message.channel.send(embed5)
   } else if (!data) {
       message.channel.send(`He Need To Use Daily Command Once In My Life`).catch(err => console.log(err));
   }
    
}

exports.help = {
    name: "pay",
    description: "pay a credits to the user.",
    usage: "pay <@user | user ID> <amount>",
    example: "pay @burn 900"
}

exports.conf = {
    aliases: ['transfer', 'ts', 'give'],
    cooldown: 15
}
