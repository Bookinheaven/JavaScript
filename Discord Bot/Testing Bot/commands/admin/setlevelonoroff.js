const Levelings = require('../../models/onlyguild') 
const Discord = require('discord.js')
exports.run = async (client, message, args) => {
    const data = await Levelings.findOne({
        GuildID: message.guild.id
    })
    let text = args[0].toLowerCase()
    if (!message.member.permissions.any(["ADMINISTRATOR", "MANAGE_GUILD", "KICK_MEMBERS", "BAN_MEMBERS"])) {
        return message.channel.send("<a:uncheck:800984261192187914> You Dont' Have Permission To On Or Off Levels Channel\n Kindly Check That You Have Administrator Or Manage Guild Or Kick Members & Ban Members");
      }
    if(text == 'on'){
        if (data.leveling === false){
            let channel = message.guild.channels.cache.find(ch => ch.id === data.Levelingsch)
            if(!channel) channel = 'No Fixed Channel'
            data.leveling = true
            data.save().catch(err => console.log(err))
            let antiad = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setDescription(`Leveling Channel is **Enabled**, Levelings Channel :${channel}!`)
            return message.channel.send(antiad);
        } else if(data.leveling === true){
            return message.channel.send(`Your Server Didnt Have Any Leveling Channel [Default!]\n To Set use Command <prefix>setlevels <#levelups>`)
        }
    } else if(text == 'off'){
        if (data.leveling === true){
            data.leveling = false
            data.save().catch(err => console.log(err))
            let antiad = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setDescription(`Leveling Channel is **Disabled**, Levelings Now You Will Be Default!`)
            return message.channel.send(antiad);   
        } else if (data.leveling === false){
            if(!data.Levelingsch){
                return message.channel.send(`Your Server Didnt Have Any Leveling Channel [Default!]\n To Set use Command <prefix>setlevels <#levelups>`)
            } else {
                return message.channel.send(`Already Disabled!`)
            }
        }
    }
}
  exports.help = {
    name: "setlevelings",
    description: "Custom Levelings Message For Server",
    usage: "+levelings <On or Off>",
    example: "+levelings on or off"
  }
  
  exports.conf = {
    aliases: [],
    cooldown: 10
  }
  