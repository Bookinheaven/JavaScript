const checkmodule = require('../../models/onlyguild') 
const { MessageEmbed, Role } = require('discord.js')
exports.run = async (client, message, args) => {
    const data = await checkmodule.findOne({
        GuildID: message.guild.id
    })
    if (!message.member.permissions.any(["ADMINISTRATOR", "MANAGE_GUILD", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_ROLES"])) {
        let noperauthor = new MessageEmbed()
        .setTitle(`${message.author.username} You Dont' Have Permission To Setup Counters!`)
        .setDescription(`Kindly Check That You Have **Administrator** Or **Manage Channel** or **Manage Guild**`)
        .setColor('GOLD')
    return message.channel.send(noperauthor);
    }
    let checkemb = new MessageEmbed()
        .setColor('#FF0064')
        .setTimestamp()
    //setup of permissions
    function guildfind(message, channeid) {
        let a = message.guild.channels.cache.find(channel => channel.id === channeid);
        return a
    }
    // server permissions
    if(message.guild.me.hasPermission('MANAGE_CHANNELS')){
        server = 'Working Perfectly' //checkemb.addField(`:white_check_mark: Bot Permission In Server ${message.guild.name}`, `\`\`\`Working Perfectly!\`\`\``)
        serverwor = ':white_check_mark:'
    } else if(!message.guild.me.hasPermission('MANAGE_CHANNELS')){
        server = 'Missing Permssion (Manage Channels)'//checkemb.addField(`:warning: Bot Permission In Server ${message.guild.name}`, `\`\`\`Manage Channels\`\`\``)
        serverwor = ':warning:'
    }
    checkemb.addFields(
		{ name: '**Server Stat Checkings!** :technologist:', value: `Your Server ${message.guild.name} Server stats check` },
		{ name: '> Bot Permssions over All Server for stats', value: `Status: ${serverwor} \`${server}\``},
		{ name: `> **Channels Stat Checkings!** :technologist:`, value: 'All Status Of Setup Channels'},
	)
    let x = 0
    //finding the data all
    if(data.all){
        let all = guildfind(message, data.all)
        await all
        if(all){
            let Manageper = all.permissionsFor(client.user.id).serialize().MANAGE_CHANNELS
            let Manageper2 = all.permissionsFor(client.user.id).serialize().VIEW_CHANNEL 
            if(Manageper === false && Manageper2 === false){
                x++
                checkemb.addField(`${x}. ALL Members Stats Channel Permission`, `Status: :warning: \`Manage Channels, View Channel\``)
            }
            if(Manageper === false && Manageper2 === true){
                x++
                checkemb.addField(`${x}. ALL Members Stats Channel Permission`, `Status: <a:LIVE:805007031823892480> \`Manage Channels\``)
            }
            if(Manageper2 === false && Manageper === true){
                x++
                checkemb.addField(`${x}. ALL Members Stats Channel Permission`, `Status: <a:LIVE:805007031823892480> \`View Channel\``)
            }
            if(Manageper === true && Manageper2 === true){
                x++
                checkemb.addField(`${x}. ALL Members Stats Channel Permission`, `Status: :white_check_mark: \`Working Perfectly!\``)
            }
        } else if(!all) {
            x++
            checkemb.addField(`${x}. ALL Members Stats Channel Permission`, `Status: :warning: \`Missing Channel!\``)
        }
    } else if(!data.all){}

    //finding the data members
    if(data.members){
        let members = guildfind(message, data.members)
        await members
        if(members){
            let Manageper = members.permissionsFor(client.user.id).serialize().MANAGE_CHANNELS
            let Manageper2 = members.permissionsFor(client.user.id).serialize().VIEW_CHANNEL 
            if(Manageper === false && Manageper2 === false){
                x++
                checkemb.addField(`${x}. Members Stats Channel Permission`, `Status: :warning: \`Manage Channels, View Channel\``)
            }
            if(Manageper === false && Manageper2 === true){
                x++
                checkemb.addField(`${x}. Members Stats Channel Permission`, `Status: <a:LIVE:805007031823892480> \`Manage Channels\``)
            }
            if(Manageper2 === false && Manageper === true){
                x++
                checkemb.addField(`${x}. Members Stats Channel Permission`, `Status: <a:LIVE:805007031823892480> \`View Channel\``)
            }
            if(Manageper === true && Manageper2 === true){
                x++
                checkemb.addField(`${x}. Members Stats Channel Permission`, `Status: :white_check_mark: \`Working Perfectly!\``)
            }
        } else if(!members) {
            x++
            checkemb.addField(`${x}. Members Stats Channel Permission`, `Status: :warning: \`Missing Channel!\``)
        }
    } else if(!data.members){}

    //finding the data bots
    if(data.bots){
        let bots = guildfind(message, data.bots)
        await bots
        if(bots){
            let Manageper = bots.permissionsFor(client.user.id).serialize().MANAGE_CHANNELS
            let Manageper2 = bots.permissionsFor(client.user.id).serialize().VIEW_CHANNEL 
            if(Manageper === false && Manageper2 === false){
                x++
                checkemb.addField(`${x}. Bots Stats Channel Permission`, `Status: :warning: \`Manage Channels, View Channel\``)
            }
            if(Manageper === false && Manageper2 === true){
                x++
                checkemb.addField(`${x}. Bots Stats Channel Permission`, `Status: <a:LIVE:805007031823892480> \`Manage Channels\``)
            }
            if(Manageper2 === false && Manageper === true){
                x++
                checkemb.addField(`${x}. Bots Stats Channel Permission`, `Status: <a:LIVE:805007031823892480> \`View Channel\``)
            }
            if(Manageper === true && Manageper2 === true){
                x++
                checkemb.addField(`${x}. Bots Stats Channel Permission`, `Status: :white_check_mark: \`Working Perfectly!\``)
            }
        } else if(!bots) {
            x++
            checkemb.addField(`${x}. Bots Stats Channel Permission`, `Status: :warning: \`Missing Channel!\``)
        }
    } else if(!data.bots){}

    //finding the data channels
    if(data.channels){
        let channels = guildfind(message, data.channels)
        await channels
        if(channels){
            let Manageper = channels.permissionsFor(client.user.id).serialize().MANAGE_CHANNELS
            let Manageper2 = channels.permissionsFor(client.user.id).serialize().VIEW_CHANNEL 
            if(Manageper === false && Manageper2 === false){
                x++
                checkemb.addField(`${x}. Channels Stats Channel Permission`, `Status: :warning: \`Manage Channels, View Channel\``)
            }
            if(Manageper === false && Manageper2 === true){
                x++
                checkemb.addField(`${x}. Channels Stats Channel Permission`, `Status: <a:LIVE:805007031823892480> \`Manage Channels\``)
            }
            if(Manageper2 === false && Manageper === true){
                x++
                checkemb.addField(`${x}. Channels Stats Channel Permission`, `Status: <a:LIVE:805007031823892480> \`View Channel\``)
            }
            if(Manageper === true && Manageper2 === true){
                x++
                checkemb.addField(`${x}. Channels Stats Channel Permission`, `Status: :white_check_mark: \`Working Perfectly!\``)
            }
        } else if(!channels) {
            x++
            checkemb.addField(`${x}. Channels Stats Channel Permission`, `Status: :warning: \`Missing Channel!\``)
        }
    } else if(!data.channels){}

    //finding the data text
    if(data.text){
        let text = guildfind(message, data.text)
        await text
        if(text){
            let Manageper = text.permissionsFor(client.user.id).serialize().MANAGE_CHANNELS
            let Manageper2 = text.permissionsFor(client.user.id).serialize().VIEW_CHANNEL 
            if(Manageper === false && Manageper2 === false){
                x++
                checkemb.addField(`${x}. Text Channels Stats Permission`, `Status: :warning: \`Manage Channels, View Channel\``)
            }
            if(Manageper === false && Manageper2 === true){
                x++
                checkemb.addField(`${x}. Text Channels Stats Channel Permission`, `Status: <a:LIVE:805007031823892480> \`Manage Channels\``)
            }
            if(Manageper2 === false && Manageper === true){
                x++
                checkemb.addField(`${x}. Text Channels Stats Channel Permission`, `Status: <a:LIVE:805007031823892480> \`View Channel\``)
            }
            if(Manageper === true && Manageper2 === true){
                x++
                checkemb.addField(`${x}. Text Channels Stats Channel Permission`, `Status: :white_check_mark: \`Working Perfectly!\``)
            }
        } else if(!text) {
            x++
            checkemb.addField(`${x}. Text Channels Stats Channel Permission`, `Status: :warning: \`Missing Channel!\``)
        }
    } else if(!data.text){}

    //finding the data voice
    if(data.voice){
        let voice = guildfind(message, data.voice)
        await voice
        if(voice){
            let Manageper = voice.permissionsFor(client.user.id).serialize().MANAGE_CHANNELS
            let Manageper2 = voice.permissionsFor(client.user.id).serialize().VIEW_CHANNEL 
            if(Manageper === false && Manageper2 === false){
                x++
                checkemb.addField(`${x}. Voice Channels Stats Permission`, `Status: :warning: \`Manage Channels, View Channel\``)
            }
            if(Manageper === false && Manageper2 === true){
                x++
                checkemb.addField(`${x}. Voice Channels Stats Channel Permission`, `Status: <a:LIVE:805007031823892480> \`Manage Channels\``)
            }
            if(Manageper2 === false && Manageper === true){
                x++
                checkemb.addField(`${x}. Voice Channels Stats Channel Permission`, `Status: <a:LIVE:805007031823892480> \`View Channel\``)
            }
            if(Manageper === true && Manageper2 === true){
                x++
                checkemb.addField(`${x}. Voice Channels Stats Channel Permission`, `Status: :white_check_mark: \`Working Perfectly!\``)
            }
        } else if(!voice) {
            x++
            checkemb.addField(`${x}. Voice Channels Stats Channel Permission`, `Status: :warning: \`Missing Channel!\``)
        }
    } else if(!data.voice){}

    //finding the data categories
    if(data.categories){
        let categories = guildfind(message, data.categories)
        await categories
        if(categories){
            let Manageper = categories.permissionsFor(client.user.id).serialize().MANAGE_CHANNELS
            let Manageper2 = categories.permissionsFor(client.user.id).serialize().VIEW_CHANNEL 
            if(Manageper === false && Manageper2 === false){
                x++
                checkemb.addField(`${x}. Categories Stats Channel Permission`, `Status: :warning: \`Manage Channels, View Channel\``)
            }
            if(Manageper === false && Manageper2 === true){
                x++
                checkemb.addField(`${x}. Categories Stats Channel Permission`, `Status: <a:LIVE:805007031823892480> \`Manage Channels\``)
            }
            if(Manageper2 === false && Manageper === true){
                x++
                checkemb.addField(`${x}. Categories Stats Channel Permission`, `Status: <a:LIVE:805007031823892480> \`View Channel\``)
            }
            if(Manageper === true && Manageper2 === true){
                x++
                checkemb.addField(`${x}. Categories Stats Channel Permission`, `Status: :white_check_mark: \`Working Perfectly!\``)
            }
        } else if(!categories) {
            x++
            checkemb.addField(`${x}. Categories Stats Channel Permission`, `Status: :warning: \`Missing Channel!\``)
        }
    } else if(!data.categories){}

    //finding the data announcement
    if(data.announcement){
        let announcement = guildfind(message, data.announcement)
        await announcement
        if(announcement){
            let Manageper = announcement.permissionsFor(client.user.id).serialize().MANAGE_CHANNELS
            let Manageper2 = announcement.permissionsFor(client.user.id).serialize().VIEW_CHANNEL 
            if(Manageper === false && Manageper2 === false){
                x++
                checkemb.addField(`${x}. Announcements Channels Stats Channel Permission`, `Status: :warning: \`Manage Channels, View Channel\``)
            }
            if(Manageper === false && Manageper2 === true){
                x++
                checkemb.addField(`${x}. Announcements Channels Stats Channel Permission`, `Status: <a:LIVE:805007031823892480> \`Manage Channels\``)
            }
            if(Manageper2 === false && Manageper === true){
                x++
                checkemb.addField(`${x}. Announcements Channels Stats Channel Permission`, `Status: <a:LIVE:805007031823892480> \`View Channel\``)
            }
            if(Manageper === true && Manageper2 === true){
                x++
                checkemb.addField(`${x}. Announcements Channels Stats Channel Permission`, `Status: :white_check_mark: \`Working Perfectly!\``)
            }
        } else if(!announcement) {
            x++
            checkemb.addField(`${x}. Announcements Channels Stats Channel Permission`, `Status: :warning: \`Missing Channel!\``)
        }
    } else if(!data.announcement){}

    //finding the data roles
    if(data.roles){
        let roles = guildfind(message, data.roles)
        await roles
        if(roles){
            let Manageper = roles.permissionsFor(client.user.id).serialize().MANAGE_CHANNELS
            let Manageper2 = roles.permissionsFor(client.user.id).serialize().VIEW_CHANNEL 
            if(Manageper === false && Manageper2 === false){
                x++
                checkemb.addField(`${x}. Roles Stats Channel Permission`, `Status: :warning: \`Manage Channels, View Channel\``)
            }
            if(Manageper === false && Manageper2 === true){
                x++
                checkemb.addField(`${x}. Roles Stats Channel Permission`, `Status: <a:LIVE:805007031823892480> \`Manage Channels\``)
            }
            if(Manageper2 === false && Manageper === true){
                x++
                checkemb.addField(`${x}. Roles Stats Channel Permission`, `Status: <a:LIVE:805007031823892480> \`View Channel\``)
            }
            if(Manageper === true && Manageper2 === true){
                x++
                checkemb.addField(`${x}. Roles Stats Channel Permission`, `Status: :white_check_mark: \`Working Perfectly!\``)
            }
        } else if(!roles) {
            x++
            checkemb.addField(`${x}. Roles Stats Channel Permission`, `Status: :warning: \`Missing Channel!\``)
        }
    } else if(!data.roles){}

    //finding the data role
    if(data.role){
        let role = guildfind(message, data.role)
        await role
        let roleid = message.guild.roles.cache.find(role => role.id === data.roleid);
        if(!roleid){}
        if(roleid){
        if(role){
            let Manageper = role.permissionsFor(client.user.id).serialize().MANAGE_CHANNELS
            let Manageper2 = role.permissionsFor(client.user.id).serialize().VIEW_CHANNEL 
            if(Manageper === false && Manageper2 === false){
                x++
                checkemb.addField(`${x}. Solo Role (${roleid.name}) Stats Channel Permission`, `Status: :warning: \`Manage Channels, View Channel\``)
            }
            if(Manageper === false && Manageper2 === true){
                x++
                checkemb.addField(`${x}. Solo Role (${roleid.name}) Stats Channel Permission`, `Status: <a:LIVE:805007031823892480> \`Manage Channels\``)
            }
            if(Manageper2 === false && Manageper === true){
                x++
                checkemb.addField(`${x}. Solo Role (${roleid.name}) Stats Channel Permission`, `Status: <a:LIVE:805007031823892480> \`View Channel\``)
            }
            if(Manageper === true && Manageper2 === true){
                x++
                checkemb.addField(`${x}. Solo Role (${roleid.name}) Stats Channel Permission`, `Status: :white_check_mark: \`Working Perfectly!\``)
            }
        } else if(!role) {
            x++
            checkemb.addField(`${x}. Solo Role (${roleid.name}) Stats Channel Permission`, `Status: :warning: \`Missing Channel!\``)
        } 
        }
    } else if(!data.role){}

    //finding the data emojis
    if(data.emojis){
        let emojis = guildfind(message, data.emojis)
        await emojis
        if(emojis){
            let Manageper = emojis.permissionsFor(client.user.id).serialize().MANAGE_CHANNELS
            let Manageper2 = emojis.permissionsFor(client.user.id).serialize().VIEW_CHANNEL 
            if(Manageper === false && Manageper2 === false){
                x++
                checkemb.addField(`${x}. Emojis Stats Channel Permission`, `Status: :warning: \`Manage Channels, View Channel\``)
            }
            if(Manageper === false && Manageper2 === true){
                x++
                checkemb.addField(`${x}. Emojis Stats Channel Permission`, `Status: <a:LIVE:805007031823892480> \`Manage Channels\``)
            }
            if(Manageper2 === false && Manageper === true){
                x++
                checkemb.addField(`${x}. Emojis Stats Channel Permission`, `Status: <a:LIVE:805007031823892480> \`View Channel\``)
            }
            if(Manageper === true && Manageper2 === true){
                x++
                checkemb.addField(`${x}. Emojis Stats Channel Permission`, `Status: :white_check_mark: \`Working Perfectly!\``)
            }
        } else if(!emojis) {
            x++
            checkemb.addField(`${x}. Emojis Stats Stats Channel Permission`, `Status: :warning: \`Missing Channel!\``)
        }
    } else if(!data.emojis){}

    //finding the data static
    if(data.static){
        let static = guildfind(message, data.static)
        await static
        if(static){
            let Manageper = static.permissionsFor(client.user.id).serialize().MANAGE_CHANNELS
            let Manageper2 = static.permissionsFor(client.user.id).serialize().VIEW_CHANNEL 
            if(Manageper === false && Manageper2 === false){
                x++
                checkemb.addField(`${x}. Static Emojis Stats Channel Permission`, `Status: :warning: \`Manage Channels, View Channel\``)
            }
            if(Manageper === false && Manageper2 === true){
                x++
                checkemb.addField(`${x}. Static Emojis Stats Channel Permission`, `Status: <a:LIVE:805007031823892480> \`Manage Channels\``)
            }
            if(Manageper2 === false && Manageper === true){
                x++
                checkemb.addField(`${x}. Static Emojis Stats Channel Permission`, `Status: <a:LIVE:805007031823892480> \`View Channel\``)
            }
            if(Manageper === true && Manageper2 === true){
                x++
                checkemb.addField(`${x}. Static Emojis Stats Channel Permission`, `Status: :white_check_mark: \`Working Perfectly!\``)
            }
        } else if(!static) {
            x++
            checkemb.addField(`${x}. Static Emojis Stats Channel Permission`, `Status: :warning: \`Missing Channel!\``)
        }
    } else if(!data.static){}

    //finding the data animated
    if(data.animated){
        let animated = guildfind(message, data.animated)
        await animated
        if(animated){
            let Manageper = animated.permissionsFor(client.user.id).serialize().MANAGE_CHANNELS
            let Manageper2 = animated.permissionsFor(client.user.id).serialize().VIEW_CHANNEL 
            if(Manageper === false && Manageper2 === false){
                x++
                checkemb.addField(`${x}. Animated Emojis Stats Channel Permission`, `Status: :warning: \`Manage Channels, View Channel\``)
            }
            if(Manageper === false && Manageper2 === true){
                x++
                checkemb.addField(`${x}. Animated Emojis Stats Channel Permission`, `Status: <a:LIVE:805007031823892480> \`Manage Channels\``)
            }
            if(Manageper2 === false && Manageper === true){
                x++
                checkemb.addField(`${x}. Animated Emojis Stats Channel Permission`, `Status: <a:LIVE:805007031823892480> \`View Channel\``)
            }
            if(Manageper === true && Manageper2 === true){
                x++
                checkemb.addField(`${x}. Animated Emojis Stats Channel Permission`, `Status: :white_check_mark: \`Working Perfectly!\``)
            }
        } else if(!animated) {
            x++
            checkemb.addField(`${x}. Animated Emojis Stats Channel Permission`, `Status: :warning: \`Missing Channel!\``)
        }
    } else if(!data.animated){}

    //finding the data boosts
    if(data.boosts){
        let boosts = guildfind(message, data.boosts)
        await boosts
        if(boosts){
            let Manageper = boosts.permissionsFor(client.user.id).serialize().MANAGE_CHANNELS
            let Manageper2 = boosts.permissionsFor(client.user.id).serialize().VIEW_CHANNEL 
            if(Manageper === false && Manageper2 === false){
                x++
                checkemb.addField(`${x}. Server Boosts Stats Channel Permission`, `Status: :warning: \`Manage Channels, View Channel\``)
            }
            if(Manageper === false && Manageper2 === true){
                x++
                checkemb.addField(`${x}. Server Boosts Stats Channel Permission`, `Status: <a:LIVE:805007031823892480> \`Manage Channels\``)
            }
            if(Manageper2 === false && Manageper === true){
                x++
                checkemb.addField(`${x}. Server Boosts Stats Channel Permission`, `Status: <a:LIVE:805007031823892480> \`View Channel\``)
            }
            if(Manageper === true && Manageper2 === true){
                x++
                checkemb.addField(`${x}. Server Boosts Stats Channel Permission`, `Status: :white_check_mark: \`Working Perfectly!\``)
            }
        } else if(!boosts) {
            x++
            checkemb.addField(`${x}. Server Boosts Stats Channel Permission`, `Status: :warning: \`Missing Channel!\``)
        }
    } else if(!data.boosts){}

    //finding the data tier
    if(data.tier){
        let tier = guildfind(message, data.tier)
        await tier
        if(tier){
            let Manageper = tier.permissionsFor(client.user.id).serialize().MANAGE_CHANNELS
            let Manageper2 = tier.permissionsFor(client.user.id).serialize().VIEW_CHANNEL 
            if(Manageper === false && Manageper2 === false){
                x++
                checkemb.addField(`${x}. Server tier Stats Channel Permission`, `Status: :warning: \`Manage Channels, View Channel\``)
            }
            if(Manageper === false && Manageper2 === true){
                x++
                checkemb.addField(`${x}. Server tier Stats Channel Permission`, `Status: <a:LIVE:805007031823892480> \`Manage Channels\``)
            }
            if(Manageper2 === false && Manageper === true){
                x++
                checkemb.addField(`${x}. Server tier Stats Channel Permission`, `Status: <a:LIVE:805007031823892480> \`View Channel\``)
            }
            if(Manageper === true && Manageper2 === true){
                x++
                checkemb.addField(`${x}. Server tier Stats Channel Permission`, `Status: :white_check_mark: \`Working Perfectly!\``)
            }
        } else if(!tier) {
            x++
            checkemb.addField(`${x}. Server tier Stats Channel Permission`, `Status: :warning: \`Missing Channel!\``)
        }
    } else if(!data.tier){}

    message.channel.send(checkemb)




}

exports.help = {
    name: "check",
}

exports.conf = {
    aliases: [],
    cooldown: 10
}
      