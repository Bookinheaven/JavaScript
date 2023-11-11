const advertisement = require("../../models/guildstuff")
const { MessageEmbed } = require('discord.js')
exports.run = async (client, message, args) => {
    let user = message.mentions.users.first()
    if (!message.member.permissions.any(["ADMINISTRATOR", "MANAGE_GUILD", "KICK_MEMBERS", "BAN_MEMBERS"])) {
        return message.channel.send("<a:uncheck:800984261192187914> You Dont' Have Permission To Change Anti-Advertisement\n Kindly Check That You Have Administrator Or Manage Guild Or Kick Members & Ban Members");
    }

    if(!user) return message.channel.send(`
    Please Check It Perfectly Case Sensitive Is There!
    Syntax: <prefix>removemutes [@user] <Number>`)

    const data = await advertisement.findOne({
        GuildID: message.guild.id,
        UserID: user.id
    })
    if(!data) return message.channel.send(`He Never Muted In This Server!`)

    if(isNaN(args[1])) return message.channel.send(`
    Please Check It Perfectly Case Sensitive Is There!
    Syntax: <prefix>removemutes <@user> [Number]`)
    
    if(data){
        if(args[1] > data.total_mutes) return message.channel.send(`He Was Muted Only ${data.total_mutes}`)
        data.total_mutes -= parseInt(args[1])
        data.save().catch(err => console.log(err))
        if(data.total_mutes == 0) return message.channel.send(`Mutes are Clear!`)
        else {
            console.log(args[1])
            return message.channel.send(`You Cleared ${args[1]} Mutes!`)
        }
    }
}


exports.help = {
    name: "removemutes",
    description: "Removes Users Mutes!",
    usage: "<prefix>removemutes <@someone> <amount>",
    example: "+removemutes @burn 1"
  }
  
  exports.conf = {
    aliases: [],
    cooldown: 10
  }
  