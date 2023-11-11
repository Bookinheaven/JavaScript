const prefix = require('../models/onlyguild')
const Discord = require('discord.js');
const ids = require('../config.json')
module.exports = async (client, guild) => {
    const devServer = client.guilds.cache.get(ids.devserver)
    const channel = devServer.channels.cache.get(ids.devchannel)
    await prefix.findOneAndDelete({
        GuildID: guild.id
    })
    let avatar = client.user.avatarURL({size: 2048}); // Use 2048 for high quality avatar.
        let users = guild.members.cache.filter(member => !member.user.bot).size;
        let bots = guild.members.cache.filter(member => member.user.bot).size
    let ledevembed = new Discord.MessageEmbed()
        .setAuthor(`OMG ${client.user.username} Kicked From A Server!`, avatar)
        .setThumbnail(guild.iconURL())
        .setColor('GOLD')
        .addField("**Guild Name**", `${guild} GuildID: ${guild.id}`)
        .addField("**Guild Owner**", `${guild.owner}\nOwner Username: ${guild.owner.user.username}\nOwnerID : ${guild.owner.user.id}`)
        .addField("**Created At**", `${guild.createdAt}`)
        .addField("**Total Members**", `${guild.memberCount}`, true)
        .addField("**Members**", `${users}`, true)
        .addField("**Bots**", `${bots}`, true)
    await channel.send(`Owner :- <@751028800720207902> !, Co-Owner :- <@575680249380077588> !`, ledevembed);
}