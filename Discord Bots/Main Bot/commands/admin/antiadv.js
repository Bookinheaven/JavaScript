const advertisement = require("../../models/onlyguild")
const { MessageEmbed } = require('discord.js')
exports.run = async (client, message, args) => {
    const data = await advertisement.findOne({
        GuildID: message.guild.id
    })
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
        return message.reply("<a:uncheck:800984261192187914> I Don't Have Permission To Delete Messages Kindly Check That I Have Manage Messages Permission").then(msg => {
            msg.delete({ timeout: 5000 }).catch(err => console.log(err))
        })
    }
    if (!message.member.permissions.any(["ADMINISTRATOR", "MANAGE_GUILD", "KICK_MEMBERS", "BAN_MEMBERS"])) {
        return message.channel.send("<a:uncheck:800984261192187914> You Dont' Have Permission To Change Anti-Advertisement\n Kindly Check That You Have Administrator Or Manage Guild Or Kick Members & Ban Members");
    }

    if (data) {
        if (data.antiads === false){
            data.antiads = true
            data.save().catch(err => console.log(err))
            const antiad = new MessageEmbed()
                .setColor('#FF0000')
                .setDescription(`Anti-Advertisement is **Enabled**`)

        return message.channel.send(antiad);
        } else if (data.antiads === true){
            data.antiads = false
            data.save().catch(err => console.log(err))
            const antiad = new MessageEmbed()
                .setColor('#FF0000')
                .setDescription(`Anti-Advertisement is **Disabled**`)
            return message.channel.send(antiad);
        }
        
    }

}


exports.help = {
    name: "antiadvertisement",
    description: "Anti-Advertisement System Helps You To Automatic Detection of Server Invites",
    usage: "<prefix>antiadv",
    example: "+antiadv"
  }
  
  exports.conf = {
    aliases: ['antiadv'],
    cooldown: 10
  }
  