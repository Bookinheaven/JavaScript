const Discord = require('discord.js');
const ids = require('../config.json')
module.exports = async (client, guild) => {
    const devServer = client.guilds.cache.get(ids.devserver)
    const devchannel = devServer.channels.cache.get(ids.devchannel)

    let channelID;
    let channels = guild.channels.cache;

    channelLoop:
    for (let key in channels) {
        let c = channels[key];
        if (c[1].type === "text") {
            channelID = c[0];
            break channelLoop;
        }
    }
    const embedss = new Discord.MessageEmbed()
        .setTitle('Thanks For Inviting Me!\nI Have aLot Of InBuild Commands! Around 120+')
    let module = client.helps.array().filter(x => !x.hide);
    for (const mod of module) {
        embedss.addField(`${mod.name}`, mod.cmds.map(x => `\`${x}\``).join(" | "));
      }
        let avatar = client.user.avatarURL({size: 2048}); // Use 2048 for high quality avatar.
        let textmap = await guild.channels.cache.filter(r => r.type === "text")
            .sort((a, b) => b.position - a.position)
            .map(r => r)
            .join(", ");
        if (textmap.length > 1024) textmap = "To many Channels to display";
        if (!textmap) textmap = "No Text Channels";

        let voicemap = await guild.channels.cache.filter(r => r.type === "voice")
            .sort((a, b) => b.position - a.position)
            .map(r => r)
            .join(", ");
        if (voicemap.length > 1024) voicemap = "To many Vocie to display";
        if (!voicemap) voicemap = "No Vocie Channels";

        let users = guild.members.cache.filter(member => !member.user.bot).size;
        let bots = guild.members.cache.filter(member => member.user.bot).size
      let devembed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username} Joined A New Server!`, avatar)
        .setThumbnail(guild.iconURL())
        .setColor('GOLD')
        .addField("**Guild Name**", `${guild} GuildID: ${guild.id}`)
        .addField("**Guild Owner**", `${guild.owner} Owner Username: ${guild.owner.user.username} OwnerID : ${guild.owner.user.id}`)
        .addField("**Created At**", `${guild.createdAt}`)
        .addField("**Text Channels**", `${guild.channels.cache.filter(r => r.type === "text").size}\n**Text Channels List:**\n${textmap}`)
        .addField("**Voice Channels**", `${guild.channels.cache.filter(c => c.type === "voice").size}\n**Voice Channels List:**\n${voicemap}`)
        .addField("**Total Members**", `${guild.memberCount}`, true)
        .addField("**Members**", `${users}`, true)
        .addField("**Bots**", `${bots}`, true)

    await devchannel.send(`Owner :- <@751028800720207902> !, Co-Owner :- <@575680249380077588> ! NEW Server! <a:check:800984260986798131> `, devembed); 
    let channel = guild.channels.cache.get(guild.systemChannelID || channelID);
    if(!channel) return;
    channel.send(`Hi Guys!, Thanks for inviting me into this server!`, embedss);

}