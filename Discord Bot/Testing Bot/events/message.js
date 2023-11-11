const userdata1 = require('../models/userstuff')
const usergil = require('../models/guildstuff')
const { owners } = require('../config.json')
const Discord = require('discord.js');
const cooldowns = new Discord.Collection()
const db = require('quick.db')
const prefix = require('../models/onlyguild')
module.exports = async (client, message) => {
    if (message.author.bot) return;
    const data = await prefix.findOne({
        GuildID: message.guild.id
    });
    if(!data){
        let newData = new prefix({
            GuildID: message.guild.id
        })
        await newData.save();
        let embedasd = new Discord.MessageEmbed()
            .setTitle('Registred!')
            .setColor('GOLD')
            .setDescription('<:like:805306611073679370>  **Your Server As Been Registred Now! You Can Use All Commands!**')
            .setFooter(`${client.user.username} by BurnKnuckle & Mr.Machine`)
        message.channel.send(embedasd)
    }
    const userdi = await usergil.findOne({
        GuildID: message.guild.id,
        UserID: message.author.id
    });
    if(!userdi){
        let newData = new usergil({
            GuildID: message.guild.id,
            UserID: message.author.id
        })
        await newData.save();
    }
    const datatypeuser = await userdata1.findOne({
        UserID: message.author.id
    });
    if(!datatypeuser){
        let newData = new userdata1({
            UserID: message.author.id
        })
        await newData.save();
    }
    client.emit('experience', message);
    const messageArray = message.content.split(' ');
    const cmd = messageArray[0];
    const args = messageArray.slice(1);

    let afk = new db.table("AFKs"),
    authorStatus = await afk.fetch(message.author.id),
    mentioned = message.mentions.members.first();
    if (mentioned) {
        let status = await afk.fetch(mentioned.id);
        
        if (status) {
        const embed = new Discord.MessageEmbed()
        .setColor(0xffffff)
        .setDescription(`This user (${mentioned.user.tag}) is AFK: **${status}**`)
        message.channel.send(embed)
        }
    }

    if (authorStatus) {
        const embed = new Discord.MessageEmbed()
        .setColor(0xffffff)
        .setDescription(`**${message.author.tag}** is no longer AFK.`)
        message.channel.send(embed).then(i => i.delete({timeout: 5000}));
        afk.delete(message.author.id)
    }
    if(data) {
        let antiadssss = await data.antiads
            if (!message.member.permissions.any(["ADMINISTRATOR", "MANAGE_GUILD", "KICK_MEMBERS", "BAN_MEMBERS"])){
                if(antiadssss === true){
                    let inviteLink = ["discord.gg/", "discord.com/invite", "discordapp.com/invite"];
                    if (inviteLink.some(word => message.content.toLowerCase().includes(word))) {
                        await message.delete().catch(err => console.log(err))
                        let adembed = new Discord.MessageEmbed()
                            .setTitle(`You Cant Send in ${message.guild.username}`)
                            .setDescription(`Beacuse Anti Advertisement!\nDo You Want To Add Me In Your Server?\n`)
                            .addField(`${client.user.username}, Bot Invite Link : [Click Here](https://discord.com/oauth2/authorize?client_id=786094670472019998&scope=bot&permissions=469770302)\n For More Information Join:`, "Support Server: [Click here](https://discord.gg/VyasQKfRJc)\nBurnKnuckle Comrade Server: [Click here](https://discord.gg/VyasQKfRJc)\nMachine's Lounge | Gaming Server: [Click here](https://discord.gg/EvnYert5Wm)")
                            .setTimestamp()
                        message.author.send(adembed)
                        return message.channel.send(`Bro ${message.author.username}, you can't promote your server here!`)
                    }
                }
            }
        const prefix = data.Prefix;

        if (!message.content.startsWith(prefix)) return;
        const commandfile = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
        if(commandfile){
            let randomNums = Math.floor(Math.random() * 101 + 1)
            if(randomNums > 80){
                if(!datatypeuser) return;
                datatypeuser.Bankspace += parseInt(500)
                await datatypeuser.save().catch(err => console.log(err))
            }
            if(randomNums < 1) {
                let avatar = message.author.avatarURL({size: 2048}); // Use 2048 for high quality avatar.
                let fisrembed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.username}`, avatar)
                .setDescription(`Your Soooo Lucky! <a:banknote:804663263349440512> You Got a BankNote, Use Me More To Get More!`)
                .setColor('#6300ff')
                .setTimestamp()
                if(!datatypeuser) return;
                datatypeuser.Bankspace += parseInt(1000)
                datatypeuser.banknotes += parseInt(1)
                await datatypeuser.save().catch(err => console.log(err))
                message.author.send(fisrembed)
            }
            if(randomNums > 99) {
                if(!datatypeuser) return;
                let avatar = message.author.avatarURL({size: 2048}); // Use 2048 for high quality avatar.
                let fisrembed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.username}`, avatar)
                .setDescription(`Your Lucky!, You Got a LootBox, Use Me More To Get More!`)
                .setColor('#6300ff')
                .setThumbnail('https://emoji.gg/assets/emoji/DefianceLootBox.png')
                .setTimestamp()
                datatypeuser.lootbox += parseInt(1)
                await datatypeuser.save().catch(err => console.log(err))
                message.author.send(fisrembed)
            }
        }
        if (!commandfile) return message.react('😂');
        if (!cooldowns.has(commandfile.help.name)) cooldowns.set(commandfile.help.name, new Discord.Collection());
        
        const member = message.member,
                now = Date.now(),
                timestamps = cooldowns.get(commandfile.help.name),
                cooldownAmount = (commandfile.conf.cooldown || 3) * 1000;
        
        if (!timestamps.has(member.id)) {
            if (!owners.includes(message.author.id)) {
            timestamps.set(member.id, now);
            }
        } else {
            const expirationTime = timestamps.get(member.id) + cooldownAmount;
            
            if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.channel.send(`Cooldown dude, Please wait **${timeLeft.toFixed(1)}** Seconds to Try the command again.`);
            }
            
            timestamps.set(member.id, now);
            setTimeout(() => timestamps.delete(member.id), cooldownAmount); // This will delete the cooldown from the user by itself.
        }
        commandfile.run(client, message, args)   
    }

}