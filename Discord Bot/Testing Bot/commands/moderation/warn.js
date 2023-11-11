const { MessageEmbed } = require("discord.js");
const { stripIndents } = require('common-tags')
const warn = require('../../models/guildstuff') 
const channel = require('../../models/onlyguild')
exports.run = async (client, message, args) => {
    const data2 = await channel.findOne({
        GuildID: message.guild.id
    })
    logChannel = message.channel
    let dUser = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
    if(dUser.id == message.author.id) return message.channel.send('I Cant Do IT Cheaf')
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You can't use that command!")
    if (!dUser) return message.channel.send("Can't find user!")
    //if(dUser.highestRole.position >= message.member.highestRole.position) return message.channel.send("You can not mute a member that is equal to or higher than yourself!");
    let dMessage = args.join(" ").slice(22);
    if (dMessage.length < 1) dMessage = `Unspecified`
    let avatar = message.author.avatarURL({size: 2048}); // Use 2048 for high quality avatar.
    const warning = {
        author: message.member.user.tag,
        timestamp: new Date().getTime(),
        dMessage,
      }
    let embedofwarn = new MessageEmbed()
    .setAuthor(`${message.author.username} Warned ${dUser.user.username}!`, avatar)
    .setColor('RED')
    .setDescription(`**Reason:** ${dMessage}`);
    let dmembedofwarn = new MessageEmbed()
    .setAuthor(`${message.author.username} Warned You!`, avatar)
    .setColor('RED')
    .setDescription(`Server Name: ${message.guild.name}\nReason For Warn: ${dMessage}\nBe Careful Next Time!`)
    await dUser.send(dmembedofwarn)

    const datas = await warn.findOne({
        GuildID: message.guild.id,
        UserID: dUser.id
    })
    if(!datas){
        let newData = new warn({
            GuildID: message.guild.id,
            UserID: dUser.id,
            total_warns : 1
        })
        await newData.save();
    } else if(await datas){
        datas.warnreason = warning
        datas.total_warns += 1
        await datas.save().catch(err => console.log(err))
        let amout = datas.total_warns 
        if(amout % 5 === 0){
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
                    });
                });
            } catch(e) {
            console.log(e.stack);
            }
        }
        dUser.roles.add(muteRole)
                .catch(err => {
                    if (err) return;
                });
    }
        
    }
        if(!data2.modlogchannel || data2.modlog === false) return;
        if(data2.modlogchannel && data2.modlog === true){
            let chane = message.guild.channels.cache.find(ch => ch.id === data2.modlogchannel)
            if (!datas){
                let embed212 = new MessageEmbed()
                        .setAuthor(`${message.author.username} Warned ${dUser.user.username}!`, avatar)
                        .setColor("RED")
                        .setThumbnail(dUser.user.displayAvatarURL)
                        .setFooter(message.member.displayName, message.author.displayAvatarURL)
                        .setTimestamp()
                        .addFields(
                            { name: `**User**`, value: `${dUser}`, inline: true},
                            { name: `**Moderator**`, value: `${message.author}`, inline: true},
                            { name: `**Reason**`, value: `${dMessage}`, inline: true},
    
                            { name: `**Warned In Channel**`, value: `${message.channel}`},
                        )
                    chane.send(embed212)
                    return message.channel.send(embedofwarn)
            }
            else if(datas.total_warns){
                let amout = datas.total_warns 
                if(amout % 5 === 0){
                    let embed = new MessageEmbed()
                        .setAuthor(`${dUser.user.username} Muted!`, avatar)
                        .setColor("#ff0000")
                        .setThumbnail(dUser.user.displayAvatarURL)
                        .setFooter(message.member.displayName, message.author.displayAvatarURL)
                        .setTimestamp()
                        .setDescription(`User: ${dUser}\nModerator by: ${message.author}\nReason: More Than 5 Warns`);
    
                    logChannel.send(embed);
    
                    let embed2 = new MessageEmbed()
                        .setAuthor(`${message.author.username} Muted ${dUser.user.username}!`, avatar)
                        .setColor("#ff0000")
                        .setThumbnail(dUser.user.displayAvatarURL)
                        .setFooter(message.member.displayName, message.author.displayAvatarURL)
                        .setTimestamp()
                        .addFields(
                            { name: `**User**`, value: `${dUser}`, inline: true},
                            { name: `**Moderator**`, value: `${message.author}`, inline: true},
                            { name: `**Reason**`, value: `${dMessage}`, inline: true},
    
                        )
                    chane.send(embed2)
    
                } else {
                    let embed212 = new MessageEmbed()
                        .setAuthor(`${message.author.username} Warned ${dUser.user.username}!`, avatar)
                        .setColor("RED")
                        .setThumbnail(dUser.user.displayAvatarURL)
                        .setFooter(message.member.displayName, message.author.displayAvatarURL)
                        .setTimestamp()
                        .addFields(
                            { name: `**User**`, value: `${dUser}`, inline: true},
                            { name: `**Moderator**`, value: `${message.author}`, inline: true},
                            { name: `**Reason**`, value: `${dMessage}`, inline: true},
    
                            { name: `**Warned In Channel**`, value: `${message.channel}`},
                        )
                    chane.send(embed212)
                    return message.channel.send(embedofwarn)
                }
            } 
            
        } 

        

    
    

    }

exports.help = {
    name: "warn",
    description: "This Command Makes Users To warns From The Server!",
    usage: "warn <id | mention>",
    example: "warn @GOOGLE#google"
 };
 
 exports.conf = {
       aliases: [],
 }   