const botlog = require("../../models/guildstuff")
const channeldata = require('../../models/onlyguild')
const { MessageEmbed } = require('discord.js')
exports.run = async (client, message, args) => {
    const data2 = await channeldata.findOne({
        GuildID: message.guild.id
    })
    let user;
    if (message.mentions.users.first()) {
        user = message.mentions.users.first();
        
    }
        if(!args[0]) user = message.author
        if(user){
            if (user.bot || user === client.user) {
                return message.channel.send("This User Is A Bot.");
                // If the user was a bot, ignore it.
            }
            const data = await botlog.findOne({
                GuildID: message.guild.id,
                UserID: user.id
            })
            if (!message.member.permissions.any(["ADMINISTRATOR", "MANAGE_GUILD", "KICK_MEMBERS", "BAN_MEMBERS"])) {
                return message.channel.send("<a:uncheck:800984261192187914> You Dont' Have Permission To Change ModLog\n Kindly Check That You Have Administrator Or Manage Guild Or Kick Members & Ban Members");
            }
            let mutess = await data.total_mutes
            if(mutess == 0) mutes = 'Nothing'
            else if(mutess > 1) mutes = `${data.total_mutes} Times`
            else if (mutess == 1) mutes = `${data.total_mutes} Time`
    
            let warns = await data.total_warns
            if(warns == 0) warn = 'Nothing'
            else if(warns > 1) warn = `${data.total_warns} Times`
            else if (warns == 1) warn = `${data.total_warns} Time`
    
            if(data2.modlog === true) yesno = 'On'
            else if (data2.modlog === false) yesno = 'Off'
            if(data2.modlogchannel) modchannel = message.guild.channels.cache.find(ch => ch.id === data2.modlogchannel)
            else if (!data2.modlogchannel) modchannel = 'No Channel Found!'
            
            const embed = new MessageEmbed()
            .setAuthor(`${message.guild.name}`,message.guild.iconURL())
            .setDescription(`**${user.username}**`)
            .addFields(
                { name: `**Mutes**`, value: `${mutes}`, inline: true},
                { name: `**Warns**`, value: `${warn}`, inline: true},
                
                { name: `**Server Information:**`, value: `*ModLog Information Of Server ${message.guild.name}!*`},
                { name: `**ModLog Mode:**`, value: `${yesno}!`, inline: true},
                { name: `**ModLog Channel:**`, value: `${modchannel}`, inline: true},
                //{ name: `**Data Found In This Server**`, value: `${yesno}` },
            )
            return message.channel.send(embed)
        
        }
    
    
    let text = args[0].toLowerCase()
    if(text == 'set'){
        let channel = message.mentions.channels.first()
        if(!channel) return message.channel.send("Please Mention the channel first!")
        else if (channel.id == data2.modlogchannel) return message.channel.send('Please Provide A New Channel Not Old Channel')

        else if (data2) {
            data2.modlogchannel = channel.id
            data2.modlog = true
            data2.save().catch(err => console.log(err));
                return message.channel.send(`ModLog Channel Has Set To ${channel}!`);

        }
    } else if (args[0] == 'off'){
        data2.modlog = false
        data2.save().catch(err => console.log(err));
        return message.channel.send('Mod Log Offed!')
    }
    
}


exports.help = {
    name: "modlog",
    description: "Removes Users Mutes!",
    usage: "<prefix>modlog",
    example: "+modlog "
  }
  
  exports.conf = {
    aliases: [],
    cooldown: 10
  }
  