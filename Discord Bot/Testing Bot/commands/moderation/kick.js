const { MessageEmbed } = require("discord.js");
const { promptMessage } = require("../../functions.js");
const channel = require('../../models/onlyguild')
exports.run = async (client, message, args) => {

        //if (message.deletable) message.delete();

        // No args
        if (!args[0]) {
            return message.reply("Please provide a person to kick.").then(msg => {
                msg.delete({ timeout: 5000 })
            })
        }

        // No author permissions
        if (!message.member.hasPermission("KICK_MEMBERS")) {
            return message.reply("<a:uncheck:800984261192187914> You do not have permissions to kick members. Please contact a staff member").then(msg => {
                msg.delete({ timeout: 5000 })
            })
        }

        // No bot permissions
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
            return message.reply("<a:uncheck:800984261192187914> I do not have permissions to kick members. Please contact a staff member").then(msg => {
                msg.delete({ timeout: 5000 })
            })
        }

        const toKick = message.mentions.members.first() || message.guild.members.get(args[0]);
        const data2 = await channel.findOne({
            GuildID: message.guild.id
        })
        let avatar = message.author.avatarURL({size: 2048}); // Use 2048 for high quality avatar.
        // No member found
        if (!toKick) {
            return message.reply("Couldn't find that member, try again").then(msg => {
                msg.delete({ timeout: 5000 })
            })
        }

        // Can't kick urself
        if (toKick.id === message.author.id) {
            return message.reply("You can't kick yourself...").then(msg => {
                msg.delete({ timeout: 5000 })
            })
        }

        // Check if the user's kickable
        if (!toKick.kickable) {
            return message.reply("I can't kick that person due to role hierarchy, I suppose.").then(msg => {
                msg.delete({ timeout: 5000 })
            })
        }
                
        if(args[1]) reasonsss = args.slice(1).join(" ")
        else if(!args[1]) reasonsss = `Unspecified`
        const embed = new MessageEmbed()
            .setAuthor(`${message.author.username} Kicked ${toKick.user.username}!`, avatar)
            .setColor("#ff0000")
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(`**Reason:** ${reasonsss}`);

        const promptEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor(`This verification becomes invalid after 30s.`)
            .setDescription(`Do you want to kick ${toKick}?`)

        // Send the message
        await message.channel.send(promptEmbed).then(async msg => {
            // Await the reactions and the reaction collector
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            // The verification stuffs
            if (emoji === "✅") {
                msg.delete();

                /*toKick.kick(args.slice(1).join(" "))
                    .catch(err => {
                        if (err) return;
                    });*/

                if(!data2.modlogchannel || data2.modlog === false) return message.channel.send(embed)
                if(data2.modlogchannel && data2.modlog === true){
                    let chane = message.guild.channels.cache.find(ch => ch.id === data2.modlogchannel)
                    let embed2 = new MessageEmbed()
                        .setAuthor(`${message.author.username} Banned ${toKick.user.username}!`, avatar)
                        .setColor("#ff0000")
                        .setThumbnail(toKick.user.displayAvatarURL)
                        .setFooter(message.member.displayName, message.author.displayAvatarURL)
                        .setTimestamp()
                        .addFields(
                            { name: `**User**`, value: `${toKick}`, inline: true},
                            { name: `**Moderator**`, value: `${message.author}`, inline: true},
                            { name: `**Reason**`, value: `${reasonsss}`, inline: true},
                            { name: `**Banned In Channel**`, value: `${message.channel}`},
                        )
                            chane.send(embed2)
                            return message.channel.send(embed)
                    }
            } else if (emoji === "❌") {
                msg.delete().catch(err => console.log(err))
                let embeded11 = new MessageEmbed()
                .setTitle('Cancelled Ban!')
                .setDescription(`${toBan.user.username} Your Alive Now!`)
                return message.channel.send(embeded11)
            }
        });
    }

exports.help = {
    name: "kick",
    description: "This Command Makes Users To Kick From The Server!",
    usage: "kick <id | mention>",
    example: "kick @GOOGLE#google"
};

exports.conf = {
    aliases: [],
}   