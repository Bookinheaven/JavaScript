const { MessageEmbed } = require("discord.js")
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");
const mutes = require('../../models/guildstuff') 
const channel = require('../../models/onlyguild')
const Discord = require('discord.js')
exports.run = async (client, message, args) => {
   //const logChannel = message.guild.channels.cache.find(c => c.name === "logs") || message.channel;

   //if (message.deletable) message.delete().catch(err => console.log(err))

   // No args
   if (!args[0]) {
       return message.reply("Please provide a person to Mute.").then(msg => {
           msg.delete({ timeout: 5000 }).catch(err => console.log(err))
       })
   }
/*
   // No reason
   if (!args[1]) {
       return message.reply("Please provide a reason to Mute.").then(msg => {
           msg.delete({ timeout: 5000 }).catch(err => console.log(err))
       })
   }
   */
    // No bot 
  if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
    return message.channel.send("<a:uncheck:800984261192187914> I Dont' Have Permission To Change Mute!\n Kindly Check That I Have Manage Roles!");
  }
   // No author permissions
   if (!message.member.permissions.any(["ADMINISTRATOR", "MANAGE_GUILD", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_ROLES"])) {
    return message.channel.send("<a:uncheck:800984261192187914> You Dont' Have Permission To Change Mute!\n Kindly Check That You Have Administrator Or Manage Guild Or Kick Members & Ban Members");
  }

   const tomute = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
   const data = await mutes.findOne({
    GuildID: message.guild.id,
    UserID: tomute.id
    })
    const data2 = await channel.findOne({
        GuildID: message.guild.id
    })
    let avatar = message.author.avatarURL({size: 2048}); // Use 2048 for high quality avatar.
   if(message.member.roles.highest.position > tomute.position ) return message.channel.send("You can not mute a member that is equal to or higher than yourself!");
   // No member found
   if (!tomute) {
       return message.reply("Couldn't find that member, Try again").then(msg => {
           msg.delete({ timeout: 5000 }).catch(err => console.log(err))
       })
   }

   // Can't ban urself
   if (tomute.id === message.author.id) {
       return message.reply("You can't Mute yourself...").then(msg => {
           msg.delete({ timeout: 5000 }).catch(err => console.log(err))
       })
   }
   if(args[1]) reasonsss = args.slice(1).join(" ")
   else if(!args[1]) reasonsss = `Unspecified`
   const embed = new MessageEmbed()
    .setAuthor(`${message.author.username} Muted ${tomute.user.username}!`, avatar)
    .setColor("#ff0000")
    .setFooter(message.member.displayName, message.author.displayAvatarURL)
    .setTimestamp()
    .setDescription(`**Reason:** ${reasonsss}`);

    const promptEmbed = new MessageEmbed()
    .setColor("GREEN")
    .setAuthor(`Verification, Invalid after 30s.`)
    .setDescription(`Do you want to mute ${tomute}?`)
    let muteRole = message.guild.roles.cache.find(m => m.name === "Muted");
            if (!muteRole) {
               try {
                  message.guild.roles.create({
                      data: {
                        name: "Muted",
                        color: "#000000",
                        },
                        reason: 'For Muting The Person',
                }) 
                  message.guild.channels.cache.forEach(async (channel, id) => {
                     await channel.createOverwrite(muteRole, {
                        SEND_MESSAGES: false,
                        MANAGE_MESSAGES: false,
                        READ_MESSAGES: false,
                        ADD_REACTIONS: false
                     }).catch(err => {
                        if (err) return;
                     })
                  });
                  return message.channel.send('Muted Role Created! Now Mute Will Work!')
               } catch(e) {
                if (e) return;
             }
           }
           if(muteRole){
               if (tomute.roles.cache.has(muteRole.id)) return message.channel.send(`${tomute.user.username} Is Already Muted!`)
           }
           
        // Send the message
        await message.channel.send(promptEmbed).then(async msg => {
            // Await the reactions and the reactioncollector
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);
           
            // Verification stuffs
            if (emoji === "✅") {
                msg.delete();
                if(data){
                    data.total_mutes += 1
                    data.save().catch(err => console.log(err))
                } else if(!data){
                    let newData = new mutes({
                        GuildID: message.guild.id,
                        UserID: tomute.id,
                        total_mutes : 1
                    })
                    await newData.save();
                }
                await tomute.roles.add(muteRole)
                    .catch(err => {
                        if (err) return;
                    });
                    if(!data2.modlogchannel || data2.modlog === false) return message.channel.send(embed)
                    if(data2.modlogchannel && data2.modlog === true){
                        let chane = message.guild.channels.cache.find(ch => ch.id === data2.modlogchannel)
                        let embed2 = new MessageEmbed()
                            .setAuthor(`${message.author.username} Muted ${tomute.user.username}!`, avatar)
                            .setColor("#ff0000")
                            .setThumbnail(tomute.user.displayAvatarURL)
                            .setFooter(message.member.displayName, message.author.displayAvatarURL)
                            .setTimestamp()
                            .addFields(
                                { name: `**User**`, value: `${tomute}`, inline: true},
                                { name: `**Moderator**`, value: `${message.author}`, inline: true},
                                { name: `**Reason**`, value: `${reasonsss}`, inline: true},
                                { name: `**Warned In Channel**`, value: `${message.channel}`},
                            )
                                chane.send(embed2)
                                return message.channel.send(embed)
                        }
            } else if (emoji === "❌") {
                msg.delete().catch(err => console.log(err))
                let embeded11 = new MessageEmbed()
                .setTitle('Cancelled Mute!')
                .setDescription(`${tomute.user.username} Your Alive Now!`)
                return message.channel.send(embeded11)
            }
        });
            } 
        
    

exports.help = {
   name: "mute",
   description: "This Command Makes Users To Mutes From The Server!",
   usage: "mute <id | mention>",
   example: "+mute @GOOGLE#google"
};

exports.conf = {
      aliases: [],
}   