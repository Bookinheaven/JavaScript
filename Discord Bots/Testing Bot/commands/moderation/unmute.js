const { MessageEmbed } = require("discord.js");
const channel = require('../../models/onlyguild')
const { promptMessage } = require("../../functions.js");
exports.run = async (client, message, args) => {
   const logChannel = message.guild.channels.cache.find(c => c.name === "logs") || message.channel;

   //if (message.deletable) message.delete();

   // No args
   if (!args[0]) {
       return message.reply("Please provide a person to UnMute.").then(msg => {
           msg.delete({ timeout: 5000 }).catch(err => console.log(err))
       })
   }

   // No author permissions
   if (!message.member.permissions.any(["ADMINISTRATOR", "MANAGE_GUILD", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_ROLES"])) {
    return message.channel.send("<a:uncheck:800984261192187914> You Dont' Have Permission To Change UnMute!\n Kindly Check That You Have Administrator Or Manage Guild Or Kick Members & Ban Members");
  }

   const tounmute = message.mentions.members.first() || message.guild.members.get(args[0]);
    const data2 = await channel.findOne({
        GuildID: message.guild.id
    })
    let avatar = message.author.avatarURL({size: 2048}); // Use 2048 for high quality avatar.
   // No member found
   if (!tounmute) {
       return message.reply("Couldn't find that member, try again").then(msg => {
           msg.delete({ timeout: 5000 })
       })
   }

   // Can't ban urself
   if (tounmute.id === message.author.id) {
       return message.reply("You can't UnMute Yourself...").then(msg => {
           msg.delete({ timeout: 5000 })
       })
   }

    const embed = new MessageEmbed()
        .setAuthor(`${message.author.username} Unmuted ${tounmute.user.username}!`, avatar)
        .setColor("#ff0000")
        .setFooter(message.member.displayName, message.author.displayAvatarURL)
        .setTimestamp()

    const promptEmbed = new MessageEmbed()
    .setColor("GREEN")
    .setAuthor(`This verification becomes invalid after 30s.`)
    .setDescription(`Do you want to UnMute ${tounmute}?`)

        // Send the message
        await message.channel.send(promptEmbed).then(async msg => {
            // Await the reactions and the reactioncollector
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);
            let unmuteRole = message.guild.roles.cache.find(m => m.name === "Muted");
        // Verification stuffs
        if (emoji === "✅") {
            msg.delete();
            if (!tounmute.roles.cache.has(unmuteRole.id)) return message.channel.send("He isn't Muted YET!")
            tounmute.roles.remove(unmuteRole)
                .catch(err => {
                    if (err) return;
                });
            if(!data2.modlogchannel || data2.modlog === false) return message.channel.send(embed)
            if(data2.modlogchannel && data2.modlog === true){
                let chane = message.guild.channels.cache.find(ch => ch.id === data2.modlogchannel)
                let embed2 = new MessageEmbed()
                    .setAuthor(`${message.author.username} Unmuted ${tounmute.user.username}!`, avatar)
                    .setColor("#ff0000")
                    .setThumbnail(tounmute.user.displayAvatarURL)
                    .setFooter(message.member.displayName, message.author.displayAvatarURL)
                    .setTimestamp()
                    .addFields(
                        { name: `**User**`, value: `${tounmute}`, inline: true},
                        { name: `**Moderator**`, value: `${message.author}`, inline: true},
                        { name: `**Unmuted In Channel**`, value: `${message.channel}`},
                    )
                        chane.send(embed2)
                        return message.channel.send(embed)
                }
        } else if (emoji === "❌") {
                msg.delete().catch(err => console.log(err))
                let embeded11 = new MessageEmbed()
                .setTitle('Cancelled Unmute!')
                .setDescription(`${tounmute.user.username} Bad Luck Your Not Unmuted Yet!`)
                return message.channel.send(embeded11)
        }
    })
}

exports.help = {
    name: "unmute",
    description: "This Command Makes Users To UnMutes!",
    usage: "unmute <id | mention>",
    example: "unmute @GOOGLE#google"
 };
 
 exports.conf = {
       aliases: [],
 }   