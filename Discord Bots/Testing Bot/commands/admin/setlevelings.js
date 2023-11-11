const Levelings = require('../../models/onlyguild') 
const Discord = require('discord.js')
exports.run = async (client, message, args) => {
    const data = await Levelings.findOne({
        GuildID: message.guild.id
    })
    let text = args[0].toLowerCase()
    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
    if(!channel) return message.channel.send("Please Mention the channel first!")
    if (channel.id == data.Levelingsch) return message.channel.send('Please Provide A New Levels Channel Not Old Levels Channel')

    if (!message.member.permissions.any(["ADMINISTRATOR", "MANAGE_GUILD", "KICK_MEMBERS", "BAN_MEMBERS"])) {
      return message.channel.send("<a:uncheck:800984261192187914> You Dont' Have Permission To Change Levels Channel\n Kindly Check That You Have Administrator Or Manage Guild Or Kick Members & Ban Members");
    }
    // `Your Server Didnt Have Any Leveling Channel [Default!]\n To Set use Command <prefix>setlevels <#levelups>`
      if (data.leveling === false){
        if(!data.Levelingsch){
          data.Levelingsch = channel.id
          data.leveling = true
          data.save().catch(err => console.log(err))
          return message.channel.send(`Levels Channel Has Set To ${channel}!`);
        } else if (data.Levelingsch){
          data.Levelingsch = channel.id
          data.save().catch(err => console.log(err))
          return message.channel.send(`Levels Channel Has Changed To ${channel}!`);
        }
      } else if (data.leveling === false && data.Levelingsch === null){
        return message.channel.send(`You Disabled Levelings Channel Use Command <prefix>levelings on`)
      } 
  }
  
exports.help = {
    name: "setlevels",
    description: "Custom Levelings Message For Server",
    usage: "+selevels <New Levels Channel>",
    example: "+setlevels 797816794134872104 or #levels"
  }
  
  exports.conf = {
    aliases: [],
    cooldown: 10
  }
  