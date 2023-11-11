const Discord = require('discord.js')
const ms = require("parse-ms");
const economyModel = require('../../models/guildstuff')
const ecostoreModel = require('../../models/userstuff')
module.exports.run = async (client, message, args) => {
    let text = args.join(' ')
    let timern = Date.now()
    const data = await economyModel.findOne({
        UserID: message.author.id
    }) 
    if (!data){
        message.channel.send('You Need To Use Daily Command Once In My Life!')
    }
    if (data){
        let timeout = 8.64e+7;
        let peacemodetimer = data.Timeofpeace
        if (peacemodetimer !== null && timeout - (Date.now() - peacemodetimer) > 0) {
            let time = ms(timeout - (Date.now() - peacemodetimer));
            let timeEmbed = new Discord.MessageEmbed()
                .setColor("#FFFFFF")
                .setDescription(`You have already Used Peace Mode\n\nTry Again in ${time.hours}h ${time.minutes}m ${time.seconds}s `);
            return message.channel.send(timeEmbed)
        } else {
            if (text == 'on'){
                if (data.PeaceMode == false){
                    data.PeaceMode = true
                    await data.save()
                    .catch(err => console.log(err));
                    let onEmbed = new Discord.MessageEmbed()
                        .setColor("#FFFFFF")
                        .setDescription(`Now Peace Mode On!`);
                    return message.channel.send(onEmbed)
                }
                else {
                    return message.reply('Peace Mode Is Already `On`')
                }

            } else if (text == 'off') {
                if (data.PeaceMode == true){
                    data.PeaceMode = false
                    data.Timeofpeace = timern
                    await data.save()
                    .catch(err => console.log(err));
                    let onEmbed = new Discord.MessageEmbed()
                        .setColor("#FFFFFF")
                        .setDescription(`Now Peace Mode Offed!`);
                    return message.channel.send(onEmbed)
                }
                else {
                    return message.reply('Peace Mode Is Already `Off`')
                }
            } 
        }

    }

}
exports.help = {
    name: "peacemode",
    description: "If Your In This Mode No One Can Rob From You Even You Cant Rob From Others",
    usage: " peacemode <on/off>",
    example: "!peace on\n! peace off"
}

exports.conf = {
    aliases: ['peace']
}