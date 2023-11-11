const advertisement = require("../../models/guildstuff")
const { MessageEmbed } = require('discord.js')
exports.run = async (client, message, args) => {
    let user = message.mentions.users.first()
    if (!message.member.permissions.any(["ADMINISTRATOR", "MANAGE_GUILD", "KICK_MEMBERS", "BAN_MEMBERS"])) {
        return message.channel.send("<a:uncheck:800984261192187914> You Dont' Have Permission To Change Anti-Advertisement\n Kindly Check That You Have Administrator Or Manage Guild Or Kick Members & Ban Members");
    }

    if(!user) return message.channel.send(`
    Please Check It Perfectly Case Sensitive Is There!
    Syntax: <prefix>remove <mute(s) or warn(s)> [@user] <Number>`)

    const data = await advertisement.findOne({
        GuildID: message.guild.id,
        UserID: user.id
    })
    if(!data) return message.channel.send(`He Never Muted In This Server!`)
    if(isNaN(args[2])) return message.channel.send(`
    Please Check It Perfectly Case Sensitive Is There!
    Syntax: <prefix>remove <mute(s) or warn(s)> <@user> [Number]`)
        if(args[0] == `mute` || args[0] == `mutes`){
            if(data){
                if(data.total_mutes == 0) return message.channel.send(`Mutes are Clear!`)
                if(args[2] > data.total_mutes) return message.channel.send(`He Was Mutesd Only ${data.total_mutes}`)
                let embedofmute = new MessageEmbed()
                    .setTitle('Removed Mutes')
                    .setColor('GREEN')
                    .setDescription(`Server Name: ${message.guild.name} \nUser: ${message.author.username} \nAmount: ${data.total_warns - args[2]}`)
                    await user.send(embedofmute)
                    data.total_mutes -= parseInt(args[2])
                    data.save().catch(err => console.log(err))
                    return message.channel.send(`You Cleared ${args[2]} Mutes!`)
            }        
        } else if (args[0] == `warn` ||args[0] == `warns`){
            if(data){
                if(data.total_warns == 0) return message.channel.send(`Warns are Clear!`)
                if(args[2] > data.total_warns) return message.channel.send(`He Was Warned Only ${data.total_warns}`)
                let embedofwarn = new MessageEmbed()
                    .setTitle('Removed Warns')
                    .setColor('GREEN')
                    .setDescription(`Server Name: ${message.guild.name} \nUser: ${message.author.username} \nAmount: ${data.total_warns - args[2]}`)
                    await user.send(embedofwarn)
                    data.total_warns -= parseInt(args[2])
                    data.save().catch(err => console.log(err))
                    return message.channel.send(`You Cleared ${args[2]} Warns!`)
                
            }
        }
    }
    



exports.help = {
    name: "remove",
    description: "removes Users mod stuff!",
    usage: "<prefix>remove <mute or warn> <@someone> <amount>",
    example: "+remove mute @burn 1"
  }
  
  exports.conf = {
    aliases: [],
    cooldown: 10
  }
  