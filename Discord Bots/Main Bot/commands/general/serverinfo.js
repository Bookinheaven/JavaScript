const { MessageEmbed } = require('discord.js')
const advertisement = require("../../models/guildstuff") 
exports.run = async (client, message, args) => {
    let owner = [];
        await client.users.fetch(message.guild.ownerID).then(o => owner.push(o.tag))
        try {
            let rolemap = message.guild.roles.cache
                .sort((a, b) => b.position - a.position)
                .map(r => r)
                .join(", ");
            if (rolemap.length > 1024) rolemap = "To many roles to display";
            if (!rolemap) rolemap = "No roles";

            let textmap = message.guild.channels.cache.filter(r => r.type === "text")
                .sort((a, b) => b.position - a.position)
                .map(r => r)
                .join(", ");
            if (textmap.length > 1024) textmap = "To many Channels to display....";
            if (!textmap) textmap = "No Text Channels";

            let voicemap = message.guild.channels.cache.filter(r => r.type === "voice")
                .sort((a, b) => b.position - a.position)
                .map(r => r)
                .join(", ");
            if (voicemap.length > 1024) voicemap = "To many Vocie to display....";
            if (!voicemap) voicemap = "No Vocie Channels";

            let users = message.guild.members.cache.filter(member => !member.user.bot).size;
            let bots = message.guild.members.cache.filter(member => member.user.bot).size
            let embed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle("Server Info")
                .setThumbnail(message.guild.iconURL())
                .setAuthor(`${message.guild.name} Info`, message.guild.iconURL())
                .addField("**Guild Name**", `${message.guild.name}`, true)
                .addField("**Guild Owner**", `${owner}`, true)
                .addField("**ID**", `${message.guild.id}`)
                .addField("**Created At**", `${message.guild.createdAt}`)
                .addField("**Text Channels**", `${message.guild.channels.cache.filter(r => r.type === "text").size}\n**Text Channels List:**\n${textmap}`)
                .addField("**Voice Channels**", `${message.guild.channels.cache.filter(c => c.type === "voice").size}\n**Voice Channels List:**\n${voicemap}`)
                .addField("**Total Members**", `${message.guild.memberCount}`, true)
                .addField("**Members**", `${users}`, true)
                .addField("**Bots**", `${bots}`, true)
                .addField("**Total Roles**", `${message.guild.roles.cache.size} \n**Role List:**\n${rolemap}`)
            return message.channel.send(embed);
        }
        catch (err){
            console.log(err)
            return message.channel.send('Something Went Wrong!')
        }
    }
exports.help = {
    name: "serverinfo",
    description: "Shows The Server Info!",
    usage: "<prefix>serverinfo ",
    example: "+serverinfo"
}
    
exports.conf = {
    aliases: [],
    cooldown: 10
}
          