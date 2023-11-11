const { MessageEmbed } = require('discord.js')
const setuping = require('../../models/onlyguild')
let ms = require("parse-ms");
exports.run = async (client, message, args) => {
    const data = await setuping.findOne({
        GuildID: message.guild.id
    })
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS") || !message.guild.me.hasPermission("MANAGE_GUILD") || !message.guild.me.hasPermission("VIEW_CHANNEL")) {
        let mea = new MessageEmbed()
            .setTitle(`I Dont' Have Permission To create, update, delete and change Counters!`)
            .setDescription(`Kindly Check That I Have **Administrator** Or **Manage Channel** or **Manage Guild**`)
            .setColor('GOLD')
        return message.channel.send(mea);
      }
    if (!message.member.permissions.any(["ADMINISTRATOR", "MANAGE_GUILD", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_ROLES"])) {
        let noperauthor = new MessageEmbed()
        .setTitle(`${message.author.username} You Dont' Have Permission To create, update, delete and change Counters!`)
        .setDescription(`Kindly Check That You Have **Administrator** Or **Manage Channel** or **Manage Guild**`)
        .setColor('GOLD')
    return message.channel.send(noperauthor);
    }
    async function deletechannel (message, channeid){
        this.channel = channeid
        const del = message.guild.channels.cache.get(this.channel)
        if(!del) return;
        del.delete()
        return
    }
    let embed1 = new MessageEmbed()
    .setTitle(`:warning: Didn't Mentioned Any Command! :warning:`)
    .setColor('GOLD')
    .setDescription(`Provide An Command **(you can use create, change, delete or update)**`)
    if(!args[0]) return message.channel.send(embed1)
    let text = args[0].toLowerCase()
    if(text == 'delete'){
        if(data.setups === true){
            let filter = (message) => !message.author.bot;
    
            let options = {
              max: 1,
              time: 15000
            };
            let collector = message.channel.createMessageCollector(filter, options);
    
            collector.on('collect', async (m) => {
                if(m.content == 'cancel'){
                    collector.stop()
                    let cancel = new MessageEmbed()
                        .setTitle(`Process Status **Stat Counter Delete**`)
                        .setDescription(`:x: Process Has Been Canceled!`)
                        .setColor('RED')
                    await message.channel.send(cancel);
                    return;
                }
            });
    
            collector.on('end', async (collected, reason) => {
                if (reason === 'time') {
                    return message.channel.send(timeup);
                } else if(!collected.array()[0].content){
                    return;
                } else if (collected.array()[0].content){
                    let filter1 = (message) => !message.author.bot;
    
                    let options = {
                    max: 1,
                    time: 15000
                    };
                    let collector = message.channel.createMessageCollector(filter1, options);
                    let timeup = new MessageEmbed()
                        .setTitle(`Process Status of **Stat Counter Delete**!`)
                        .setDescription(`⏰ Process Has Been Canceled! Because You Didn't Respond in Time!.`)
                        .setColor('RED')
                    let no = new MessageEmbed()
                        .setTitle(`Process Status of **Stat Counter Delete**!`)
                        .setDescription(`:x: Process Has Been Canceled!`)
                        .setColor('RED')
                    switch(collected.array()[0].content){
                        case 'all':
                            if(!data.all || data.all === undefined){
                                let already = new MessageEmbed()
                                .setColor('RED')
                                .setDescription(`All Members Counter Has Been Already Deleted! or Not Yet Created, to Create Use Command \`${data.Prefix}counter create\``)
                                return message.channel.send(already)
                            }
                            let embed1 = new MessageEmbed()
                                .setTitle(`:warning: Warning Alert! :warning:`)
                                .setColor('GOLD')
                                .setDescription(`<a:LIVE:805007031823892480> Do you really want to delete the counter all members? \`yes\` or \`no\``)
                            message.channel.send(embed1)
                    
                            collector.on('collect', async (m) => {
                                if(m.content == 'cancel'){
                                    collector.stop()
                                    await message.channel.send(no);
                                    return;
                                }
                            });
                    
                            collector.on('end', async (collected, reason) => {
                                if (reason === 'time') {
                                    return message.channel.send(timeup);
                                } else if(!collected.array()[0].content){
                                    return;
                                } else if (collected.array()[0].content){
                                    if(collected.array()[0].content == 'yes'){
                                        deletechannel(message, data.all)
                                        data.all = undefined
                                        data.save().catch(err => console.log(err))
                                        let deleted = new MessageEmbed()
                                            .setTitle(`:white_check_mark: Deleted!`)
                                            .setDescription(`Deleted **ALL Members Counter Channel** SuccessFully!`)
                                            .setColor('#62FC1A')
                                        await message.channel.send(deleted)
                                        return;
                                        
                                    } else if(collected.array()[0].content == 'no'){
                                        return message.channel.send(no);
                                    }
                                }
                            })
                            break
                            case 'members':
                                if(!data.members || data.members === undefined){
                                    let already = new MessageEmbed()
                                    .setColor('RED')
                                    .setDescription(`Members Counter Has Been Already Deleted! or Not Yet Created`)
                                    return message.channel.send(already)
                                }
                                let embed2 = new MessageEmbed()
                                    .setTitle(`:warning: Warning Alert! :warning:`)
                                    .setColor('GOLD')
                                    .setDescription(`<a:LIVE:805007031823892480> Do you really want to delete the counter members? \`yes\` or \`no\``)
                                message.channel.send(embed2)
                    
                            collector.on('collect', async (m) => {
                                if(m.content == 'cancel'){
                                    collector.stop()
                                    await message.channel.send(no);
                                    return;
                                }
                            });
                    
                            collector.on('end', async (collected, reason) => {
                                if (reason === 'time') {
                                    return message.channel.send(timeup);
                                } else if(!collected.array()[0].content){
                                    return;
                                } else if (collected.array()[0].content){
                                    if(collected.array()[0].content == 'yes'){
                                        deletechannel(message, data.members)
                                        data.members = undefined
                                        data.save().catch(err => console.log(err))
                                        let deleted1 = new MessageEmbed()
                                            .setTitle(`:white_check_mark: Deleted!`)
                                            .setDescription(`Deleted **Members Counter Channel** SuccessFully!`)
                                            .setColor('#62FC1A')
                                        await message.channel.send(deleted1)
                                        return;
                                        
                                    } else if(collected.array()[0].content == 'no'){
                                        await message.channel.send(no);
                                        return;
                                    }
                                }
                            })
                            break
                            case 'bots':
                                if(!data.bots || data.bots === undefined){
                                    let already = new MessageEmbed()
                                    .setColor('RED')
                                    .setDescription(`Bots Counter Has Been Already Deleted! or Not Yet Created`)
                                    return message.channel.send(already)
                                }
                                let embed3 = new MessageEmbed()
                                    .setTitle(`:warning: Warning Alert! :warning:`)
                                    .setColor('GOLD')
                                    .setDescription(`<a:LIVE:805007031823892480> Do you really want to delete the counter bots? \`yes\` or \`no\``)
                                message.channel.send(embed3)
        
                            collector.on('collect', async (m) => {
                                if(m.content == 'cancel'){
                                    collector.stop()
                                    await message.channel.send(no);
                                    return;
                                }
                            });
                    
                            collector.on('end', async (collected, reason) => {
                                if (reason === 'time') {
                                    return message.channel.send(timeup);
                                } else if(!collected.array()[0].content){
                                    return;
                                } else if (collected.array()[0].content){
                                    if(collected.array()[0].content == 'yes'){
                                        deletechannel(message, data.bots)
                                        data.bots = undefined
                                        data.save().catch(err => console.log(err))
                                        let deleted1 = new MessageEmbed()
                                            .setTitle(`:white_check_mark: Deleted!`)
                                            .setDescription(`Deleted **Bots Counter Channel** SuccessFully!`)
                                            .setColor('#62FC1A')
                                        await message.channel.send(deleted1)
                                        return;
                                        
                                    } else if(collected.array()[0].content == 'no'){
                                        await message.channel.send(cancel);
                                        return;
                                    }
                                }
                            })
                            break
                            case 'channels':
                                if(!data.channels || data.channels === undefined){
                                    let already = new MessageEmbed()
                                    .setColor('RED')
                                    .setDescription(`Channels Counter Has Been Already Deleted! or Not Yet Created`)
                                    return message.channel.send(already)
                                }
                                let embed4 = new MessageEmbed()
                                    .setTitle(`:warning: Warning Alert! :warning:`)
                                    .setColor('GOLD')
                                    .setDescription(`<a:LIVE:805007031823892480> Do you really want to delete the counter channels? \`yes\` or \`no\``)
                                message.channel.send(embed4)
                    
                            collector.on('collect', async (m) => {
                                if(m.content == 'cancel'){
                                    collector.stop()
                                    await message.channel.send(no);
                                    return;
                                }
                            });
                    
                            collector.on('end', async (collected, reason) => {
                                if (reason === 'time') {
                                    return message.channel.send(timeup);
                                } else if(!collected.array()[0].content){
                                    return;
                                } else if (collected.array()[0].content){
                                    if(collected.array()[0].content == 'yes'){
                                        deletechannel(message, data.channels)
                                        data.channels = undefined
                                        data.save().catch(err => console.log(err))
                                        let deleted2 = new MessageEmbed()
                                            .setTitle(`:white_check_mark: Deleted!`)
                                            .setDescription(`Deleted **Channels Counter Channel** SuccessFully!`)
                                            .setColor('#62FC1A')
                                        await message.channel.send(deleted2)
                                        return;
                                        
                                    } else if(collected.array()[0].content == 'no'){
                                        return message.channel.send(no);
                                    }
                                }
                            })
                            break
                            case 'text':
                                if(!data.text || data.text === undefined){
                                    let already = new MessageEmbed()
                                    .setColor('RED')
                                    .setDescription(`Text Counter Has Been Already Deleted! or Not Yet Created`)
                                    return message.channel.send(already)
                                }
                                let embed5 = new MessageEmbed()
                                    .setTitle(`:warning: Warning Alert! :warning:`)
                                    .setColor('GOLD')
                                    .setDescription(`<a:LIVE:805007031823892480> Do you really want to delete the counter text? \`yes\` or \`no\``)
                                message.channel.send(embed5)
                    
                            collector.on('collect', async (m) => {
                                if(m.content == 'cancel'){
                                    collector.stop()
                                    await message.channel.send(no)
                                    return;
                                }
                            });
                    
                            collector.on('end', async (collected, reason) => {
                                if (reason === 'time') {
                                    return message.channel.send(timeup);
                                } else if(!collected.array()[0].content){
                                    return;
                                } else if (collected.array()[0].content){
                                    if(collected.array()[0].content == 'yes'){
                                        deletechannel(message, data.text)
                                        data.text = undefined
                                        data.save().catch(err => console.log(err))
                                        let deleted2 = new MessageEmbed()
                                            .setTitle(`:white_check_mark: Deleted!`)
                                            .setDescription(`Deleted **Text Counter Channel** SuccessFully!`)
                                            .setColor('#62FC1A')
                                        await message.channel.send(deleted2)
                                        return;
                                        
                                    } else if(collected.array()[0].content == 'no'){
                                        return message.channel.send(no)
                                    }
                                }
                            })
                            break
                            case 'voice':
                                if(!data.voice || data.voice === undefined){
                                    let already = new MessageEmbed()
                                    .setColor('RED')
                                    .setDescription(`Voice Counter Has Been Already Deleted! or Not Yet Created`)
                                    return message.channel.send(already)
                                }
                                let embed6 = new MessageEmbed()
                                    .setTitle(`:warning: Warning Alert! :warning:`)
                                    .setColor('GOLD')
                                    .setDescription(`<a:LIVE:805007031823892480> Do you really want to delete the counter voice? \`yes\` or \`no\``)
                                message.channel.send(embed6)
                    
                            collector.on('collect', async (m) => {
                                if(m.content == 'cancel'){
                                    collector.stop()
                                    await message.channel.send(no)
                                }
                            });
                    
                            collector.on('end', async (collected, reason) => {
                                if (reason === 'time') {
                                    return message.channel.send(timeup);
                                } else if(!collected.array()[0].content){
                                    return;
                                } else if (collected.array()[0].content){
                                    if(collected.array()[0].content == 'yes'){
                                        deletechannel(message, data.all)
                                        data.voice = undefined
                                        data.save().catch(err => console.log(err))
                                        let deleted2 = new MessageEmbed()
                                            .setTitle(`:white_check_mark: Deleted!`)
                                            .setDescription(`Deleted **Voice Counter Channel** SuccessFully!`)
                                            .setColor('#62FC1A')
                                        await message.channel.send(deleted2)
                                        return;
                                        
                                    } else if(collected.array()[0].content == 'no'){
                                        return message.channel.send(no)
                                    }
                                }
                            })
                            break
                            case 'categories':
                                if(!data.categories || data.categories === undefined){
                                    let already = new MessageEmbed()
                                    .setColor('RED')
                                    .setDescription(`Categories Counter Has Been Already Deleted! or Not Yet Created`)
                                    return message.channel.send(already)
                                }
                                let embed7 = new MessageEmbed()
                                    .setTitle(`:warning: Warning Alert! :warning:`)
                                    .setColor('GOLD')
                                    .setDescription(`<a:LIVE:805007031823892480> Do you really want to delete the counter categories? \`yes\` or \`no\``)
                                message.channel.send(embed7)

                    
                            collector.on('collect', async (m) => {
                                if(m.content == 'cancel'){
                                    collector.stop()
                                    await message.channel.send(no)
                                }
                            });
                    
                            collector.on('end', async (collected, reason) => {
                                if (reason === 'time') {
                                    return message.channel.send(timeup);
                                } else if(!collected.array()[0].content){
                                    return;
                                } else if (collected.array()[0].content){
                                    if(collected.array()[0].content == 'yes'){
                                        deletechannel(message, data.categories)
                                        data.categories = undefined
                                        data.save().catch(err => console.log(err))
                                        let deleted2 = new MessageEmbed()
                                            .setTitle(`:white_check_mark: Deleted!`)
                                            .setDescription(`Deleted **Categories Counter Channel** SuccessFully!`)
                                            .setColor('#62FC1A')
                                        await message.channel.send(deleted2)
                                        return;
                                        
                                    } else if(collected.array()[0].content == 'no'){
                                        return message.channel.send(no)
                                    }
                                }
                            })
                            break
                            case 'announcement':
                                if(!data.announcement || data.announcement === undefined){
                                    let already = new MessageEmbed()
                                    .setColor('RED')
                                    .setDescription(`Announcement Counter Has Been Already Deleted! or Not Yet Created`)
                                    return message.channel.send(already)
                                }
                                let embed8 = new MessageEmbed()
                                .setTitle(`:warning: Warning Alert! :warning:`)
                                .setColor('GOLD')
                                .setDescription(`<a:LIVE:805007031823892480> Do you really want to delete the counter announcement? \`yes\` or \`no\``)
                            message.channel.send(embed8)
                    
                            collector.on('collect', async (m) => {
                                if(m.content == 'cancel'){
                                    collector.stop()
                                    await message.channel.send(no)
                                }
                            });
                    
                            collector.on('end', async (collected, reason) => {
                                if (reason === 'time') {
                                    return message.channel.send(timeup);
                                } else if(!collected.array()[0].content){
                                    return;
                                } else if (collected.array()[0].content){
                                    if(collected.array()[0].content == 'yes'){
                                        deletechannel(message, data.categories)
                                        data.categories = undefined
                                        data.save().catch(err => console.log(err))
                                        let deleted2 = new MessageEmbed()
                                            .setTitle(`:white_check_mark: Deleted!`)
                                            .setDescription(`Deleted **Announcements Counter Channel** SuccessFully!`)
                                            .setColor('#62FC1A')
                                        await message.channel.send(deleted2)
                                        return;
                                        
                                    } else if(collected.array()[0].content == 'no'){
                                        return message.channel.send(no)
                                    }
                                }
                            })
                            break
                            case 'roles':
                                if(!data.roles || data.roles === undefined){
                                    let already = new MessageEmbed()
                                    .setColor('RED')
                                    .setDescription(`Roles Counter Has Been Already Deleted! or Not Yet Created`)
                                    return message.channel.send(already)
                                }
                                let embed9 = new MessageEmbed()
                                .setTitle(`:warning: Warning Alert! :warning:`)
                                .setColor('GOLD')
                                .setDescription(`<a:LIVE:805007031823892480> Do you really want to delete the counter roles? \`yes\` or \`no\``)
                            message.channel.send(embed9)
                    
                            collector.on('collect', async (m) => {
                                if(m.content == 'cancel'){
                                    collector.stop()
                                    await message.channel.send(no)
                                }
                            });
                    
                            collector.on('end', async (collected, reason) => {
                                if (reason === 'time') {
                                    return message.channel.send(timeup);
                                } else if(!collected.array()[0].content){
                                    return;
                                } else if (collected.array()[0].content){
                                    if(collected.array()[0].content == 'yes'){
                                        deletechannel(message, data.roles)
                                        data.roles = undefined
                                        data.save().catch(err => console.log(err))
                                        let deleted2 = new MessageEmbed()
                                            .setTitle(`:white_check_mark: Deleted!`)
                                            .setDescription(`Deleted **Roles Counter Channel** SuccessFully!`)
                                            .setColor('#62FC1A')
                                        await message.channel.send(deleted2)
                                        return;
                                        
                                    } else if(collected.array()[0].content == 'no'){
                                        return message.channel.send(no)
                                    }
                                }
                            })
                            break
                            case 'role':
                                if(!data.role || data.role === undefined){
                                    let already = new MessageEmbed()
                                    .setColor('RED')
                                    .setDescription(`Role Counter Has Been Already Deleted! or Not Yet Created`)
                                    return message.channel.send(already)
                                }
                                let embed10 = new MessageEmbed()
                                .setTitle(`:warning: Warning Alert! :warning:`)
                                .setColor('GOLD')
                                .setDescription(`<a:LIVE:805007031823892480> Do you really want to delete the counter role? \`yes\` or \`no\``)
                            message.channel.send(embed10)
                    
                            collector.on('collect', async (m) => {
                                if(m.content == 'cancel'){
                                    collector.stop()
                                    await message.channel.send(no)
                                }
                            });
                    
                            collector.on('end', async (collected, reason) => {
                                if (reason === 'time') {
                                    return message.channel.send(`:x: **Stat Counter Delete** Cancelled Because you didn't respond in time.`);
                                } else if(!collected.array()[0].content){
                                    return;
                                } else if (collected.array()[0].content){
                                    if(collected.array()[0].content == 'yes'){
                                        deletechannel(message, data.role)
                                        data.role = undefined
                                        data.roleid = undefined
                                        data.save().catch(err => console.log(err))
                                        let deleted2 = new MessageEmbed()
                                            .setTitle(`:white_check_mark: Deleted!`)
                                            .setDescription(`Deleted **Solo Role Counter Channel** SuccessFully!`)
                                            .setColor('#62FC1A')
                                        await message.channel.send(deleted2)
                                        
                                    } else if(collected.array()[0].content == 'no'){
                                        return message.channel.send(no)
                                    }
                                }
                            })
                            break
                            case 'emojis':
                                if(!data.emojis || data.emojis === undefined){
                                    let already = new MessageEmbed()
                                    .setColor('RED')
                                    .setDescription(`Emojis Counter Has Been Already Deleted! or Not Yet Created`)
                                    return message.channel.send(already)
                                }
                                let embed11 = new MessageEmbed()
                                .setTitle(`:warning: Warning Alert! :warning:`)
                                .setColor('GOLD')
                                .setDescription(`<a:LIVE:805007031823892480> Do you really want to delete the counter emojis? \`yes\` or \`no\``)
                            message.channel.send(embed11)
                    
                            collector.on('collect', async (m) => {
                                if(m.content == 'cancel'){
                                    collector.stop()
                                    await message.channel.send(no)
                                }
                            });
                    
                            collector.on('end', async (collected, reason) => {
                                if (reason === 'time') {
                                    return message.channel.send(timeup);
                                } else if(!collected.array()[0].content){
                                    return;
                                } else if (collected.array()[0].content){
                                    if(collected.array()[0].content == 'yes'){
                                        deletechannel(message, data.emojis)
                                        data.emojis = undefined
                                        data.save().catch(err => console.log(err))
                                        let deleted2 = new MessageEmbed()
                                            .setTitle(`:white_check_mark: Deleted!`)
                                            .setDescription(`Deleted **Emojis Counter Channel** SuccessFully!`)
                                            .setColor('#62FC1A')
                                        await message.channel.send(deleted2)
                                        
                                    } else if(collected.array()[0].content == 'no'){
                                        return message.channel.send(no)
                                    }
                                }
                            })
                            break
                            case 'static':
                                if(!data.static || data.static === undefined){
                                    let already = new MessageEmbed()
                                    .setColor('RED')
                                    .setDescription(`Static Emojis Counter Has Been Already Deleted! or Not Yet Created`)
                                    return message.channel.send(already)
                                }
                                let embed12 = new MessageEmbed()
                                .setTitle(`:warning: Warning Alert! :warning:`)
                                .setColor('GOLD')
                                .setDescription(`<a:LIVE:805007031823892480> Do you really want to delete the counter static? \`yes\` or \`no\``)
                            message.channel.send(embed12)
                    
                            collector.on('collect', async (m) => {
                                if(m.content == 'cancel'){
                                    collector.stop()
                                    await message.channel.send(no)
                                }
                            });
                    
                            collector.on('end', async (collected, reason) => {
                                if (reason === 'time') {
                                    return message.channel.send(timeup);
                                } else if(!collected.array()[0].content){
                                    return;
                                } else if (collected.array()[0].content){
                                    if(collected.array()[0].content == 'yes'){
                                        deletechannel(message, data.static)
                                        data.static = undefined
                                        data.save().catch(err => console.log(err))
                                        let deleted2 = new MessageEmbed()
                                            .setTitle(`:white_check_mark: Deleted!`)
                                            .setDescription(`Deleted **Static Emojis Counter Channel** SuccessFully!`)
                                            .setColor('#62FC1A')
                                        await message.channel.send(deleted2)
                                        
                                    } else if(collected.array()[0].content == 'no'){
                                        return message.channel.send(no)
                                    }
                                }
                            })
                            break
                            case 'animated':
                                if(!data.animated || data.animated === undefined){
                                    let already = new MessageEmbed()
                                    .setColor('RED')
                                    .setDescription(`Animated Emojis Counter Has Been Already Deleted! or Not Yet Created`)
                                    return message.channel.send(already)
                                }
                                let embed13 = new MessageEmbed()
                                .setTitle(`:warning: Warning Alert! :warning:`)
                                .setColor('GOLD')
                                .setDescription(`<a:LIVE:805007031823892480> Do you really want to delete the counter animated? \`yes\` or \`no\``)
                            message.channel.send(embed13)
                    
                            collector.on('collect', async (m) => {
                                if(m.content == 'cancel'){
                                    collector.stop()
                                    await message.channel.send(no)
                                }
                            });
                    
                            collector.on('end', async (collected, reason) => {
                                if (reason === 'time') {
                                    return message.channel.send(timeup);
                                } else if(!collected.array()[0].content){
                                    return;
                                } else if (collected.array()[0].content){
                                    if(collected.array()[0].content == 'yes'){
                                        deletechannel(message, data.animated)
                                        data.animated = undefined
                                        data.save().catch(err => console.log(err))
                                        let deleted2 = new MessageEmbed()
                                            .setTitle(`:white_check_mark: Deleted!`)
                                            .setDescription(`Deleted **Animated Emojis Counter Channel** SuccessFully!`)
                                            .setColor('#62FC1A')
                                        await message.channel.send(deleted2)
                                        
                                    } else if(collected.array()[0].content == 'no'){
                                        return message.channel.send(no)
                                    }
                                }
                            })
                            break
                            case 'boosts':
                                if(!data.boosts || data.boosts === undefined){
                                    let already = new MessageEmbed()
                                    .setColor('RED')
                                    .setDescription(`Boosts Counter Has Been Already Deleted! or Not Yet Created`)
                                    return message.channel.send(already)
                                }
                                let embed14 = new MessageEmbed()
                                .setTitle(`:warning: Warning Alert! :warning:`)
                                .setColor('GOLD')
                                .setDescription(`<a:LIVE:805007031823892480> Do you really want to delete the counter boosts? \`yes\` or \`no\``)
                            message.channel.send(embed14)
                    
                            collector.on('collect', async (m) => {
                                if(m.content == 'cancel'){
                                    collector.stop()
                                    await message.channel.send(no)
                                }
                            });
                    
                            collector.on('end', async (collected, reason) => {
                                if (reason === 'time') {
                                    return message.channel.send(timeup);
                                } else if(!collected.array()[0].content){
                                    return;
                                } else if (collected.array()[0].content){
                                    if(collected.array()[0].content == 'yes'){
                                        deletechannel(message, data.boosts)
                                        data.boosts = undefined
                                        data.save().catch(err => console.log(err))
                                        let deleted2 = new MessageEmbed()
                                            .setTitle(`:white_check_mark: Deleted!`)
                                            .setDescription(`Deleted **Boosts Counter Channel** SuccessFully!`)
                                            .setColor('#62FC1A')
                                        await message.channel.send(deleted2)
                                        
                                    } else if(collected.array()[0].content == 'no'){
                                        return message.channel.send(no)
                                    }
                                }
                            })
                            break
                            case 'tier':
                                if(!data.tier || data.tier === undefined){
                                    let already = new MessageEmbed()
                                    .setColor('RED')
                                    .setDescription(`Tier Counter Has Been Already Deleted! or Not Yet Created`)
                                    return message.channel.send(already)
                                }
                                let embed15 = new MessageEmbed()
                                .setTitle(`:warning: Warning Alert! :warning:`)
                                .setColor('GOLD')
                                .setDescription(`<a:LIVE:805007031823892480> Do you really want to delete the counter tier? \`yes\` or \`no\``)
                            message.channel.send(embed15)
                    
                            collector.on('collect', async (m) => {
                                if(m.content == 'cancel'){
                                    collector.stop()
                                    await message.channel.send(no)
                                }
                            });
                    
                            collector.on('end', async (collected, reason) => {
                                if (reason === 'time') {
                                    return message.channel.send(timeup);
                                } else if(!collected.array()[0].content){
                                    return;
                                } else if (collected.array()[0].content){
                                    if(collected.array()[0].content == 'yes'){
                                        deletechannel(message, data.tier)
                                        data.tier = undefined
                                        data.save().catch(err => console.log(err))
                                        let deleted2 = new MessageEmbed()
                                            .setTitle(`:white_check_mark: Deleted!`)
                                            .setDescription(`Deleted **Tier Counter Channel** SuccessFully!`)
                                            .setColor('#62FC1A')
                                        await message.channel.send(deleted2)
                                        
                                    } else if(collected.array()[0].content == 'no'){
                                        return message.channel.send(no)
                                    }
                                }
                            })
                            break
                        default:
                            let embed16 = new MessageEmbed()
                                .setTitle(`:warning: Warning Alert! :warning:`)
                                .setColor('GOLD')
                                .setDescription(`<a:LIVE:805007031823892480> Wrong Selection!\n\`all\`, \`members\`, \`bots\`, \`channels\`, \`text\`, \`voice\`, \`categories\`, \`announcement\`, \`roles\`, \`role\`, \`emojis\`, \`static\`, \`animated\`, \`boosts\`, \`tier\``)
                            return message.channel.send(embed16)
                    }
                }
                })
                let pictypeembed = new MessageEmbed()
                    .setTitle(`Pick Up One From Them!`)
                    .setDescription(`Which type of stat counter do you like to delete. \`all\`, \`members\`, \`bots\`, \`channels\`, \`text\`, \`voice\`, \`categories\`, \`announcement\`, \`roles\`, \`role\`, \`emojis\`, \`static\`, \`animated\`, \`boosts\`, \`tier\` or type cancel to cancel the command.`)
                    .setColor(`#2EC5F9`)
                message.channel.send(pictypeembed)
        } else if (data.setups == false){
            let doneembed = new MessageEmbed()
            .setTitle(`:warning: Warning Alert! :warning:`)
            .setDescription(`<a:LIVE:805007031823892480> Your Server Setup Is Not Yet Done!.\nDo You Want To set Stat Counters Use Command \`${data.Prefix}setup\``)
            .setColor(`GOLD`)
        return message.channel.send(doneembed)
        }
    } else if(text == 'create'){
        if(data.setups === true){
            let filter = (message) => !message.author.bot;
    
            let options = {
              max: 1,
              time: 15000
            };
            let collector = message.channel.createMessageCollector(filter, options);
    
            collector.on('collect', async (m) => {
                if(m.content == 'cancel'){
                    collector.stop()
                    await message.channel.send(no)
                }
            });
    
            collector.on('end', async (collected, reason) => {
                let timeup = new MessageEmbed()
                    .setTitle(`Process Status of **Stat Counter Create**!`)
                    .setDescription(`⏰ Process Has Been Canceled! Because You Didn't Respond in Time!.`)
                    .setColor('RED')
                let no = new MessageEmbed()
                    .setTitle(`Process Status of **Stat Counter Create**!`)
                    .setDescription(`:x: Process Has Been Canceled!`)
                    .setColor('RED')
                if (reason === 'time') {
                    return message.channel.send(timeup);
                } else if(!collected.array()[0].content){
                    return;
                } else if(collected.array()[0].content == 'all'){
                    if(data.all){
                        let already = new MessageEmbed()
                            .setTitle(`:warning: Warning Alert! :warning:`)
                            .setDescription(`<a:LIVE:805007031823892480> This Counter Is Already In Progress, If You Want To Off It Use Command \`${data.Prefix}counter delete all\``)
                            .setColor(`GOLD`)
                        return message.channel.send(already)
                    }
                    let filter = (message) => !message.author.bot;
                    let options = {
                    max: 1,
                    time: 15000
                    };
                    let collector = message.channel.createMessageCollector(filter, options);
    
                    collector.on('collect', async (m) => {
                        if(m.content == 'cancel'){
                            collector.stop()
                            await message.channel.send(no)
                            
                        }
                    });
    
                    collector.on('end', async (collected, reason) => {
                        if (reason === 'time') {
                            return message.channel.send(timeup);
                        } else if(!collected.array()[0].content){
                            return;
                        } else if (collected.array()[0].content){
                            if(collected.array()[0].content == 'voice'){
                                    await message.guild.channels.create(`All Members: ${message.guild.memberCount.toLocaleString()}`, {
                                        type: 'voice',
                                        permissionOverwrites: [
                                            {
                                                id: client.user.id,
                                                allow: ['VIEW_CHANNEL','CONNECT','MANAGE_CHANNELS'],
                                            },
                                            {
                                                id: message.author.id,
                                                deny : ['CONNECT']
                                            },
                                            {
                                                id: message.guild.roles.everyone,
                                                allow: ['VIEW_CHANNEL'],
                                                deny : ['CONNECT']
                                            },
                                            ],
                                    }).then(async(channel) => {
                                        await channel.setParent(data.category).catch(err => {
                                            if(err == 'DiscordAPIError: Invalid Form Body'){
                                            }
                                        })
                                        await channel.setPosition(0)
                                            .catch(console.error);
                                        data.all = channel.id
                                        await data.save().catch(err => console.log(err))
                                    })
                                    let created = new MessageEmbed()
                                        .setTitle(`Successfully Created!`)
                                        .setDescription(`Created **All Members** Counter set in Type of **Voice Channel!**`)
                                        .setColor(`#62FC1A`)
                                    await message.channel.send(created)
                                    return;
                            } else if (collected.array()[0].content == 'text'){
                                    await message.guild.channels.create(`All Members: ${message.guild.memberCount.toLocaleString()}`, {
                                        type: 'text',
                                        permissionOverwrites: [
                                            {
                                                id: client.user.id,
                                                allow: ['VIEW_CHANNEL','SEND_MESSAGES','MANAGE_CHANNELS'],
                                            },
                                            {
                                                id: message.author.id,
                                                deny : ['SEND_MESSAGES']
                                            },
                                            {
                                                id: message.guild.roles.everyone,
                                                allow: ['VIEW_CHANNEL'],
                                                deny : ['SEND_MESSAGES']
                                            },
                                            ],
                                    }).then(async(channel) => {
                                        await channel.setParent(data.category).catch(err => {
                                            if(err =='DiscordAPIError'){
                                            }
                                        })
                                        await channel.setPosition(0)
                                            .catch(console.error);
                                        data.all = channel.id
                                        await data.save().catch(err => console.log(err))
                                    })
                                    let created = new MessageEmbed()
                                        .setTitle(`Successfully Created!`)
                                        .setDescription(`Created **All Members** Counter set in Type of **Text Channel!**`)
                                        .setColor(`#62FC1A`)
                                    await message.channel.send(created)
                                    return;
                            } else {
                                let wrong = new MessageEmbed()
                                    .setTitle(`:warning: Warning Alert! :warning:`)
                                    .setDescription(`<a:LIVE:805007031823892480> You Typed Wrong word or it doesn't exits in my counters. **Please Try Again!** \`${data.Prefix}counter create\``)
                                    .setColor(`GOLD`)
                                return message.channel.send(wrong)
                            }
                        }
                    })
                    let pictypeembed = new MessageEmbed()
                        .setTitle(`Pick Up One From This!`)
                        .setDescription(`Which type of channel do you want to use as a Stat Counter - \`voice\`, \`text\` or type cancel to cancel the process!.`)
                        .setColor(`#2EC5F9`)
                    message.channel.send(pictypeembed)
                } else if(collected.array()[0].content == 'members'){
                    let timeup = new MessageEmbed()
                        .setTitle(`Process Status of **Stat Counter Create**!`)
                        .setDescription(`⏰ Process Has Been Canceled! Because You Didn't Respond in Time!.`)
                        .setColor('RED')
                    let no = new MessageEmbed()
                        .setTitle(`Process Status of **Stat Counter Create**!`)
                        .setDescription(`:x: Process Has Been Canceled!`)
                        .setColor('RED')
                    if(data.members){
                        let already = new MessageEmbed()
                            .setTitle(`:warning: Warning Alert! :warning:`)
                            .setDescription(`<a:LIVE:805007031823892480> This Counter Is Already In Progress, If You Want To Off It Use Command \`${data.Prefix}counter delete members\``)
                            .setColor(`GOLD`)
                        return message.channel.send(already)
                    }
                    let filter = (message) => !message.author.bot;
                    let options = {
                    max: 1,
                    time: 15000
                    };
                    let collector = message.channel.createMessageCollector(filter, options);
    
                    collector.on('collect', async (m) => {
                        if(m.content == 'cancel'){
                            collector.stop()
                            await message.channel.send(no)
                            
                        }
                    });
    
                    collector.on('end', async (collected, reason) => {
                        if (reason === 'time') {
                            return message.channel.send(timeup);
                        } else if(!collected.array()[0].content){
                            return;
                        } else if (collected.array()[0].content){
                            if(collected.array()[0].content == 'voice'){
                                    await message.guild.channels.create(`Members: ${message.guild.members.cache.filter(member => !member.user.bot).size.toLocaleString()}`, {
                                        type: 'voice',
                                        permissionOverwrites: [
                                            {
                                                id: client.user.id,
                                                allow: ['VIEW_CHANNEL','CONNECT','MANAGE_CHANNELS'],
                                            },
                                            {
                                                id: message.author.id,
                                                deny : ['CONNECT']
                                            },
                                            {
                                                id: message.guild.roles.everyone,
                                                allow: ['VIEW_CHANNEL'],
                                                deny : ['CONNECT']
                                            },
                                            ],
                                    }).then(async(channel) => {
                                        await channel.setParent(data.category).catch(err => {
                                            if(err == 'DiscordAPIError: Invalid Form Body'){
                                            }
                                        })
                                        await channel.setPosition(1)
                                            .catch(console.error);
                                        data.members = channel.id
                                        await data.save().catch(err => console.log(err))
                                    })
                                    let created = new MessageEmbed()
                                        .setTitle(`Successfully Created!`)
                                        .setDescription(`Created **Members** Counter set in Type of **Voice Channel!**`)
                                        .setColor(`#62FC1A`)
                                    await message.channel.send(created)
                                    return;
                            } else if (collected.array()[0].content == 'text'){
                                    await message.guild.channels.create(`Members: ${message.guild.members.cache.filter(member => !member.user.bot).size.toLocaleString()}`, {
                                        type: 'text',
                                        permissionOverwrites: [
                                            {
                                                id: client.user.id,
                                                allow: ['VIEW_CHANNEL','SEND_MESSAGES','MANAGE_CHANNELS'],
                                            },
                                            {
                                                id: message.author.id,
                                                deny : ['SEND_MESSAGES']
                                            },
                                            {
                                                id: message.guild.roles.everyone,
                                                allow: ['VIEW_CHANNEL'],
                                                deny : ['SEND_MESSAGES']
                                            },
                                            ],
                                    }).then(async(channel) => {
                                        await channel.setParent(data.category).catch(err => {
                                            if(err =='DiscordAPIError'){
                                            }
                                        })
                                        await channel.setPosition(1)
                                            .catch(console.error);
                                        data.members = channel.id
                                        await data.save().catch(err => console.log(err))
                                    })
                                    let created = new MessageEmbed()
                                        .setTitle(`Successfully Created!`)
                                        .setDescription(`Created **Members** Counter set in Type of **Text Channel!**`)
                                        .setColor(`#62FC1A`)
                                    await message.channel.send(created)
                                    return;
                            } else {
                                let wrong = new MessageEmbed()
                                    .setTitle(`:warning: Warning Alert! :warning:`)
                                    .setDescription(`<a:LIVE:805007031823892480> You Typed Wrong word or it doesn't exits in my counters. **Please Try Again!** \`${data.Prefix}counter create\``)
                                    .setColor(`GOLD`)
                                return message.channel.send(wrong)
                            }
                        }
                    })
                    let pictypeembed = new MessageEmbed()
                        .setTitle(`Pick Up One From This!`)
                        .setDescription(`Which type of channel do you want to use as a Stat Counter - \`voice\`, \`text\` or type cancel to cancel the process!.`)
                        .setColor(`#2EC5F9`)
                    message.channel.send(pictypeembed)
                } else if(collected.array()[0].content == 'bots'){
                    let pictypeembed = new MessageEmbed()
                        .setTitle(`Pick Up One From This!`)
                        .setDescription(`Which type of channel do you want to use as a Stat Counter - \`voice\`, \`text\` or type cancel to cancel the process!.`)
                        .setColor(`#2EC5F9`)
                    let timeup = new MessageEmbed()
                        .setTitle(`Process Status of **Stat Counter Create**!`)
                        .setDescription(`⏰ Process Has Been Canceled! Because You Didn't Respond in Time!.`)
                        .setColor('RED')
                    let no = new MessageEmbed()
                        .setTitle(`Process Status of **Stat Counter Create**!`)
                        .setDescription(`:x: Process Has Been Canceled!`)
                        .setColor('RED')
                    let wrong = new MessageEmbed()
                        .setTitle(`:warning: Warning Alert! :warning:`)
                        .setDescription(`<a:LIVE:805007031823892480> You Typed Wrong word or it doesn't exits in my counters. **Please Try Again!** \`${data.Prefix}counter create\``)
                        .setColor(`GOLD`)
                    if(data.bots){
                        let already = new MessageEmbed()
                            .setTitle(`:warning: Warning Alert! :warning:`)
                            .setDescription(`<a:LIVE:805007031823892480> This Counter Is Already In Progress, If You Want To Off It Use Command \`${data.Prefix}counter delete bots\``)
                            .setColor(`GOLD`)
                        return message.channel.send(already)
                    }
                    let filter = (message) => !message.author.bot;
                    let options = {
                    max: 1,
                    time: 15000
                    };
                    let collector = message.channel.createMessageCollector(filter, options);
    
                    collector.on('collect', async (m) => {
                        if(m.content == 'cancel'){
                            collector.stop()
                            await message.channel.send(no)
                            
                        }
                    });
    
                    collector.on('end', async (collected, reason) => {
                        if (reason === 'time') {
                            return message.channel.send(timeup);
                        } else if(!collected.array()[0].content){
                            return;
                        } else if (collected.array()[0].content){
                            if(collected.array()[0].content == 'voice'){
                                    await message.guild.channels.create(`Bots: ${message.guild.members.cache.filter(member => member.user.bot).size.toLocaleString()}`, {
                                        type: 'voice',
                                        permissionOverwrites: [
                                            {
                                                id: client.user.id,
                                                allow: ['VIEW_CHANNEL','CONNECT','MANAGE_CHANNELS'],
                                            },
                                            {
                                                id: message.author.id,
                                                deny : ['CONNECT']
                                            },
                                            {
                                                id: message.guild.roles.everyone,
                                                allow: ['VIEW_CHANNEL'],
                                                deny : ['CONNECT']
                                            },
                                            ],
                                    }).then(async(channel) => {
                                        await channel.setParent(data.category).catch(err => {
                                            if(err == 'DiscordAPIError: Invalid Form Body'){
                                            }
                                        })
                                        await channel.setPosition(2)
                                            .catch(console.error);
                                        data.bots = channel.id
                                        await data.save().catch(err => console.log(err))
                                    })
                                    let created = new MessageEmbed()
                                        .setTitle(`Successfully Created!`)
                                        .setDescription(`Created **Bots** Counter set in Type of **Voice Channel!**`)
                                        .setColor(`#62FC1A`)
                                    await message.channel.send(created)
                                    return
                            } else if (collected.array()[0].content == 'text'){
                                    await message.guild.channels.create(`Bots: ${message.guild.members.cache.filter(member => member.user.bot).size.toLocaleString()}`, {
                                        type: 'text',
                                        permissionOverwrites: [
                                            {
                                                id: client.user.id,
                                                allow: ['VIEW_CHANNEL','SEND_MESSAGES','MANAGE_CHANNELS'],
                                            },
                                            {
                                                id: message.author.id,
                                                deny : ['SEND_MESSAGES']
                                            },
                                            {
                                                id: message.guild.roles.everyone,
                                                allow: ['VIEW_CHANNEL'],
                                                deny : ['SEND_MESSAGES']
                                            },
                                            ],
                                    }).then(async(channel) => {
                                        await channel.setParent(data.category).catch(err => {
                                            if(err =='DiscordAPIError'){
                                            }
                                        })
                                        await channel.setPosition(2)
                                            .catch(console.error);
                                        data.bots = channel.id
                                        await data.save().catch(err => console.log(err))
                                    })
                                    let created = new MessageEmbed()
                                        .setTitle(`Successfully Created!`)
                                        .setDescription(`Created **Bots** Counter set in Type of **Text Channel!**`)
                                        .setColor(`#62FC1A`)
                                    await message.channel.send(created)
                                    return
                            } else {
                                return message.channel.send(wrong)
                            }
                        }
                    })
                    message.channel.send(pictypeembed)
                } else if(collected.array()[0].content == 'channels'){
                    let pictypeembed = new MessageEmbed()
                        .setTitle(`Pick Up One From This!`)
                        .setDescription(`Which type of channel do you want to use as a Stat Counter - \`voice\`, \`text\` or type cancel to cancel the process!.`)
                        .setColor(`#2EC5F9`)
                    let timeup = new MessageEmbed()
                        .setTitle(`Process Status of **Stat Counter Create**!`)
                        .setDescription(`⏰ Process Has Been Canceled! Because You Didn't Respond in Time!.`)
                        .setColor('RED')
                    let no = new MessageEmbed()
                        .setTitle(`Process Status of **Stat Counter Create**!`)
                        .setDescription(`:x: Process Has Been Canceled!`)
                        .setColor('RED')
                    let wrong = new MessageEmbed()
                        .setTitle(`:warning: Warning Alert! :warning:`)
                        .setDescription(`<a:LIVE:805007031823892480> You Typed Wrong word or it doesn't exits in my counters. **Please Try Again!** \`${data.Prefix}counter create\``)
                        .setColor(`GOLD`)
                    if(data.channels){
                        let already = new MessageEmbed()
                            .setTitle(`:warning: Warning Alert! :warning:`)
                            .setDescription(`<a:LIVE:805007031823892480> This Counter Is Already In Progress, If You Want To Off It Use Command \`${data.Prefix}counter delete channels\``)
                            .setColor(`GOLD`)
                        return message.channel.send(already)
                    }
                    let filter = (message) => !message.author.bot;
                    let options = {
                    max: 1,
                    time: 15000
                    };
                    let collector = message.channel.createMessageCollector(filter, options);
    
                    collector.on('collect', async (m) => {
                        if(m.content == 'cancel'){
                            collector.stop()
                            await message.channel.send(no)
                            
                        }
                    });
    
                    collector.on('end', async (collected, reason) => {
                        if (reason === 'time') {
                            return message.channel.send(timeup);
                        } else if(!collected.array()[0].content){
                            return;
                        } else if (collected.array()[0].content){
                            if(collected.array()[0].content == 'voice'){
                                    await message.guild.channels.create(`Channels: ${message.guild.channels.cache.size.toLocaleString()}`, {
                                        type: 'voice',
                                        permissionOverwrites: [
                                            {
                                                id: client.user.id,
                                                allow: ['VIEW_CHANNEL','CONNECT','MANAGE_CHANNELS'],
                                            },
                                            {
                                                id: message.author.id,
                                                deny : ['CONNECT']
                                            },
                                            {
                                                id: message.guild.roles.everyone,
                                                allow: ['VIEW_CHANNEL'],
                                                deny : ['CONNECT']
                                            },
                                            ],
                                    }).then(async(channel) => {
                                        await channel.setParent(data.category).catch(err => {
                                            if(err == 'DiscordAPIError: Invalid Form Body'){
                                            }
                                        })
                                        await channel.setPosition(3)
                                            .catch(console.error);
                                        data.channels = channel.id
                                        await data.save().catch(err => console.log(err))
                                    })
                                    let created = new MessageEmbed()
                                        .setTitle(`Successfully Created!`)
                                        .setDescription(`Created **Channels** Counter set in Type of **Voice Channel!**`)
                                        .setColor(`#62FC1A`)
                                    await message.channel.send(created)
                                    return
                            } else if (collected.array()[0].content == 'text'){
                                    await message.guild.channels.create(`Channels: ${message.guild.channels.cache.size.toLocaleString()}`, {
                                        type: 'text',
                                        permissionOverwrites: [
                                            {
                                                id: client.user.id,
                                                allow: ['VIEW_CHANNEL','SEND_MESSAGES','MANAGE_CHANNELS'],
                                            },
                                            {
                                                id: message.author.id,
                                                deny : ['SEND_MESSAGES']
                                            },
                                            {
                                                id: message.guild.roles.everyone,
                                                allow: ['VIEW_CHANNEL'],
                                                deny : ['SEND_MESSAGES']
                                            },
                                            ],
                                    }).then(async(channel) => {
                                        await channel.setParent(data.category).catch(err => {
                                            if(err =='DiscordAPIError'){
                                            }
                                        })
                                        await channel.setPosition(3)
                                            .catch(console.error);
                                        data.channels = channel.id
                                        await data.save().catch(err => console.log(err))
                                    })
                                    let created = new MessageEmbed()
                                        .setTitle(`Successfully Created!`)
                                        .setDescription(`Created **Channels** Counter set in Type of **Text Channel!**`)
                                        .setColor(`#62FC1A`)
                                    await message.channel.send(created)
                                    return
                            } else {
                                return message.channel.send(wrong)
                            }
                        }
                    })
                    message.channel.send(pictypeembed)
                } else if(collected.array()[0].content == 'text'){
                    let pictypeembed = new MessageEmbed()
                        .setTitle(`Pick Up One From This!`)
                        .setDescription(`Which type of channel do you want to use as a Stat Counter - \`voice\`, \`text\` or type cancel to cancel the process!.`)
                        .setColor(`#2EC5F9`)
                    let timeup = new MessageEmbed()
                        .setTitle(`Process Status of **Stat Counter Create**!`)
                        .setDescription(`⏰ Process Has Been Canceled! Because You Didn't Respond in Time!.`)
                        .setColor('RED')
                    let no = new MessageEmbed()
                        .setTitle(`Process Status of **Stat Counter Create**!`)
                        .setDescription(`:x: Process Has Been Canceled!`)
                        .setColor('RED')
                    let wrong = new MessageEmbed()
                        .setTitle(`:warning: Warning Alert! :warning:`)
                        .setDescription(`<a:LIVE:805007031823892480> You Typed Wrong word or it doesn't exits in my counters. **Please Try Again!** \`${data.Prefix}counter create\``)
                        .setColor(`GOLD`)
                    if(data.text){
                        let already = new MessageEmbed()
                            .setTitle(`:warning: Warning Alert! :warning:`)
                            .setDescription(`<a:LIVE:805007031823892480> This Counter Is Already In Progress, If You Want To Off It Use Command \`${data.Prefix}counter delete text\``)
                            .setColor(`GOLD`)
                        return message.channel.send(already)
                    }
                    let filter = (message) => !message.author.bot;
                    let options = {
                    max: 1,
                    time: 15000
                    };
                    let collector = message.channel.createMessageCollector(filter, options);
    
                    collector.on('collect', async (m) => {
                        if(m.content == 'cancel'){
                            collector.stop()
                            await message.channel.send(no)
                            
                        }
                    });
    
                    collector.on('end', async (collected, reason) => {
                        if (reason === 'time') {
                            return message.channel.send(timeup);
                        } else if(!collected.array()[0].content){
                            return;
                        } else if (collected.array()[0].content){
                            if(collected.array()[0].content == 'voice'){
                                    await message.guild.channels.create(`Text Channels: ${message.guild.channels.cache.filter(r => r.type === "text").size.toLocaleString()}`, {
                                        type: 'voice',
                                        permissionOverwrites: [
                                            {
                                                id: client.user.id,
                                                allow: ['MANAGE_CHANNELS','CONNECT','VIEW_CHANNEL'],
                                            },
                                            {
                                                id: message.author.id,
                                                deny : ['CONNECT']
                                            },
                                            {
                                                id: message.guild.roles.everyone,
                                                allow: ['VIEW_CHANNEL'],
                                                deny : ['CONNECT']
                                            },
                                            ],
                                    }).then(async(channel) => {
                                        await channel.setParent(data.category).catch(err => {
                                            if(err == 'DiscordAPIError: Invalid Form Body'){
                                            }
                                        })
                                        await channel.setPosition(4)
                                            .catch(console.error);
                                        data.text = channel.id
                                        await data.save().catch(err => console.log(err))
                                    })
                                    let created = new MessageEmbed()
                                        .setTitle(`Successfully Created!`)
                                        .setDescription(`Created **Text** Counter set in Type of **Voice Channel!**`)
                                        .setColor(`#62FC1A`)
                                    await message.channel.send(created)
                                    return
                            } else if (collected.array()[0].content == 'text'){
                                    await message.guild.channels.create(`Text Channels: ${message.guild.channels.cache.filter(r => r.type === "text").size.toLocaleString()}`, {
                                        type: 'text',
                                        permissionOverwrites: [
                                            {
                                                id: client.user.id,
                                                allow: ['VIEW_CHANNEL','SEND_MESSAGES','MANAGE_CHANNELS'],
                                            },
                                            {
                                                id: message.author.id,
                                                deny : ['SEND_MESSAGES']
                                            },
                                            {
                                                id: message.guild.roles.everyone,
                                                allow: ['VIEW_CHANNEL'],
                                                deny : ['SEND_MESSAGES']
                                            },
                                            ],
                                    }).then(async(channel) => {
                                        await channel.setParent(data.category).catch(err => {
                                            if(err =='DiscordAPIError'){
                                            }
                                        })
                                        await channel.setPosition(4)
                                            .catch(console.error);
                                        data.text = channel.id
                                        await data.save().catch(err => console.log(err))
                                    })
                                    let created = new MessageEmbed()
                                        .setTitle(`Successfully Created!`)
                                        .setDescription(`Created **Text** Counter set in Type of **Text Channel!**`)
                                        .setColor(`#62FC1A`)
                                    await message.channel.send(created)
                                    return
                            } else {
                                message.channel.send(wrong)
                            }
                        }
                    })
                    message.channel.send(pictypeembed)
                } else if(collected.array()[0].content == 'voice'){
                    let timeup = new MessageEmbed()
                        .setTitle(`Process Status of **Stat Counter Create**!`)
                        .setDescription(`⏰ Process Has Been Canceled! Because You Didn't Respond in Time!.`)
                        .setColor('RED')
                    let no = new MessageEmbed()
                        .setTitle(`Process Status of **Stat Counter Create**!`)
                        .setDescription(`:x: Process Has Been Canceled!`)
                        .setColor('RED')
                    let wrong = new MessageEmbed()
                        .setTitle(`:warning: Warning Alert! :warning:`)
                        .setDescription(`<a:LIVE:805007031823892480> You Typed Wrong word or it doesn't exits in my counters. **Please Try Again!** \`${data.Prefix}counter create\``)
                        .setColor(`GOLD`)
                    let pictypeembed = new MessageEmbed()
                        .setTitle(`Pick Up One From This!`)
                        .setDescription(`Which type of channel do you want to use as a Stat Counter - \`voice\`, \`text\` or type cancel to cancel the process!.`)
                        .setColor(`#2EC5F9`)
                    if(data.voice){
                        let already = new MessageEmbed()
                            .setTitle(`:warning: Warning Alert! :warning:`)
                            .setDescription(`<a:LIVE:805007031823892480> This Counter Is Already In Progress, If You Want To Off It Use Command \`${data.Prefix}counter delete voice\``)
                            .setColor(`GOLD`)
                        return message.channel.send(already)
                    }
                    let filter = (message) => !message.author.bot;
                    let options = {
                    max: 1,
                    time: 15000
                    };
                    let collector = message.channel.createMessageCollector(filter, options);
    
                    collector.on('collect', async (m) => {
                        if(m.content == 'cancel'){
                            collector.stop()
                            await message.channel.send(no)
                            
                        }
                    });
    
                    collector.on('end', async (collected, reason) => {
                        if (reason === 'time') {
                            return message.channel.send(timeup);
                        } else if(!collected.array()[0].content){
                            return;
                        } else if (collected.array()[0].content){
                            if(collected.array()[0].content == 'voice'){
                                    await message.guild.channels.create(`Voice Channels: ${message.guild.channels.cache.filter(r => r.type === "voice").size.toLocaleString()}`, {
                                        type: 'voice',
                                        permissionOverwrites: [
                                            {
                                                id: client.user.id,
                                                allow: ['VIEW_CHANNEL','CONNECT','MANAGE_CHANNELS'],
                                            },
                                            {
                                                id: message.author.id,
                                                deny : ['CONNECT']
                                            },
                                            {
                                                id: message.guild.roles.everyone,
                                                allow: ['VIEW_CHANNEL'],
                                                deny : ['CONNECT']
                                            },
                                            ],
                                    }).then(async(channel) => {
                                        await channel.setParent(data.category).catch(err => {
                                            if(err == 'DiscordAPIError: Invalid Form Body'){
                                            }
                                        })
                                        await channel.setPosition(5)
                                            .catch(console.error);
                                        data.voice = channel.id
                                        await data.save().catch(err => console.log(err))
                                    })
                                    let created = new MessageEmbed()
                                        .setTitle(`Successfully Created!`)
                                        .setDescription(`Created **Voice** Counter set in Type of **Voice Channel!**`)
                                        .setColor(`#62FC1A`)
                                    await message.channel.send(created)
                                    return
                            } else if (collected.array()[0].content == 'text'){
                                    await message.guild.channels.create(`Voice Channels: ${message.guild.channels.cache.filter(r => r.type === "text").size.toLocaleString()}`, {
                                        type: 'text',
                                        permissionOverwrites: [
                                            {
                                                id: client.user.id,
                                                allow: ['VIEW_CHANNEL','SEND_MESSAGES','MANAGE_CHANNELS'],
                                            },
                                            {
                                                id: message.author.id,
                                                deny : ['SEND_MESSAGES']
                                            },
                                            {
                                                id: message.guild.roles.everyone,
                                                allow: ['VIEW_CHANNEL'],
                                                deny : ['SEND_MESSAGES']
                                            },
                                            ],
                                    }).then(async(channel) => {
                                        await channel.setParent(data.category).catch(err => {
                                            if(err =='DiscordAPIError'){
                                            }
                                        })
                                        await channel.setPosition(5)
                                            .catch(console.error);
                                        data.voice = channel.id
                                        await data.save().catch(err => console.log(err))
                                    })
                                    let created = new MessageEmbed()
                                        .setTitle(`Successfully Created!`)
                                        .setDescription(`Created **Voice** Counter set in Type of **Text Channel!**`)
                                        .setColor(`#62FC1A`)
                                    await message.channel.send(created)
                                    return
                            } else {
                                message.channel.send(wrong)
                            }
                        }
                    })
                    message.channel.send(pictypeembed)
                } else if(collected.array()[0].content == 'categories'){
                    let pictypeembed = new MessageEmbed()
                        .setTitle(`Pick Up One From This!`)
                        .setDescription(`Which type of channel do you want to use as a Stat Counter - \`voice\`, \`text\` or type cancel to cancel the process!.`)
                        .setColor(`#2EC5F9`)
                    let timeup = new MessageEmbed()
                        .setTitle(`Process Status of **Stat Counter Create**!`)
                        .setDescription(`⏰ Process Has Been Canceled! Because You Didn't Respond in Time!.`)
                        .setColor('RED')
                    let no = new MessageEmbed()
                        .setTitle(`Process Status of **Stat Counter Create**!`)
                        .setDescription(`:x: Process Has Been Canceled!`)
                        .setColor('RED')
                    let wrong = new MessageEmbed()
                        .setTitle(`:warning: Warning Alert! :warning:`)
                        .setDescription(`<a:LIVE:805007031823892480> You Typed Wrong word or it doesn't exits in my counters. **Please Try Again!** \`${data.Prefix}counter create\``)
                        .setColor(`GOLD`)
                    if(data.categories){
                        let already = new MessageEmbed()
                            .setTitle(`:warning: Warning Alert! :warning:`)
                            .setDescription(`<a:LIVE:805007031823892480> This Counter Is Already In Progress, If You Want To Off It Use Command \`${data.Prefix}counter delete categories\``)
                            .setColor(`GOLD`)
                        return message.channel.send(already)
                    }
                    let filter = (message) => !message.author.bot;
                    let options = {
                    max: 1,
                    time: 15000
                    };
                    let collector = message.channel.createMessageCollector(filter, options);
    
                    collector.on('collect', async (m) => {
                        if(m.content == 'cancel'){
                            collector.stop()
                            await message.channel.send(no)
                            
                        }
                    });
    
                    collector.on('end', async (collected, reason) => {
                        if (reason === 'time') {
                            return message.channel.send(timeup);
                        } else if(!collected.array()[0].content){
                            return;
                        } else if (collected.array()[0].content){
                            if(collected.array()[0].content == 'voice'){
                                    await message.guild.channels.create(`Total Categories: ${message.guild.channels.cache.filter(r => r.type === "category").size.toLocaleString()}`, {
                                        type: 'voice',
                                        permissionOverwrites: [
                                            {
                                                id: client.user.id,
                                                allow: ['VIEW_CHANNEL','CONNECT','MANAGE_CHANNELS'],
                                            },
                                            {
                                                id: message.author.id,
                                                deny : ['CONNECT']
                                            },
                                            {
                                                id: message.guild.roles.everyone,
                                                allow: ['VIEW_CHANNEL'],
                                                deny : ['CONNECT']
                                            },
                                            ],
                                    }).then(async(channel) => {
                                        await channel.setParent(data.category).catch(err => {
                                            if(err == 'DiscordAPIError: Invalid Form Body'){
                                            }
                                        })
                                        await channel.setPosition(6)
                                            .catch(console.error);
                                        data.categories = channel.id
                                        await data.save().catch(err => console.log(err))
                                    })
                                    let created = new MessageEmbed()
                                        .setTitle(`Successfully Created!`)
                                        .setDescription(`Created **Categories** Counter set in Type of **Voice Channel!**`)
                                        .setColor(`#62FC1A`)
                                    await message.channel.send(created)
                                    return
                            } else if (collected.array()[0].content == 'text'){
                                    await message.guild.channels.create(`Total Categories: ${message.guild.channels.cache.filter(r => r.type === "category").size.toLocaleString()}`, {
                                        type: 'text',
                                        permissionOverwrites: [
                                            {
                                                id: client.user.id,
                                                allow: ['VIEW_CHANNEL','SEND_MESSAGES','MANAGE_CHANNELS'],
                                            },
                                            {
                                                id: message.author.id,
                                                deny : ['SEND_MESSAGES']
                                            },
                                            {
                                                id: message.guild.roles.everyone,
                                                allow: ['VIEW_CHANNEL'],
                                                deny : ['SEND_MESSAGES']
                                            },
                                            ],
                                    }).then(async(channel) => {
                                        await channel.setParent(data.category).catch(err => {
                                            if(err =='DiscordAPIError'){
                                            }
                                        })
                                        await channel.setPosition(6)
                                            .catch(err => console.log(err));
                                        data.categories = channel.id
                                        await data.save().catch(err => console.log(err))
                                    })
                                    let created = new MessageEmbed()
                                        .setTitle(`Successfully Created!`)
                                        .setDescription(`Created **Categories** Counter set in Type of **Text Channel!**`)
                                        .setColor(`#62FC1A`)
                                    await message.channel.send(created)
                                    return
                            } else {
                                message.channel.send(wrong)
                            }
                        }
                    })
                    message.channel.send(pictypeembed)
                } else if(collected.array()[0].content == 'announcement'){
                    let pictypeembed = new MessageEmbed()
                        .setTitle(`Pick Up One From This!`)
                        .setDescription(`Which type of channel do you want to use as a Stat Counter - \`voice\`, \`text\` or type cancel to cancel the process!.`)
                        .setColor(`#2EC5F9`)
                    let timeup = new MessageEmbed()
                        .setTitle(`Process Status of **Stat Counter Create**!`)
                        .setDescription(`⏰ Process Has Been Canceled! Because You Didn't Respond in Time!.`)
                        .setColor('RED')
                    let no = new MessageEmbed()
                        .setTitle(`Process Status of **Stat Counter Create**!`)
                        .setDescription(`:x: Process Has Been Canceled!`)
                        .setColor('RED')
                    let wrong = new MessageEmbed()
                        .setTitle(`:warning: Warning Alert! :warning:`)
                        .setDescription(`<a:LIVE:805007031823892480> You Typed Wrong word or it doesn't exits in my counters. **Please Try Again!** \`${data.Prefix}counter create\``)
                        .setColor(`GOLD`)
                    if(data.announcement){
                        let already = new MessageEmbed()
                            .setTitle(`:warning: Warning Alert! :warning:`)
                            .setDescription(`<a:LIVE:805007031823892480> This Counter Is Already In Progress, If You Want To Off It Use Command \`${data.Prefix}counter delete announcement\``)
                            .setColor(`GOLD`)
                        return message.channel.send(already)
                    }
                    let filter = (message) => !message.author.bot;
                    let options = {
                    max: 1,
                    time: 15000
                    };
                    let collector = message.channel.createMessageCollector(filter, options);
    
                    collector.on('collect', async (m) => {
                        if(m.content == 'cancel'){
                            collector.stop()
                            await message.channel.send(no)
                            
                        }
                    });
    
                    collector.on('end', async (collected, reason) => {
                        if (reason === 'time') {
                            return message.channel.send(timeup);
                        } else if(!collected.array()[0].content){
                            return;
                        } else if (collected.array()[0].content){
                            if(collected.array()[0].content == 'voice'){
                                    await message.guild.channels.create(`Announce Channels: ${message.guild.channels.cache.filter(r => r.type === "news").size.toLocaleString()}`, {
                                        type: 'voice',
                                        permissionOverwrites: [
                                            {
                                                id: client.user.id,
                                                allow: ['VIEW_CHANNEL','CONNECT','MANAGE_CHANNELS'],
                                            },
                                            {
                                                id: message.author.id,
                                                deny : ['CONNECT']
                                            },
                                            {
                                                id: message.guild.roles.everyone,
                                                allow: ['VIEW_CHANNEL'],
                                                deny : ['CONNECT']
                                            },
                                            ],
                                    }).then(async(channel) => {
                                        await channel.setParent(data.category).catch(err => {
                                            if(err == 'DiscordAPIError: Invalid Form Body'){
                                            }
                                        })
                                        await channel.setPosition(7)
                                            .catch(console.error);
                                        data.announcement = channel.id
                                        await data.save().catch(err => console.log(err))
                                    })
                                    let created = new MessageEmbed()
                                        .setTitle(`Successfully Created!`)
                                        .setDescription(`Created **Announce** Counter set in Type of **Voice Channel!**`)
                                        .setColor(`#62FC1A`)
                                    await message.channel.send(created)
                                    return
                            } else if (collected.array()[0].content == 'text'){
                                    await message.guild.channels.create(`Announce Channels: ${message.guild.channels.cache.filter(r => r.type === "news").size.toLocaleString()}`, {
                                        type: 'text',
                                        permissionOverwrites: [
                                            {
                                                id: client.user.id,
                                                allow: ['VIEW_CHANNEL','SEND_MESSAGES','MANAGE_CHANNELS'],
                                            },
                                            {
                                                id: message.author.id,
                                                deny : ['SEND_MESSAGES']
                                            },
                                            {
                                                id: message.guild.roles.everyone,
                                                allow: ['VIEW_CHANNEL'],
                                                deny : ['SEND_MESSAGES']
                                            },
                                            ],
                                    }).then(async(channel) => {
                                        await channel.setParent(data.category).catch(err => {
                                            if(err =='DiscordAPIError'){
                                            }
                                        })
                                        await channel.setPosition(7)
                                            .catch(console.error);
                                        data.announcement = channel.id
                                        await data.save().catch(err => console.log(err))
                                    })
                                    let created = new MessageEmbed()
                                        .setTitle(`Successfully Created!`)
                                        .setDescription(`Created **Announce** Counter set in Type of **Text Channel!**`)
                                        .setColor(`#62FC1A`)
                                    await message.channel.send(created)
                                    return
                            } else {
                                message.channel.send(wrong)
                            }
                        }
                    })
                    message.channel.send(pictypeembed)
                } else if(collected.array()[0].content == 'roles'){
                    let pictypeembed = new MessageEmbed()
                        .setTitle(`Pick Up One From This!`)
                        .setDescription(`Which type of channel do you want to use as a Stat Counter - \`voice\`, \`text\` or type cancel to cancel the process!.`)
                        .setColor(`#2EC5F9`)
                    let timeup = new MessageEmbed()
                        .setTitle(`Process Status of **Stat Counter Create**!`)
                        .setDescription(`⏰ Process Has Been Canceled! Because You Didn't Respond in Time!.`)
                        .setColor('RED')
                    let no = new MessageEmbed()
                        .setTitle(`Process Status of **Stat Counter Create**!`)
                        .setDescription(`:x: Process Has Been Canceled!`)
                        .setColor('RED')
                    let wrong = new MessageEmbed()
                        .setTitle(`:warning: Warning Alert! :warning:`)
                        .setDescription(`<a:LIVE:805007031823892480> You Typed Wrong word or it doesn't exits in my counters. **Please Try Again!** \`${data.Prefix}counter create\``)
                        .setColor(`GOLD`)
                    if(data.roles){
                        let already = new MessageEmbed()
                            .setTitle(`:warning: Warning Alert! :warning:`)
                            .setDescription(`<a:LIVE:805007031823892480> This Counter Is Already In Progress, If You Want To Off It Use Command \`${data.Prefix}counter delete all\``)
                            .setColor(`GOLD`)
                        return message.channel.send(already)
                    }
                    let filter = (message) => !message.author.bot;
                    let options = {
                    max: 1,
                    time: 15000
                    };
                    let collector = message.channel.createMessageCollector(filter, options);
    
                    collector.on('collect', async (m) => {
                        if(m.content == 'cancel'){
                            collector.stop()
                            await message.channel.send(no)
                            
                        }
                    });
    
                    collector.on('end', async (collected, reason) => {
                        if (reason === 'time') {
                            return message.channel.send(timeup);
                        } else if(!collected.array()[0].content){
                            return;
                        } else if (collected.array()[0].content){
                            if(collected.array()[0].content == 'voice'){
                                    await message.guild.channels.create(`Roles: ${message.guild.roles.cache.size.toLocaleString()}`, {
                                        type: 'voice',
                                        permissionOverwrites: [
                                            {
                                                id: client.user.id,
                                                allow: ['VIEW_CHANNEL','CONNECT','MANAGE_CHANNELS'],
                                            },
                                            {
                                                id: message.author.id,
                                                deny : ['CONNECT']
                                            },
                                            {
                                                id: message.guild.roles.everyone,
                                                allow: ['VIEW_CHANNEL'],
                                                deny : ['CONNECT']
                                            },
                                            ],
                                    }).then(async(channel) => {
                                        await channel.setParent(data.category).catch(err => {
                                            if(err == 'DiscordAPIError: Invalid Form Body'){
                                            }
                                        })
                                        await channel.setPosition(8)
                                            .catch(console.error);
                                        data.roles = channel.id
                                        await data.save().catch(err => console.log(err))
                                    })
                                    let created = new MessageEmbed()
                                        .setTitle(`Successfully Created!`)
                                        .setDescription(`Created **Roles** Counter set in Type of **Voice Channel!**`)
                                        .setColor(`#62FC1A`)
                                    await message.channel.send(created)
                                    return
                            } else if (collected.array()[0].content == 'text'){
                                    await message.guild.channels.create(`Roles: ${message.guild.roles.cache.size.toLocaleString()}`, {
                                        type: 'text',
                                        permissionOverwrites: [
                                            {
                                                id: client.user.id,
                                                allow: ['VIEW_CHANNEL','SEND_MESSAGES','MANAGE_CHANNELS'],
                                            },
                                            {
                                                id: message.author.id,
                                                deny : ['SEND_MESSAGES']
                                            },
                                            {
                                                id: message.guild.roles.everyone,
                                                allow: ['VIEW_CHANNEL'],
                                                deny : ['SEND_MESSAGES']
                                            },
                                            ],
                                    }).then(async(channel) => {
                                        await channel.setParent(data.category).catch(err => {
                                            if(err =='DiscordAPIError'){
                                            }
                                        })
                                        await channel.setPosition(8)
                                            .catch(console.error);
                                        data.roles = channel.id
                                        await data.save().catch(err => console.log(err))
                                    })
                                    let created = new MessageEmbed()
                                        .setTitle(`Successfully Created!`)
                                        .setDescription(`Created **Roles** Counter set in Type of **Text Channel!**`)
                                        .setColor(`#62FC1A`)
                                    await message.channel.send(created)
                                    return
                            } else {
                                message.channel.send(wrong)
                            }
                        }
                    })
                    message.channel.send(pictypeembed)
                } else if(collected.array()[0].content == 'role'){
                    let pictypeembed = new MessageEmbed()
                        .setTitle(`Pick Up One From This!`)
                        .setDescription(`Which type of channel do you want to use as a Stat Counter - \`voice\`, \`text\` or type cancel to cancel the process!.`)
                        .setColor(`#2EC5F9`)
                    let pictyperoleembed = new MessageEmbed()
                        .setTitle(`Which Role do you want to create counter?`)
                        .setDescription(`Mention A Role With ID of Role Or With @rolename!`)
                        .setColor(`#2EC5F9`)
                    let timeup = new MessageEmbed()
                        .setTitle(`Process Status of **Stat Counter Create**!`)
                        .setDescription(`⏰ Process Has Been Canceled! Because You Didn't Respond in Time!.`)
                        .setColor('RED')
                    let no = new MessageEmbed()
                        .setTitle(`Process Status of **Stat Counter Create**!`)
                        .setDescription(`:x: Process Has Been Canceled!`)
                        .setColor('RED')
                    let wrong = new MessageEmbed()
                        .setTitle(`:warning: Warning Alert! :warning:`)
                        .setDescription(`<a:LIVE:805007031823892480> You Typed Wrong word or it doesn't exits in my counters. **Please Try Again!** \`${data.Prefix}counter create\``)
                        .setColor(`GOLD`)
                    let wrong12 = new MessageEmbed()
                        .setTitle(`:warning: Warning Alert! :warning:`)
                        .setDescription(`<a:LIVE:805007031823892480> Mentioned Role Doesn't Exist Or ReCheck The Role ID. **Please Try Again!** \`${data.Prefix}counter create\``)
                        .setColor(`GOLD`)
                    if(data.role){
                        let already = new MessageEmbed()
                            .setTitle(`:warning: Warning Alert! :warning:`)
                            .setDescription(`<a:LIVE:805007031823892480> This Counter Is Already In Progress, If You Want To Off It Use Command \`${data.Prefix}counter delete role\``)
                            .setColor(`GOLD`)
                        return message.channel.send(already)
                    }
                    let filter = (message) => !message.author.bot;
                    let options = {
                    max: 1,
                    time: 15000
                    };
                    let collector = message.channel.createMessageCollector(filter, options);
    
                    collector.on('collect', async (m) => {
                        if(m.content == 'cancel'){
                            collector.stop()
                            await message.channel.send(no)
                            
                        }
                    });
    
                    collector.on('end', async (collected, reason) => {
                        if (reason === 'time') {
                            return message.channel.send(timeup);
                        } else if(!collected.array()[0].content){
                            return;
                        } else if (collected.array()[0].content){
                            function getroleFromMention(mention) {
                                const matches = mention.match(/^<@&?(\d+)>$/);
                                if (!matches) return;
                                const id = matches[1];
                                return id
                            }
                            let casa = getroleFromMention(collected.array()[0].content)
                            if(!casa){
                               roles = collected.array()[0].content
                            } else if (casa){
                                roles = casa
                            }
                            const sec2 = message.guild.roles.cache.find(role => role.id === roles);
                            if(!sec2) return message.channel.send(wrong12)
                            data.roleid = roles
                            data.save().catch(err => console.log(err))
                            if(sec2){
                                let filter = (message) => !message.author.bot;
                                    let options = {
                                    max: 1,
                                    time: 15000
                                    };
                                    let collector = message.channel.createMessageCollector(filter, options);
                    
                                    collector.on('collect', async (m) => {
                                        if(m.content == 'cancel'){
                                            collector.stop()
                                            await message.channel.send(no)
                                            
                                        }
                                    });
                    
                                    collector.on('end', async (collected, reason) => {
                                        if (reason === 'time') {
                                            return message.channel.send(timeup);
                                        } else if(!collected.array()[0].content){
                                            return;
                                        } else if (collected.array()[0].content){
                                            if(collected.array()[0].content == 'voice'){
                                                    await message.guild.channels.create(`Solo Roles: ${sec2.members.size.toLocaleString()}`, {
                                                        type: 'voice',
                                                        permissionOverwrites: [
                                                            {
                                                                id: client.user.id,
                                                                allow: ['CONNECT','MANAGE_CHANNELS'],
                                                            },
                                                            {
                                                                id: message.author.id,
                                                                deny : ['CONNECT']
                                                            },
                                                            {
                                                                id: message.guild.roles.everyone,
                                                                allow: ['VIEW_CHANNEL'],
                                                                deny : ['CONNECT']
                                                            },
                                                            ],
                                                    }).then(async(channel) => {
                                                        await channel.setParent(data.category).catch(err => {
                                                            if(err == 'DiscordAPIError: Invalid Form Body'){
                                                            }
                                                        })
                                                        await channel.setPosition(9)
                                                            .catch(console.error);
                                                        data.role = channel.id
                                                        await data.save().catch(err => console.log(err))
                                                    })
                                                    let created = new MessageEmbed()
                                                        .setTitle(`Successfully Created!`)
                                                        .setDescription(`Created **Solo Role** Counter set in Type of **Voice Channel!**`)
                                                        .setColor(`#62FC1A`)
                                                    await message.channel.send(created)
                                                    return
                                            } else if (collected.array()[0].content == 'text'){
                                                    await message.guild.channels.create(`Solo Roles: ${sec2.members.size.toLocaleString()}`, {
                                                        type: 'text',
                                                        permissionOverwrites: [
                                                            {
                                                                id: client.user.id,
                                                                allow: ['SEND_MESSAGES','MANAGE_CHANNELS'],
                                                            },
                                                            {
                                                                id: message.author.id,
                                                                deny : ['SEND_MESSAGES']
                                                            },
                                                            {
                                                                id: message.guild.roles.everyone,
                                                                allow: ['VIEW_CHANNEL'],
                                                                deny : ['SEND_MESSAGES']
                                                            },
                                                            ],
                                                    }).then(async(channel) => {
                                                        await channel.setParent(data.category).catch(err => {
                                                            if(err =='DiscordAPIError'){
                                                            }
                                                        })
                                                        await channel.setPosition(9)
                                                            .catch(console.error);
                                                        data.role = channel.id
                                                        await data.save().catch(err => console.log(err))
                                                    })
                                                    let created = new MessageEmbed()
                                                        .setTitle(`Successfully Created!`)
                                                        .setDescription(`Created **Solo Role** Counter set in Type of **Text Channel!**`)
                                                        .setColor(`#62FC1A`)
                                                    await message.channel.send(created)
                                                    return
                                            } else {
                                                message.channel.send(wrong)
                                            }
                                        }
                                    })
                                    message.channel.send(pictypeembed)
                            }
                        }
                    })
                    message.channel.send(pictyperoleembed)
                    
                } else if(collected.array()[0].content == 'emojis'){
                    let timeup = new MessageEmbed()
                        .setTitle(`Process Status of **Stat Counter Create**!`)
                        .setDescription(`⏰ Process Has Been Canceled! Because You Didn't Respond in Time!.`)
                        .setColor('RED')
                    let no = new MessageEmbed()
                        .setTitle(`Process Status of **Stat Counter Create**!`)
                        .setDescription(`:x: Process Has Been Canceled!`)
                        .setColor('RED')
                    let pictypeembed = new MessageEmbed()
                        .setTitle(`Pick Up One From This!`)
                        .setDescription(`Which type of channel do you want to use as a Stat Counter - \`voice\`, \`text\` or type cancel to cancel the process!.`)
                        .setColor(`#2EC5F9`)
                    let wrong = new MessageEmbed()
                        .setTitle(`:warning: Warning Alert! :warning:`)
                        .setDescription(`<a:LIVE:805007031823892480> You Typed Wrong word or it doesn't exits in my counters. **Please Try Again!** \`${data.Prefix}counter create\``)
                        .setColor(`GOLD`)
                    if(data.emojis){
                        return message.channel.send(`:warning: This Counter Is Already In Progress, If You Want To Off It Use Command \`+counter delete emojis\``)
                    }
                    let filter = (message) => !message.author.bot;
                    let options = {
                    max: 1,
                    time: 15000
                    };
                    let collector = message.channel.createMessageCollector(filter, options);
    
                    collector.on('collect', async (m) => {
                        if(m.content == 'cancel'){
                            collector.stop()
                            await message.channel.send(no)
                            
                        }
                    });
    
                    collector.on('end', async (collected, reason) => {
                        if (reason === 'time') {
                            return message.channel.send(timeup);
                        } else if(!collected.array()[0].content){
                            return;
                        } else if (collected.array()[0].content){
                            if(collected.array()[0].content == 'voice'){
                                    await message.guild.channels.create(`Total emojis: ${message.guild.emojis.cache.size.toLocaleString()}`, {
                                        type: 'voice',
                                        permissionOverwrites: [
                                            {
                                                id: client.user.id,
                                                allow: ['CONNECT'],
                                            },
                                            {
                                                id: message.author.id,
                                                deny : ['CONNECT']
                                            },
                                            {
                                                id: message.guild.roles.everyone,
                                                allow: ['VIEW_CHANNEL'],
                                                deny : ['CONNECT']
                                            },
                                            ],
                                    }).then(async(channel) => {
                                        await channel.setParent(data.category).catch(err => {
                                            if(err == 'DiscordAPIError: Invalid Form Body'){
                                            }
                                        })
                                        await channel.setPosition(10)
                                            .catch(console.error);
                                        data.emojis = channel.id
                                        await data.save().catch(err => console.log(err))
                                    })
                                    let created = new MessageEmbed()
                                        .setTitle(`Successfully Created!`)
                                        .setDescription(`Created **Emojis** Counter set in Type of **Voice Channel!**`)
                                        .setColor(`#62FC1A`)
                                    await message.channel.send(created)
                                    return
                            } else if (collected.array()[0].content == 'text'){
                                    await message.guild.channels.create(`Total emojis: ${message.guild.emojis.cache.size.toLocaleString()}`, {
                                        type: 'text',
                                        permissionOverwrites: [
                                            {
                                                id: client.user.id,
                                                allow: ['VIEW_CHANNEL','SEND_MESSAGES','MANAGE_CHANNELS'],
                                            },
                                            {
                                                id: message.author.id,
                                                deny : ['SEND_MESSAGES']
                                            },
                                            {
                                                id: message.guild.roles.everyone,
                                                allow: ['VIEW_CHANNEL'],
                                                deny : ['SEND_MESSAGES']
                                            },
                                            ],
                                    }).then(async(channel) => {
                                        await channel.setParent(data.category).catch(err => {
                                            if(err =='DiscordAPIError'){
                                            }
                                        })
                                        await channel.setPosition(10)
                                            .catch(console.error);
                                        data.emojis = channel.id
                                        await data.save().catch(err => console.log(err))
                                    })
                                    let created = new MessageEmbed()
                                        .setTitle(`Successfully Created!`)
                                        .setDescription(`Created **Emojis** Counter set in Type of **Text Channel!**`)
                                        .setColor(`#62FC1A`)
                                    await message.channel.send(created)
                                    return
                            } else {
                                message.channel.send(wrong)
                            }
                        }
                    })
                    message.channel.send(pictypeembed)
                } else if(collected.array()[0].content == 'static'){
                    let timeup = new MessageEmbed()
                        .setTitle(`Process Status of **Stat Counter Create**!`)
                        .setDescription(`⏰ Process Has Been Canceled! Because You Didn't Respond in Time!.`)
                        .setColor('RED')
                    let no = new MessageEmbed()
                        .setTitle(`Process Status of **Stat Counter Create**!`)
                        .setDescription(`:x: Process Has Been Canceled!`)
                        .setColor('RED')
                    let pictypeembed = new MessageEmbed()
                        .setTitle(`Pick Up One From This!`)
                        .setDescription(`Which type of channel do you want to use as a Stat Counter - \`voice\`, \`text\` or type cancel to cancel the process!.`)
                        .setColor(`#2EC5F9`)
                    let wrong = new MessageEmbed()
                        .setTitle(`:warning: Warning Alert! :warning:`)
                        .setDescription(`<a:LIVE:805007031823892480> You Typed Wrong word or it doesn't exits in my counters. **Please Try Again!** \`${data.Prefix}counter create\``)
                        .setColor(`GOLD`)
                    if(data.static){
                        let already = new MessageEmbed()
                            .setTitle(`:warning: Warning Alert! :warning:`)
                            .setDescription(`:LIVE: This Counter Is Already In Progress, If You Want To Off It Use Command \`${data.Prefix}counter delete static\``)
                            .setColor(`GOLD`)
                        return message.channel.send(already)
                    }
                    let filter = (message) => !message.author.bot;
                    let options = {
                    max: 1,
                    time: 15000
                    };
                    let collector = message.channel.createMessageCollector(filter, options);
    
                    collector.on('collect', async (m) => {
                        if(m.content == 'cancel'){
                            collector.stop()
                            await message.channel.send(no)
                            
                        }
                    });
    
                    collector.on('end', async (collected, reason) => {
                        if (reason === 'time') {
                            return message.channel.send(timeup);
                        } else if(!collected.array()[0].content){
                            return;
                        } else if (collected.array()[0].content){
                            if(collected.array()[0].content == 'voice'){
                                    await message.guild.channels.create(`Static emojis: ${message.guild.emojis.cache.filter(e => e.animated === false).size.toLocaleString()}`, {
                                        type: 'voice',
                                        permissionOverwrites: [
                                            {
                                                id: client.user.id,
                                                allow: ['VIEW_CHANNEL','CONNECT','MANAGE_CHANNELS'],
                                            },
                                            {
                                                id: message.author.id,
                                                deny : ['CONNECT']
                                            },
                                            {
                                                id: message.guild.roles.everyone,
                                                allow: ['VIEW_CHANNEL'],
                                                deny : ['CONNECT']
                                            },
                                            ],
                                    }).then(async(channel) => {
                                        await channel.setParent(data.category).catch(err => {
                                            if(err == 'DiscordAPIError: Invalid Form Body'){
                                            }
                                        })
                                        await channel.setPosition(11)
                                            .catch(console.error);
                                        data.static = channel.id
                                        await data.save().catch(err => console.log(err))
                                    })
                                    let created = new MessageEmbed()
                                        .setTitle(`Successfully Created!`)
                                        .setDescription(`Created **Static** Counter set in Type of **Voice Channel!**`)
                                        .setColor(`#62FC1A`)
                                    await message.channel.send(created)
                                    return
                            } else if (collected.array()[0].content == 'text'){
                                    await message.guild.channels.create(`Static emojis: ${message.guild.emojis.cache.filter(e => e.animated === false).size.toLocaleString()}`, {
                                        type: 'text',
                                        permissionOverwrites: [
                                            {
                                                id: client.user.id,
                                                allow: ['VIEW_CHANNEL','SEND_MESSAGES','MANAGE_CHANNELS'],
                                            },
                                            {
                                                id: message.author.id,
                                                deny : ['SEND_MESSAGES']
                                            },
                                            {
                                                id: message.guild.roles.everyone,
                                                allow: ['VIEW_CHANNEL'],
                                                deny : ['SEND_MESSAGES']
                                            },
                                            ],
                                    }).then(async(channel) => {
                                        await channel.setParent(data.category).catch(err => {
                                            if(err =='DiscordAPIError'){
                                            }
                                        })
                                        await channel.setPosition(11)
                                            .catch(console.error);
                                        data.static = channel.id
                                        await data.save().catch(err => console.log(err))
                                    })
                                    let created = new MessageEmbed()
                                        .setTitle(`Successfully Created!`)
                                        .setDescription(`Created **Static** Counter set in Type of **Text Channel!**`)
                                        .setColor(`#62FC1A`)
                                    await message.channel.send(created)
                                    return
                            } else {
                                message.channel.send(wrong)
                            }
                        }
                    })
                    message.channel.send(pictypeembed)
                } else if(collected.array()[0].content == 'animated'){
                    let timeup = new MessageEmbed()
                        .setTitle(`Process Status of **Stat Counter Create**!`)
                        .setDescription(`⏰ Process Has Been Canceled! Because You Didn't Respond in Time!.`)
                        .setColor('RED')
                    let no = new MessageEmbed()
                        .setTitle(`Process Status of **Stat Counter Create**!`)
                        .setDescription(`:x: Process Has Been Canceled!`)
                        .setColor('RED')
                    let pictypeembed = new MessageEmbed()
                        .setTitle(`Pick Up One From This!`)
                        .setDescription(`Which type of channel do you want to use as a Stat Counter - \`voice\`, \`text\` or type cancel to cancel the process!.`)
                        .setColor(`#2EC5F9`)
                    let wrong = new MessageEmbed()
                        .setTitle(`:warning: Warning Alert! :warning:`)
                        .setDescription(`<a:LIVE:805007031823892480> You Typed Wrong word or it doesn't exits in my counters. **Please Try Again!** \`${data.Prefix}counter create\``)
                        .setColor(`GOLD`)
                    if(data.animated){
                        let already = new MessageEmbed()
                            .setTitle(`:warning: Warning Alert! :warning:`)
                            .setDescription(`:LIVE: This Counter Is Already In Progress, If You Want To Off It Use Command \`${data.Prefix}counter delete animated\``)
                            .setColor(`GOLD`)
                        return message.channel.send(already)
                    }
                    let filter = (message) => !message.author.bot;
                    let options = {
                    max: 1,
                    time: 15000
                    };
                    let collector = message.channel.createMessageCollector(filter, options);
    
                    collector.on('collect', async (m) => {
                        if(m.content == 'cancel'){
                            collector.stop()
                            await message.channel.send(no)
                            
                        }
                    });
    
                    collector.on('end', async (collected, reason) => {
                        if (reason === 'time') {
                            return message.channel.send(timeup);
                        } else if(!collected.array()[0].content){
                            return;
                        } else if (collected.array()[0].content){
                            if(collected.array()[0].content == 'voice'){
                                    await message.guild.channels.create(`Animated emojis: ${message.guild.emojis.cache.filter(e => e.animated === true).size.toLocaleString()}`, {
                                        type: 'voice',
                                        permissionOverwrites: [
                                            {
                                                id: client.user.id,
                                                allow: ['VIEW_CHANNEL','CONNECT','MANAGE_CHANNELS'],
                                            },
                                            {
                                                id: message.author.id,
                                                deny : ['CONNECT']
                                            },
                                            {
                                                id: message.guild.roles.everyone,
                                                allow: ['VIEW_CHANNEL'],
                                                deny : ['CONNECT']
                                            },
                                            ],
                                    }).then(async(channel) => {
                                        await channel.setParent(data.category).catch(err => {
                                            if(err == 'DiscordAPIError: Invalid Form Body'){
                                            }
                                        })
                                        await channel.setPosition(12)
                                            .catch(console.error);
                                        data.animated = channel.id
                                        await data.save().catch(err => console.log(err))
                                    })
                                    let created = new MessageEmbed()
                                        .setTitle(`Successfully Created!`)
                                        .setDescription(`Created **Animated** Counter set in Type of **Voice Channel!**`)
                                        .setColor(`#62FC1A`)
                                    await message.channel.send(created)
                                    return
                            } else if (collected.array()[0].content == 'text'){
                                    await message.guild.channels.create(`Animated emojis: ${message.guild.emojis.cache.filter(e => e.animated === true).size.toLocaleString()}`, {
                                        type: 'text',
                                        permissionOverwrites: [
                                            {
                                                id: client.user.id,
                                                allow: ['VIEW_CHANNEL','SEND_MESSAGES','MANAGE_CHANNELS'],
                                            },
                                            {
                                                id: message.author.id,
                                                deny : ['SEND_MESSAGES']
                                            },
                                            {
                                                id: message.guild.roles.everyone,
                                                allow: ['VIEW_CHANNEL'],
                                                deny : ['SEND_MESSAGES']
                                            },
                                            ],
                                    }).then(async(channel) => {
                                        await channel.setParent(data.category).catch(err => {
                                            if(err =='DiscordAPIError'){
                                            }
                                        })
                                        await channel.setPosition(12)
                                            .catch(console.error);
                                        data.animated = channel.id
                                        await data.save().catch(err => console.log(err))
                                    })
                                    let created = new MessageEmbed()
                                        .setTitle(`Successfully Created!`)
                                        .setDescription(`Created **Animated** Counter set in Type of **Text Channel!**`)
                                        .setColor(`#62FC1A`)
                                    await message.channel.send(created)
                                    return
                            } else {
                                message.channel.send(wrong)
                            }
                        }
                    })
                    message.channel.send(pictypeembed)
                } else if(collected.array()[0].content == 'boosts'){
                    let timeup = new MessageEmbed()
                        .setTitle(`Process Status of **Stat Counter Create**!`)
                        .setDescription(`⏰ Process Has Been Canceled! Because You Didn't Respond in Time!.`)
                        .setColor('RED')
                    let no = new MessageEmbed()
                        .setTitle(`Process Status of **Stat Counter Create**!`)
                        .setDescription(`:x: Process Has Been Canceled!`)
                        .setColor('RED')
                    if(data.boosts){
                        let already = new MessageEmbed()
                            .setTitle(`:warning: Warning Alert! :warning:`)
                            .setDescription(`<a:LIVE:805007031823892480> This Counter Is Already In Progress, If You Want To Off It Use Command \`${data.Prefix}counter delete boosts\``)
                            .setColor(`GOLD`)
                        return message.channel.send(already)
                    }
                    let filter = (message) => !message.author.bot;
                    let options = {
                    max: 1,
                    time: 15000
                    };
                    let collector = message.channel.createMessageCollector(filter, options);
    
                    collector.on('collect', async (m) => {
                        if(m.content == 'cancel'){
                            collector.stop()
                            await message.channel.send(no)
                            
                        }
                    });
    
                    collector.on('end', async (collected, reason) => {
                        if (reason === 'time') {
                            return message.channel.send(timeup);
                        } else if(!collected.array()[0].content){
                            return;
                        } else if (collected.array()[0].content){
                            if(collected.array()[0].content == 'voice'){
                                    await message.guild.channels.create(`Boosts: ${message.guild.premiumSubscriptionCount.toLocaleString()}`, {
                                        type: 'voice',
                                        permissionOverwrites: [
                                            {
                                                id: client.user.id,
                                                allow: ['VIEW_CHANNEL','CONNECT','MANAGE_CHANNELS'],
                                            },
                                            {
                                                id: message.author.id,
                                                deny : ['CONNECT']
                                            },
                                            {
                                                id: message.guild.roles.everyone,
                                                allow: ['VIEW_CHANNEL'],
                                                deny : ['CONNECT']
                                            },
                                            ],
                                    }).then(async(channel) => {
                                        await channel.setParent(data.category).catch(err => {
                                            if(err == 'DiscordAPIError: Invalid Form Body'){
                                            }
                                        })
                                        await channel.setPosition(13)
                                            .catch(console.error);
                                        data.boosts = channel.id
                                        await data.save().catch(err => console.log(err))
                                    })
                                    let created = new MessageEmbed()
                                        .setTitle(`Successfully Created!`)
                                        .setDescription(`Created **Boost** Counter set in Type of **Voice Channel!**`)
                                        .setColor(`#62FC1A`)
                                    await message.channel.send(created)
                                    return;
                            } else if (collected.array()[0].content == 'text'){
                                    await message.guild.channels.create(`Boosts: ${message.guild.emojis.cache.size.toLocaleString()}`, {
                                        type: 'text',
                                        permissionOverwrites: [
                                            {
                                                id: client.user.id,
                                                allow: ['VIEW_CHANNEL','SEND_MESSAGES','MANAGE_CHANNELS'],
                                            },
                                            {
                                                id: message.author.id,
                                                deny : ['SEND_MESSAGES']
                                            },
                                            {
                                                id: message.guild.roles.everyone,
                                                allow: ['VIEW_CHANNEL'],
                                                deny : ['SEND_MESSAGES']
                                            },
                                            ],
                                    }).then(async(channel) => {
                                        await channel.setParent(data.category).catch(err => {
                                            if(err =='DiscordAPIError'){
                                            }
                                        })
                                        await channel.setPosition(13)
                                            .catch(console.error);
                                        data.boosts = channel.id
                                        await data.save().catch(err => console.log(err))
                                    })
                                    let created = new MessageEmbed()
                                        .setTitle(`Successfully Created!`)
                                        .setDescription(`Created **Boost** Counter set in Type of **Text Channel!**`)
                                        .setColor(`#62FC1A`)
                                    await message.channel.send(created)
                                    return;
                            } else {
                                let wrong = new MessageEmbed()
                                    .setTitle(`:warning: Warning Alert! :warning:`)
                                    .setDescription(`<a:LIVE:805007031823892480> You Typed Wrong word or it doesn't exits in my counters. **Please Try Again!** \`${data.Prefix}counter create\``)
                                    .setColor(`GOLD`)
                                return message.channel.send(wrong)
                            }
                        }
                    })
                    let pictypeembed = new MessageEmbed()
                        .setTitle(`Pick Up One From This!`)
                        .setDescription(`Which type of channel do you want to use as a Stat Counter - \`voice\`, \`text\` or type cancel to cancel the process!.`)
                        .setColor(`#2EC5F9`)
                    message.channel.send(pictypeembed)
                } else if(collected.array()[0].content == 'tier'){
                    let timeup = new MessageEmbed()
                        .setTitle(`Process Status of **Stat Counter Create**!`)
                        .setDescription(`⏰ Process Has Been Canceled! Because You Didn't Respond in Time!.`)
                        .setColor('RED')
                    let no = new MessageEmbed()
                        .setTitle(`Process Status of **Stat Counter Create**!`)
                        .setDescription(`:x: Process Has Been Canceled!`)
                        .setColor('RED')
                    if(data.tier){
                        let already = new MessageEmbed()
                            .setTitle(`:warning: Warning Alert! :warning:`)
                            .setDescription(`<a:LIVE:805007031823892480> This Counter Is Already In Progress, If You Want To Off It Use Command \`${data.Prefix}counter delete tier\``)
                            .setColor(`GOLD`)
                        return message.channel.send(already)
                    }
                    let filter = (message) => !message.author.bot;
                    let options = {
                    max: 1,
                    time: 15000
                    };
                    let collector = message.channel.createMessageCollector(filter, options);
    
                    collector.on('collect', async (m) => {
                        if(m.content == 'cancel'){
                            collector.stop()
                            await message.channel.send(no)
                            
                        }
                    });
    
                    collector.on('end', async (collected, reason) => {
                        if (reason === 'time') {
                            return message.channel.send(timeup);
                        } else if(!collected.array()[0].content){
                            return;
                        } else if (collected.array()[0].content){
                            if(collected.array()[0].content == 'voice'){
                                    await message.guild.channels.create(`Tier: ${message.guild.premiumTier.toLocaleString()}`, {
                                        type: 'voice',
                                        permissionOverwrites: [
                                            {
                                                id: client.user.id,
                                                allow: ['VIEW_CHANNEL','CONNECT','MANAGE_CHANNELS'],
                                            },
                                            {
                                                id: message.author.id,
                                                deny : ['CONNECT']
                                            },
                                            {
                                                id: message.guild.roles.everyone,
                                                allow: ['VIEW_CHANNEL'],
                                                deny : ['CONNECT']
                                            },
                                            ],
                                    }).then(async(channel) => {
                                        await channel.setParent(data.category).catch(err => {
                                            if(err == 'DiscordAPIError: Invalid Form Body'){
                                            }
                                        })
                                        await channel.setPosition(14)
                                            .catch(console.error);
                                        data.tier = channel.id
                                        await data.save().catch(err => console.log(err))
                                    })
                                    let created = new MessageEmbed()
                                        .setTitle(`Successfully Created!`)
                                        .setDescription(`Created **Tier** Counter set in Type of **Voice Channel!**`)
                                        .setColor(`#62FC1A`)
                                    await message.channel.send(created)
                                    return
                            } else if (collected.array()[0].content == 'text'){
                                    await message.guild.channels.create(`Tier: ${message.guild.premiumTier.toLocaleString()}`, {
                                        type: 'text',
                                        permissionOverwrites: [
                                            {
                                                id: client.user.id,
                                                allow: ['VIEW_CHANNEL','SEND_MESSAGES','MANAGE_CHANNELS'],
                                            },
                                            {
                                                id: message.author.id,
                                                deny : ['SEND_MESSAGES']
                                            },
                                            {
                                                id: message.guild.roles.everyone,
                                                allow: ['VIEW_CHANNEL'],
                                                deny : ['SEND_MESSAGES']
                                            },
                                            ],
                                    }).then(async(channel) => {
                                        await channel.setParent(data.category).catch(err => {
                                            if(err =='DiscordAPIError'){
                                            }
                                        })
                                        await channel.setPosition(14)
                                            .catch(console.error);
                                        data.tier = channel.id
                                        await data.save().catch(err => console.log(err))
                                    })
                                    let created = new MessageEmbed()
                                        .setTitle(`Successfully Created!`)
                                        .setDescription(`Created **Tier** Counter set in Type of **Text Channel!**`)
                                        .setColor(`#62FC1A`)
                                    await message.channel.send(created)
                                return
                            } else {
                                let wrong = new MessageEmbed()
                                    .setTitle(`:warning: Warning Alert! :warning:`)
                                    .setDescription(`<a:LIVE:805007031823892480> You Typed Wrong word or it doesn't exits in my counters. **Please Try Again!** \`${data.Prefix}counter create\``)
                                    .setColor(`GOLD`)
                                return message.channel.send(wrong)
                            }
                        }
                    })
                    let pictypeembed = new MessageEmbed()
                        .setTitle(`Pick Up One From This!`)
                        .setDescription(`Which type of channel do you want to use as a Stat Counter - \`voice\`, \`text\` or type cancel to cancel the process!.`)
                        .setColor(`#2EC5F9`)
                    message.channel.send(pictypeembed)
                } else {
                    let wrong1 = new MessageEmbed()
                        .setTitle(`:warning: Warning Alert! :warning:`)
                        .setDescription(`<a:LIVE:805007031823892480> You Typed Wrong word or it doesn't exits in my stat counters.\n**Please Try Again!**\n__**Words Should Be :**__ \n\`all\`, \`members\`, \`bots\`, \`channels\`, \`text\`, \`voice\`, \`categories\`, \`announcement\`, \`roles\`, \`role\`, \`emojis\`, \`static\`, \`animated\`, \`boosts\`, \`tier\``)
                        .setColor(`GOLD`)
                    return message.channel.send(wrong1)
                }
            })
            let pictypecounterembed = new MessageEmbed()
                    .setTitle(`Pick Up One From Them!`)
                    .setDescription(`Which type of stat counter do you like to create. \`all\`, \`members\`, \`bots\`, \`channels\`, \`text\`, \`voice\`, \`categories\`, \`announcement\`, \`roles\`, \`role\`, \`emojis\`, \`static\`, \`animated\`, \`boosts\`, \`tier\` or type cancel to cancel the command.`)
                    .setColor(`#2EC5F9`)
            message.channel.send(pictypecounterembed)


        } else if (data.setups === false){
            return message.channel.send(`:warning: Your Server Setup Is Not Yet Done For Setup You Need to Type **\`+setup\`**`)
        }
    
    } else if(text == 'update'){
        let cooldown = 180000
        let update = data.settime
            if (update !== null && cooldown - (Date.now() - update) > 0) {
                let time = ms(cooldown - (Date.now() - update));
            let timeEmbed = new MessageEmbed()
                .setColor("#90ee90")
                .setDescription(`Update Setted!, Try Again in ${time.minutes}m ${time.seconds}s `);
                return message.channel.send(timeEmbed)            
            } else {
                let ns = new MessageEmbed()
                .setColor('GOLD')
                .setDescription('Update In 3 Minutes!')
                .setTimestamp()
                data.settime = Date.now()
                data.save().catch(err => console.log(err))
                setTimeout(() => {
                    require('../member_counter.js')(client, member)
                }, 180000)
                return message.channel.send(ns)
            }
    } else if(text == 'change'){
        if(data.setups === true){
            let filter = (message) => !message.author.bot;
            let options = {
            max: 1,
            time: 20000
            };
            let collector = message.channel.createMessageCollector(filter, options);
            let pictypeembed = new MessageEmbed()
                .setTitle(`Which type of stat counter do you like to change?`)
                .setDescription(`**(pick Up One From This)?**.\n\`all\`, \`members\`, \`bots\`, \`channels\`, \`text\`, \`voice\`, \`categories\`, \`announcement\`, \`roles\`, \`role\`, \`emojis\`, \`static\`, \`animated\`, \`boosts\`, \`tier\` or type cancel to cancel the command.`)
                .setColor(`#2EC5F9`)
            let timeup = new MessageEmbed()
                .setTitle(`Process Status of **Stat Counter Change**!`)
                .setDescription(`⏰ Process Has Been Canceled! Because You Didn't Respond in Time!.`)
                .setColor('RED')
            let no = new MessageEmbed()
                .setTitle(`Process Status of **Stat Counter Change**!`)
                .setDescription(`:x: Process Has Been Canceled!`)
                .setColor('RED')
            let wrong = new MessageEmbed()
                .setTitle(`:warning: Warning Alert! :warning:`)
                .setDescription(`:LIVE: You Typed Wrong word or it doesn't exits in my counters. **Please Try Again!** \`${data.Prefix}counter change\``)
                .setColor(`GOLD`)
            let warn = new MessageEmbed()
                .setTitle(`:warning: Warning Alert! :warning:`)
                .setDescription(`Mention A Channel Name! (with ID or #ChannelName)`)
                .setColor('GOLD')
            collector.on('collect', async (m) => {
                if(m.content == 'cancel'){
                    collector.stop()
                    await message.channel.send(no)
                } 
            });
            collector.on('end', async (collected, reason) => {
                if (reason === 'time') {
                    return message.channel.send(timeup);
                } else if(!collected.array()[0].content){
                    return;
                } else if (collected.array()[0].content){
                        if(collected.array()[0].content == 'all') {
                            let filter = (message) => !message.author.bot;
                            let options = {
                            max: 1,
                            time: 20000
                            };
                            let collector = message.channel.createMessageCollector(filter, options);

                            collector.on('collect', async (m) => {
                                if(m.content == 'cancel'){
                                    collector.stop()
                                    await message.channel.send(no)
                                }
                            });
                            collector.on('end', async (collected, reason) => {
                                if (reason === 'time') {
                                    return message.channel.send(timeup);
                                } else if(!collected.array()[0].content){
                                    return;
                                } else if (collected.array()[0].content){
                                        function getchannelFromMention(mention) {
                                            const matches = mention.match(/^<#?(\d+)>$/);
                                            if (!matches) return;
                                            const id = matches[1];
                                            return id
                                        }
                                        let casa = getchannelFromMention(collected.array()[0].content)
                                        if(!casa){
                                            channelid = collected.array()[0].content
                                        } else if (casa){
                                            channelid = casa
                                        }
                                        let sec2 = message.guild.channels.cache.find(channel => channel.id === channelid);
                                        if(!sec2) return message.channel.send(warn)
                                        if(data.members == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.all == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Can't Set The Same Channel!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.bots == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.channels == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.text == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.voice == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.categories == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        } 
                                        if(data.announcement == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.roles == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.role == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.emojis == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.static == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.animated == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.boosts == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.tier == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        data.all = sec2.id
                                        data.save().catch(err => console.log(err))
                                        let changed = new MessageEmbed()
                                            .setTitle(`Successfully Created!`)
                                            .setDescription(`Bot Has Turned The All Member Counter to The Channel ${sec2} (ID: ${sec2.id})`)
                                            .setColor('GOLD')
                                            .setTimestamp()
                                    return message.channel.send(changed)
                                }

                            })
                            if(!data.all) mess = 'none'
                            else if (data.all) mess = data.all
                            let info = new MessageEmbed()
                                .setColor("#2EC5F9")
                                .setTitle(`Information!`)
                                .setDescription(`Current \`ALL Members\` Channel : <#${mess}> (ID: ${mess})\nWhich channel do you want to change it to **(don't use the channel name, use the ID or mention it with #channelname)?**. `)
                            message.channel.send(info)
                        } else if(collected.array()[0].content == 'members') {
                            let filter = (message) => !message.author.bot;
                            let options = {
                            max: 1,
                            time: 20000
                            };
                            let collector = message.channel.createMessageCollector(filter, options);

                            collector.on('collect', async (m) => {
                                if(m.content == 'cancel'){
                                    collector.stop()
                                    await message.channel.send(no)
                                }
                            });
                            collector.on('end', async (collected, reason) => {
                                if (reason === 'time') {
                                    return message.channel.send(timeEmbed);
                                } else if(!collected.array()[0].content){
                                    return;
                                } else if (collected.array()[0].content){
                                        function getchannelFromMention(mention) {
                                            const matches = mention.match(/^<#?(\d+)>$/);
                                            if (!matches) return;
                                            const id = matches[1];
                                            return id
                                        }
                                        let casa = getchannelFromMention(collected.array()[0].content)
                                        if(!casa){
                                            channelid = collected.array()[0].content
                                        } else if (casa){
                                            channelid = casa
                                        }
                                        let sec2 = message.guild.channels.cache.find(channel => channel.id === channelid);
                                        if(!sec2) return message.channel.send(warn)
                                        if(data.members == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Can't Set The Same Channel!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.all == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.bots == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.channels == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.text == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.voice == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.categories == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        } 
                                        if(data.announcement == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.roles == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.role == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.emojis == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.static == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.animated == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.boosts == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.tier == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        data.members = sec2.id
                                        data.save().catch(err => console.log(err))
                                        let changed = new MessageEmbed()
                                        .setTitle(`Successfully Created!`)
                                        .setDescription(`Bot Has Turned The \`Member\` Counter to The Channel ${sec2} (ID: \`${sec2.id}\`)`)
                                        .setColor('GOLD')
                                        .setTimestamp()
                                return message.channel.send(changed)
                                }

                            })
                            if(!data.members) mess = 'none'
                            else if (data.members) mess = data.memebrs
                            let info = new MessageEmbed()
                                .setColor("#2EC5F9")
                                .setTitle(`Information!`)
                                .setDescription(`Current \`Members\` Channel : <#${mess}> (ID: ${mess})\nWhich channel do you want to change it to **(don't use the channel name, use the ID or mention it with #channelname)?**. `)
                            message.channel.send(info)
                        } else if(collected.array()[0].content == 'bots') {
                            let filter = (message) => !message.author.bot;
                            let options = {
                            max: 1,
                            time: 20000
                            };
                            let collector = message.channel.createMessageCollector(filter, options);

                            collector.on('collect', async (m) => {
                                if(m.content == 'cancel'){
                                    collector.stop()
                                    await message.channel.send(no)
                                }
                            });
                            collector.on('end', async (collected, reason) => {
                                if (reason === 'time') {
                                    return message.channel.send(timeup);
                                } else if(!collected.array()[0].content){
                                    return;
                                } else if (collected.array()[0].content){
                                        function getchannelFromMention(mention) {
                                            const matches = mention.match(/^<#?(\d+)>$/);
                                            if (!matches) return;
                                            const id = matches[1];
                                            return id
                                        }
                                        let casa = getchannelFromMention(collected.array()[0].content)
                                        if(!casa){
                                            channelid = collected.array()[0].content
                                        } else if (casa){
                                            channelid = casa
                                        }
                                        let sec2 = message.guild.channels.cache.find(channel => channel.id === channelid);
                                        if(!sec2) return message.channel.send(warn)
                                        if(data.members == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.all == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.bots == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Can't Set The Same Channel!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.channels == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.text == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.voice == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.categories == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        } 
                                        if(data.announcement == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.roles == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.role == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.emojis == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.static == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.animated == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.boosts == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.tier == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        data.bots = sec2.id
                                        data.save().catch(err => console.log(err))
                                        let changed = new MessageEmbed()
                                        .setTitle(`Successfully Created!`)
                                        .setDescription(`Bot Has Turned The \`Member\` Counter to The Channel ${sec2} (ID: \`${sec2.id}\`)`)
                                        .setColor('GOLD')
                                        .setTimestamp()
                                return message.channel.send(changed)
                                }

                            })
                            if(!data.bots) mess = 'none'
                            else if (data.bots) mess = data.bots
                            let info = new MessageEmbed()
                                .setColor("#2EC5F9")
                                .setTitle(`Information!`)
                                .setDescription(`Current \`Bots\` Channel : <#${mess}> (ID: ${mess})\nWhich channel do you want to change it to **(don't use the channel name, use the ID or mention it with #channelname)?**. `)
                            message.channel.send(info)
                        } else if(collected.array()[0].content == 'channels') {
                            let filter = (message) => !message.author.bot;
                            let options = {
                            max: 1,
                            time: 20000
                            };
                            let collector = message.channel.createMessageCollector(filter, options);

                            collector.on('collect', async (m) => {
                                if(m.content == 'cancel'){
                                    collector.stop()
                                    await message.channel.send(no)
                                }
                            });
                            collector.on('end', async (collected, reason) => {
                                if (reason === 'time') {
                                    return message.channel.send(timeup);
                                } else if(!collected.array()[0].content){
                                    return;
                                } else if (collected.array()[0].content){
                                        function getchannelFromMention(mention) {
                                            const matches = mention.match(/^<#?(\d+)>$/);
                                            if (!matches) return;
                                            const id = matches[1];
                                            return id
                                        }
                                        let casa = getchannelFromMention(collected.array()[0].content)
                                        if(!casa){
                                            channelid = collected.array()[0].content
                                        } else if (casa){
                                            channelid = casa
                                        }
                                        let sec2 = message.guild.channels.cache.find(channel => channel.id === channelid);
                                        if(!sec2) return message.channel.send(warn)
                                        if(data.members == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.all == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.bots == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.channels == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Can't Set The Same Channel!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.text == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.voice == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.categories == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        } 
                                        if(data.announcement == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.roles == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.role == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.emojis == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.static == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.animated == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.boosts == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.tier == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        data.channels = sec2.id
                                        data.save().catch(err => console.log(err))
                                        let changed = new MessageEmbed()
                                                .setTitle(`Successfully Created!`)
                                                .setDescription(`Bot Has Turned The \`Member\` Counter to The Channel ${sec2} (ID: \`${sec2.id}\`)`)
                                                .setColor('GOLD')
                                                .setTimestamp()
                                        return message.channel.send(changed)
                                }

                            })
                            if(!data.channels) mess = 'none'
                            else if (data.channels) mess = data.channels
                            let info = new MessageEmbed()
                                .setColor("#2EC5F9")
                                .setTitle(`Information!`)
                                .setDescription(`Current \`Channels\` Counter Channel : <#${mess}> (ID: ${mess})\nWhich channel do you want to change it to **(don't use the channel name, use the ID or mention it with #channelname)?**. `)
                            message.channel.send(info)
                        } else if(collected.array()[0].content == 'text') {
                            let filter = (message) => !message.author.bot;
                            let options = {
                            max: 1,
                            time: 20000
                            };
                            let collector = message.channel.createMessageCollector(filter, options);

                            collector.on('collect', async (m) => {
                                if(m.content == 'cancel'){
                                    collector.stop()
                                    await message.channel.send(no)
                                }
                            });
                            collector.on('end', async (collected, reason) => {
                                if (reason === 'time') {
                                    return message.channel.send(timeup);
                                } else if(!collected.array()[0].content){
                                    return;
                                } else if (collected.array()[0].content){
                                        function getchannelFromMention(mention) {
                                            const matches = mention.match(/^<#?(\d+)>$/);
                                            if (!matches) return;
                                            const id = matches[1];
                                            return id
                                        }
                                        let casa = getchannelFromMention(collected.array()[0].content)
                                        if(!casa){
                                            channelid = collected.array()[0].content
                                        } else if (casa){
                                            channelid = casa
                                        }
                                        let sec2 = message.guild.channels.cache.find(channel => channel.id === channelid);
                                        if(!sec2) return message.channel.send(warn)
                                        if(data.members == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.all == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.bots == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.channels == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.text == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Can't Set The Same Channel!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.voice == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.categories == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        } 
                                        if(data.announcement == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.roles == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.role == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.emojis == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.static == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.animated == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.boosts == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.tier == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        data.text = sec2.id
                                        data.save().catch(err => console.log(err))
                                        let changed = new MessageEmbed()
                                        .setTitle(`Successfully Created!`)
                                        .setDescription(`Bot Has Turned The \`Text\` Counter to The Channel ${sec2} (ID: \`${sec2.id}\`)`)
                                        .setColor('GOLD')
                                        .setTimestamp()
                                return message.channel.send(changed)
                                }

                            })
                            if(!data.text) mess = 'none'
                            else if (data.text) mess = data.text
                            let info = new MessageEmbed()
                                .setColor("#2EC5F9")
                                .setTitle(`Information!`)
                                .setDescription(`Current \`Text\` Channel : <#${mess}> (ID: ${mess})\nWhich channel do you want to change it to **(don't use the channel name, use the ID or mention it with #channelname)?**. `)
                            message.channel.send(info)
                        } else if(collected.array()[0].content == 'voice') {
                            let filter = (message) => !message.author.bot;
                            let options = {
                            max: 1,
                            time: 20000
                            };
                            let collector = message.channel.createMessageCollector(filter, options);

                            collector.on('collect', async (m) => {
                                if(m.content == 'cancel'){
                                    collector.stop()
                                    await message.channel.send(no)
                                }
                            });
                            collector.on('end', async (collected, reason) => {
                                if (reason === 'time') {
                                    return message.channel.send(timeup);
                                } else if(!collected.array()[0].content){
                                    return;
                                } else if (collected.array()[0].content){
                                        function getchannelFromMention(mention) {
                                            const matches = mention.match(/^<#?(\d+)>$/);
                                            if (!matches) return;
                                            const id = matches[1];
                                            return id
                                        }
                                        let casa = getchannelFromMention(collected.array()[0].content)
                                        if(!casa){
                                            channelid = collected.array()[0].content
                                        } else if (casa){
                                            channelid = casa
                                        }
                                        let sec2 = message.guild.channels.cache.find(channel => channel.id === channelid);
                                        if(!sec2) return message.channel.send(warn)
                                        if(data.members == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.all == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.bots == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.channels == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.text == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.voice == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Can't Set The Same Channel!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.categories == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        } 
                                        if(data.announcement == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.roles == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.role == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.emojis == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.static == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.animated == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.boosts == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.tier == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        data.voice = sec2.id
                                        data.save().catch(err => console.log(err))
                                        let changed = new MessageEmbed()
                                        .setTitle(`Successfully Created!`)
                                        .setDescription(`Bot Has Turned The \`Voice\` Counter to The Channel ${sec2} (ID: \`${sec2.id}\`)`)
                                        .setColor('GOLD')
                                        .setTimestamp()
                                return message.channel.send(changed)
                                }

                            })
                            if(!data.voice) mess = 'none'
                            else if (data.voice) mess = data.voice
                            let info = new MessageEmbed()
                                .setColor("#2EC5F9")
                                .setTitle(`Information!`)
                                .setDescription(`Current \`Voice\` Channel : <#${mess}> (ID: ${mess})\nWhich channel do you want to change it to **(don't use the channel name, use the ID or mention it with #channelname)?**. `)
                            message.channel.send(info)
                        } else if(collected.array()[0].content == 'categories') {
                            let filter = (message) => !message.author.bot;
                            let options = {
                            max: 1,
                            time: 20000
                            };
                            let collector = message.channel.createMessageCollector(filter, options);

                            collector.on('collect', async (m) => {
                                if(m.content == 'cancel'){
                                    collector.stop()
                                    await message.channel.send(no)
                                }
                            });
                            collector.on('end', async (collected, reason) => {
                                if (reason === 'time') {
                                    return message.channel.send(timeup);
                                } else if(!collected.array()[0].content){
                                    return;
                                } else if (collected.array()[0].content){
                                        function getchannelFromMention(mention) {
                                            const matches = mention.match(/^<#?(\d+)>$/);
                                            if (!matches) return;
                                            const id = matches[1];
                                            return id
                                        }
                                        let casa = getchannelFromMention(collected.array()[0].content)
                                        if(!casa){
                                            channelid = collected.array()[0].content
                                        } else if (casa){
                                            channelid = casa
                                        }
                                        let sec2 = message.guild.channels.cache.find(channel => channel.id === channelid);
                                        if(!sec2) return message.channel.send(warn)
                                        if(data.members == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.all == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.bots == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.channels == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.text == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.voice == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.categories == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Can't Set The Same Channel!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        } 
                                        if(data.announcement == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.roles == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.role == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.emojis == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.static == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.animated == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.boosts == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.tier == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        data.categories = sec2.id
                                        data.save().catch(err => console.log(err))
                                        let changed = new MessageEmbed()
                                        .setTitle(`Successfully Created!`)
                                        .setDescription(`Bot Has Turned The \`Categories\` Counter to The Channel ${sec2} (ID: \`${sec2.id}\`)`)
                                        .setColor('GOLD')
                                        .setTimestamp()
                                return message.channel.send(changed)
                                }

                            })
                            if(!data.categories) mess = 'none'
                            else if (data.categories) mess = data.categories
                            let info = new MessageEmbed()
                                .setColor("#2EC5F9")
                                .setTitle(`Information!`)
                                .setDescription(`Current \`Categories\` Channel : <#${mess}> (ID: ${mess})\nWhich channel do you want to change it to **(don't use the channel name, use the ID or mention it with #channelname)?**. `)
                            message.channel.send(info)
                        } else if(collected.array()[0].content == 'announcement') {
                            let filter = (message) => !message.author.bot;
                            let options = {
                            max: 1,
                            time: 20000
                            };
                            let collector = message.channel.createMessageCollector(filter, options);

                            collector.on('collect', async (m) => {
                                if(m.content == 'cancel'){
                                    collector.stop()
                                    await message.channel.send(no)
                                }
                            });
                            collector.on('end', async (collected, reason) => {
                                if (reason === 'time') {
                                    return message.channel.send(timeup);
                                } else if(!collected.array()[0].content){
                                    return;
                                } else if (collected.array()[0].content){
                                        function getchannelFromMention(mention) {
                                            const matches = mention.match(/^<#?(\d+)>$/);
                                            if (!matches) return;
                                            const id = matches[1];
                                            return id
                                        }
                                        let casa = getchannelFromMention(collected.array()[0].content)
                                        if(!casa){
                                            channelid = collected.array()[0].content
                                        } else if (casa){
                                            channelid = casa
                                        }
                                        let sec2 = message.guild.channels.cache.find(channel => channel.id === channelid);
                                        if(!sec2) return message.channel.send(warn)
                                        if(data.members == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.all == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.bots == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.channels == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.text == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.voice == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.categories == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        } 
                                        if(data.announcement == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Can't Set The Same Channel!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.roles == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.role == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.emojis == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.static == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.animated == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.boosts == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.tier == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        data.announcement = sec2.id
                                        data.save().catch(err => console.log(err))
                                        let changed = new MessageEmbed()
                                        .setTitle(`Successfully Created!`)
                                        .setDescription(`Bot Has Turned The \`Announcement\` Counter to The Channel ${sec2} (ID: \`${sec2.id}\`)`)
                                        .setColor('GOLD')
                                        .setTimestamp()
                                return message.channel.send(changed)
                                }

                            })
                            if(!data.announcement) mess = 'none'
                            else if (data.announcement) mess = data.announcement
                            let info = new MessageEmbed()
                                .setColor("#2EC5F9")
                                .setTitle(`Information!`)
                                .setDescription(`Current \`Announcement\` Channel : <#${mess}> (ID: ${mess})\nWhich channel do you want to change it to **(don't use the channel name, use the ID or mention it with #channelname)?**. `)
                            message.channel.send(info)
                        } else if(collected.array()[0].content == 'roles') {
                            let filter = (message) => !message.author.bot;
                            let options = {
                            max: 1,
                            time: 20000
                            };
                            let collector = message.channel.createMessageCollector(filter, options);

                            collector.on('collect', async (m) => {
                                if(m.content == 'cancel'){
                                    collector.stop()
                                    await message.channel.send(no)
                                }
                            });
                            collector.on('end', async (collected, reason) => {
                                if (reason === 'time') {
                                    return message.channel.send(timeup);
                                } else if(!collected.array()[0].content){
                                    return;
                                } else if (collected.array()[0].content){
                                        function getchannelFromMention(mention) {
                                            const matches = mention.match(/^<#?(\d+)>$/);
                                            if (!matches) return;
                                            const id = matches[1];
                                            return id
                                        }
                                        let casa = getchannelFromMention(collected.array()[0].content)
                                        if(!casa){
                                            channelid = collected.array()[0].content
                                        } else if (casa){
                                            channelid = casa
                                        }
                                        let sec2 = message.guild.channels.cache.find(channel => channel.id === channelid);
                                        if(!sec2) return message.channel.send(warn)
                                        if(data.members == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.all == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.bots == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.channels == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.text == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.voice == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.categories == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        } 
                                        if(data.announcement == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.roles == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Can't Set The Same Channel!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.role == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.emojis == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.static == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.animated == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.boosts == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.tier == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        data.roles = sec2.id
                                        data.save().catch(err => console.log(err))
                                        let changed = new MessageEmbed()
                                        .setTitle(`Successfully Created!`)
                                        .setDescription(`Bot Has Turned The \`Roles\` Counter to The Channel ${sec2} (ID: \`${sec2.id}\`)`)
                                        .setColor('GOLD')
                                        .setTimestamp()
                                return message.channel.send(changed)
                                }

                            })
                            if(!data.roles) mess = 'none'
                            else if (data.roles) mess = data.roles
                            let info = new MessageEmbed()
                                .setColor("#2EC5F9")
                                .setTitle(`Information!`)
                                .setDescription(`Current \`Roles\` Channel : <#${mess}> (ID: ${mess})\nWhich channel do you want to change it to **(don't use the channel name, use the ID or mention it with #channelname)?**. `)
                            message.channel.send(info)
                        } else if(collected.array()[0].content == 'role') {
                            let filter = (message) => !message.author.bot;
                            let options = {
                            max: 1,
                            time: 20000
                            };
                            let collector = message.channel.createMessageCollector(filter, options);

                            collector.on('collect', async (m) => {
                                if(m.content == 'cancel'){
                                    collector.stop()
                                    await message.channel.send(no)
                                }
                            });
                            collector.on('end', async (collected, reason) => {
                                if (reason === 'time') {
                                    return message.channel.send(timeup);
                                } else if(!collected.array()[0].content){
                                    return;
                                } else if (collected.array()[0].content){
                                    function getchannelFromMention(mention) {
                                        const matches = mention.match(/^<#?(\d+)>$/);
                                        if (!matches) return;
                                        const id = matches[1];
                                        return id
                                    }
                                    let casa = getchannelFromMention(collected.array()[0].content)
                                    if(!casa){
                                        channelid = collected.array()[0].content
                                    } else if (casa){
                                        channelid = casa
                                    }
                                    const sec4 = message.guild.channels.cache.find(channel => channel.id === channelid);
                                    if(!sec4) return message.channel.send(warn)
                                    if(data.members == sec4.id) {
                                        let emb = new MessageEmbed()
                                            .setTitle(':warning: Warning Alert! :warning:')
                                            .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                            .setColor(`GOLD`)
                                        return message.channel.send(emb)
                                    }
                                    if(data.all == sec4.id) {
                                        let emb = new MessageEmbed()
                                            .setTitle(':warning: Warning Alert! :warning:')
                                            .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                            .setColor(`GOLD`)
                                        return message.channel.send(emb)
                                    }
                                    if(data.bots == sec4.id) {
                                        let emb = new MessageEmbed()
                                            .setTitle(':warning: Warning Alert! :warning:')
                                            .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                            .setColor(`GOLD`)
                                        return message.channel.send(emb)
                                    }
                                    if(data.channels == sec4.id) {
                                        let emb = new MessageEmbed()
                                            .setTitle(':warning: Warning Alert! :warning:')
                                            .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                            .setColor(`GOLD`)
                                        return message.channel.send(emb) 
                                    }
                                    if(data.text == sec4.id) {
                                        let emb = new MessageEmbed()
                                            .setTitle(':warning: Warning Alert! :warning:')
                                            .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                            .setColor(`GOLD`)
                                        return message.channel.send(emb) 
                                    } 
                                    if(data.voice == sec4.id) {
                                        let emb = new MessageEmbed()
                                            .setTitle(':warning: Warning Alert! :warning:')
                                            .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                            .setColor(`GOLD`)
                                        return message.channel.send(emb)
                                    }
                                    if(data.categories == sec4.id) {
                                        let emb = new MessageEmbed()
                                            .setTitle(':warning: Warning Alert! :warning:')
                                            .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                            .setColor(`GOLD`)
                                        return message.channel.send(emb)
                                    } 
                                    if(data.announcement == sec4.id) {
                                        let emb = new MessageEmbed()
                                            .setTitle(':warning: Warning Alert! :warning:')
                                            .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                            .setColor(`GOLD`)
                                        return message.channel.send(emb) 
                                    } 
                                    if(data.roles == sec4.id) {
                                        let emb = new MessageEmbed()
                                            .setTitle(':warning: Warning Alert! :warning:')
                                            .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                            .setColor(`GOLD`)
                                        return message.channel.send(emb) 
                                    } 
                                    if(data.role == sec4.id) {
                                        let emb = new MessageEmbed()
                                            .setTitle(':warning: Warning Alert! :warning:')
                                            .setDescription(`Can't Set The Same Channel!, **Please Try Again!**`)
                                            .setColor(`GOLD`)
                                        return message.channel.send(emb) 
                                    }
                                    if(data.emojis == sec4.id) {
                                        let emb = new MessageEmbed()
                                            .setTitle(':warning: Warning Alert! :warning:')
                                            .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                            .setColor(`GOLD`)
                                        return message.channel.send(emb) 
                                    }
                                    if(data.static == sec4.id) {
                                        let emb = new MessageEmbed()
                                            .setTitle(':warning: Warning Alert! :warning:')
                                            .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                            .setColor(`GOLD`)
                                        return message.channel.send(emb) 
                                    }
                                    if(data.animated == sec4.id) {
                                        let emb = new MessageEmbed()
                                            .setTitle(':warning: Warning Alert! :warning:')
                                            .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                            .setColor(`GOLD`)
                                        return message.channel.send(emb) 
                                    } 
                                    if(data.boosts == sec4.id) {
                                        let emb = new MessageEmbed()
                                            .setTitle(':warning: Warning Alert! :warning:')
                                            .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                            .setColor(`GOLD`)
                                        return message.channel.send(emb) 
                                    }
                                    if(data.tier == sec4.id) {
                                        let emb = new MessageEmbed()
                                            .setTitle(':warning: Warning Alert! :warning:')
                                            .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                            .setColor(`GOLD`)
                                        return message.channel.send(emb) 
                                    }
                                    if(sec4){
                                        let filter = (message) => !message.author.bot;
                                        let options = {
                                        max: 1,
                                        time: 15000
                                        };
                                        let collector = message.channel.createMessageCollector(filter, options);
                        
                                        collector.on('collect', async (m) => {
                                            if(m.content == 'cancel'){
                                                collector.stop()
                                                await message.channel.send(no)
                                                
                                            }
                                        });
                        
                                        collector.on('end', async (collected, reason) => {
                                            if (reason === 'time') {
                                                return message.channel.send(timeup);
                                            } else if(!collected.array()[0].content){
                                                return;
                                            } else if (collected.array()[0].content){
                                                function getroleFromMention(mention) {
                                                    const matches = mention.match(/^<@&?(\d+)>$/);
                                                    if (!matches) return;
                                                    const id = matches[1];
                                                    return id
                                                }
                                                let casa1 = getroleFromMention(collected.array()[0].content)
                                                if(!casa1){
                                                   roles1 = collected.array()[0].content
                                                } else if (casa1){
                                                    roles1 = casa1
                                                }
                                                const sec3 = message.guild.roles.cache.find(role => role.id === roles1);
                                                let warn2 = new MessageEmbed()
                                                    .setTitle(`:warning: Warning Alert! :warning:`)
                                                    .setDescription(`You Must ping or mention that role with @rolename (or) by ID`)
                                                    .setColor('GOLD')
                                                    .setTimestamp()
                                                if(!sec3) return message.channel.send(warn2)
                                                if(sec3){
                                                        data.roleid = sec3.id
                                                        data.role = sec4.id
                                                        await data.save().catch(err => console.log(err))
                                                let changed = new MessageEmbed()
                                                        .setTitle(`Successfully Created!`)
                                                        .setDescription(`Bot Has Turned The \`Role\` Counter to The Channel ${sec4} (ID: \`${sec4.id}\`)`)
                                                        .setColor('#62FC1A')
                                                        .setTimestamp()
                                                return message.channel.send(changed)
                                                }
                                            }
                                        })
                                        let roleem = new MessageEmbed()
                                            .setTitle(`Which Role do you want to change in role counter?`)
                                            .setDescription(`You Must ping or mention that role with @rolename (or) by ID`)
                                            .setColor('#2EC5F9')
                                            .setTimestamp()
                                        message.channel.send(roleem)
                                    }
                                }

                            })
                            if(!data.role) mess = 'none'
                            else if (data.role) mess = data.role
                            let info = new MessageEmbed()
                                .setColor("#2EC5F9")
                                .setTitle(`Information!`)
                                .setDescription(`Current \`Role\` Channel : <#${mess}> (ID: ${mess})\nWhich channel do you want to change it to **(don't use the channel name, use the ID or mention it with #channelname)?**. `)
                            message.channel.send(info)
                        } else if(collected.array()[0].content == 'emojis') {
                            let filter = (message) => !message.author.bot;
                            let options = {
                            max: 1,
                            time: 20000
                            };
                            let collector = message.channel.createMessageCollector(filter, options);

                            collector.on('collect', async (m) => {
                                if(m.content == 'cancel'){
                                    collector.stop()
                                    await message.channel.send(no)
                                }
                            });
                            collector.on('end', async (collected, reason) => {
                                if (reason === 'time') {
                                    return message.channel.send(timeup);
                                } else if(!collected.array()[0].content){
                                    return;
                                } else if (collected.array()[0].content){
                                        function getchannelFromMention(mention) {
                                            const matches = mention.match(/^<#?(\d+)>$/);
                                            if (!matches) return;
                                            const id = matches[1];
                                            return id
                                        }
                                        let casa = getchannelFromMention(collected.array()[0].content)
                                        if(!casa){
                                            channelid = collected.array()[0].content
                                        } else if (casa){
                                            channelid = casa
                                        }
                                        let sec2 = message.guild.channels.cache.find(channel => channel.id === channelid);
                                        if(!sec2) return message.channel.send(warn)
                                        if(data.members == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.all == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.bots == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.channels == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.text == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.voice == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.categories == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        } 
                                        if(data.announcement == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.roles == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.role == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.emojis == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Can't Set The Same Channel!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.static == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.animated == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.boosts == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.tier == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        data.emojis = sec2.id
                                        data.save().catch(err => console.log(err))
                                    let changed = new MessageEmbed()
                                        .setTitle(`Successfully Created!`)
                                        .setDescription(`Bot Has Turned The \`Emojis\` Counter to The Channel ${sec2} (ID: \`${sec2.id}\`)`)
                                        .setColor('#62FC1A')
                                        .setTimestamp()
                                    return message.channel.send(changed)
                                }

                            })
                            if(!data.emojis) mess = 'none'
                            else if (data.emojis) mess = data.emojis
                            let info = new MessageEmbed()
                                .setColor("#2EC5F9")
                                .setTitle(`Information!`)
                                .setDescription(`Current \`Emojis\` Channel : <#${mess}> (ID: ${mess})\nWhich channel do you want to change it to **(don't use the channel name, use the ID or mention it with #channelname)?**. `)
                            message.channel.send(info)
                        } else if(collected.array()[0].content == 'static') {
                            let filter = (message) => !message.author.bot;
                            let options = {
                            max: 1,
                            time: 20000
                            };
                            let collector = message.channel.createMessageCollector(filter, options);

                            collector.on('collect', async (m) => {
                                if(m.content == 'cancel'){
                                    collector.stop()
                                    await message.channel.send(no)
                                }
                            });
                            collector.on('end', async (collected, reason) => {
                                if (reason === 'time') {
                                    return message.channel.send(timeup);
                                } else if(!collected.array()[0].content){
                                    return;
                                } else if (collected.array()[0].content){
                                        function getchannelFromMention(mention) {
                                            const matches = mention.match(/^<#?(\d+)>$/);
                                            if (!matches) return;
                                            const id = matches[1];
                                            return id
                                        }
                                        let casa = getchannelFromMention(collected.array()[0].content)
                                        if(!casa){
                                            channelid = collected.array()[0].content
                                        } else if (casa){
                                            channelid = casa
                                        }
                                        let sec2 = message.guild.channels.cache.find(channel => channel.id === channelid);
                                        if(!sec2) return message.channel.send(warn)
                                        if(data.members == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.all == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.bots == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.channels == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.text == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.voice == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.categories == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        } 
                                        if(data.announcement == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.roles == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.role == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.emojis == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.static == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Can't Set The Same Channel!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.animated == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.boosts == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.tier == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        data.static = sec2.id
                                        data.save().catch(err => console.log(err))
                                    let changed = new MessageEmbed()
                                        .setTitle(`Successfully Created!`)
                                        .setDescription(`Bot Has Turned The \`Static\` Counter to The Channel ${sec2} (ID: \`${sec2.id}\`)`)
                                        .setColor('#62FC1A')
                                        .setTimestamp()
                                    return message.channel.send(changed)
                                }

                            })
                            if(!data.static) mess = 'none'
                            else if (data.static) mess = data.static
                            let info = new MessageEmbed()
                                .setColor("#2EC5F9")
                                .setTitle(`Information!`)
                                .setDescription(`Current \`Static\` Channel : <#${mess}> (ID: ${mess})\nWhich channel do you want to change it to **(don't use the channel name, use the ID or mention it with #channelname)?**. `)
                            message.channel.send(info)
                        } else if(collected.array()[0].content == 'animated') {
                            let filter = (message) => !message.author.bot;
                            let options = {
                            max: 1,
                            time: 20000
                            };
                            let collector = message.channel.createMessageCollector(filter, options);

                            collector.on('collect', async (m) => {
                                if(m.content == 'cancel'){
                                    collector.stop()
                                    await message.channel.send(no)
                                }
                            });
                            collector.on('end', async (collected, reason) => {
                                if (reason === 'time') {
                                    return message.channel.send(timeup);
                                } else if(!collected.array()[0].content){
                                    return;
                                } else if (collected.array()[0].content){
                                        function getchannelFromMention(mention) {
                                            const matches = mention.match(/^<#?(\d+)>$/);
                                            if (!matches) return;
                                            const id = matches[1];
                                            return id
                                        }
                                        let casa = getchannelFromMention(collected.array()[0].content)
                                        if(!casa){
                                            channelid = collected.array()[0].content
                                        } else if (casa){
                                            channelid = casa
                                        }
                                        let sec2 = message.guild.channels.cache.find(channel => channel.id === channelid);
                                        if(!sec2) return message.channel.send(warn)
                                        if(data.members == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.all == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.bots == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.channels == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.text == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.voice == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.categories == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        } 
                                        if(data.announcement == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.roles == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.role == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.emojis == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.static == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.animated == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Can't Set The Same Channel!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.boosts == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.tier == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        data.animated = sec2.id
                                        data.save().catch(err => console.log(err))
                                        let changed = new MessageEmbed()
                                            .setTitle(`Successfully Created!`)
                                            .setDescription(`Bot Has Turned The \`Animated\` Counter to The Channel ${sec2} (ID: \`${sec2.id}\`)`)
                                            .setColor('#62FC1A')
                                            .setTimestamp()
                                        return message.channel.send(changed)
                                }

                            })
                            if(!data.animated) mess = 'none'
                            else if (data.animated) mess = data.animated
                            let info = new MessageEmbed()
                                .setColor("#2EC5F9")
                                .setTitle(`Information!`)
                                .setDescription(`Current \`Animated\` Channel : <#${mess}> (ID: ${mess})\nWhich channel do you want to change it to **(don't use the channel name, use the ID or mention it with #channelname)?**. `)
                            message.channel.send(info)
                        } else if(collected.array()[0].content == 'boosts') {
                            let filter = (message) => !message.author.bot;
                            let options = {
                            max: 1,
                            time: 20000
                            };
                            let collector = message.channel.createMessageCollector(filter, options);

                            collector.on('collect', async (m) => {
                                if(m.content == 'cancel'){
                                    collector.stop()
                                    await message.channel.send(no)
                                }
                            });
                            collector.on('end', async (collected, reason) => {
                                if (reason === 'time') {
                                    return message.channel.send(timeup);
                                } else if(!collected.array()[0].content){
                                    return;
                                } else if (collected.array()[0].content){
                                        function getchannelFromMention(mention) {
                                            const matches = mention.match(/^<#?(\d+)>$/);
                                            if (!matches) return;
                                            const id = matches[1];
                                            return id
                                        }
                                        let casa = getchannelFromMention(collected.array()[0].content)
                                        if(!casa){
                                            channelid = collected.array()[0].content
                                        } else if (casa){
                                            channelid = casa
                                        }
                                        let sec2 = message.guild.channels.cache.find(channel => channel.id === channelid);
                                        if(!sec2) return message.channel.send(warn)
                                        if(data.members == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.all == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.bots == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.channels == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.text == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.voice == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.categories == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        } 
                                        if(data.announcement == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.roles == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.role == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.emojis == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.static == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.animated == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.boosts == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Can't Set The Same Channel!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.tier == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        data.boosts = sec2.id
                                        data.save().catch(err => console.log(err))
                                        let changed = new MessageEmbed()
                                            .setTitle(`Successfully Created!`)
                                            .setDescription(`Bot Has Turned The \`Boosts\` Counter to The Channel ${sec2} (ID: \`${sec2.id}\`)`)
                                            .setColor('#62FC1A')
                                            .setTimestamp()
                                        return message.channel.send(changed)
                                }

                            })
                            if(!data.boosts) mess = 'none'
                            else if (data.boosts) mess = data.boosts
                            let info = new MessageEmbed()
                                .setColor("#2EC5F9")
                                .setTitle(`Information!`)
                                .setDescription(`Current \`Boosts\` Channel : <#${mess}> (ID: ${mess})\nWhich channel do you want to change it to **(don't use the channel name, use the ID or mention it with #channelname)?**. `)
                            message.channel.send(info)
                        } else if(collected.array()[0].content == 'tier') {
                            let filter = (message) => !message.author.bot;
                            let options = {
                            max: 1,
                            time: 20000
                            };
                            let collector = message.channel.createMessageCollector(filter, options);

                            collector.on('collect', async (m) => {
                                if(m.content == 'cancel'){
                                    collector.stop()
                                    await message.channel.send(no)
                                }
                            });
                            collector.on('end', async (collected, reason) => {
                                if (reason === 'time') {
                                    return message.channel.send(timeup);
                                } else if(!collected.array()[0].content){
                                    return;
                                } else if (collected.array()[0].content){
                                        function getchannelFromMention(mention) {
                                            const matches = mention.match(/^<#?(\d+)>$/);
                                            if (!matches) return;
                                            const id = matches[1];
                                            return id
                                        }
                                        let casa = getchannelFromMention(collected.array()[0].content)
                                        if(!casa){
                                            channelid = collected.array()[0].content
                                        } else if (casa){
                                            channelid = casa
                                        }
                                        let sec2 = message.guild.channels.cache.find(channel => channel.id === channelid);
                                        if(!sec2) return message.channel.send(warn)
                                        if(data.members == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.all == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.bots == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.channels == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.text == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.voice == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        }
                                        if(data.categories == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb)
                                        } 
                                        if(data.announcement == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.roles == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.role == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.emojis == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.static == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.animated == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        } 
                                        if(data.boosts == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Channel Is Already A Counter of ${sec2.name}!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        if(data.tier == sec2.id) {
                                            let emb = new MessageEmbed()
                                                .setTitle(':warning: Warning Alert! :warning:')
                                                .setDescription(`Can't Set The Same Channel!, **Please Try Again!**`)
                                                .setColor(`GOLD`)
                                            return message.channel.send(emb) 
                                        }
                                        data.tier = sec2.id
                                        data.save().catch(err => console.log(err))
                                        let changed = new MessageEmbed()
                                            .setTitle(`Successfully Created!`)
                                            .setDescription(`Bot Has Turned The \`Tier\` Counter to The Channel ${sec2} (ID: \`${sec2.id}\`)`)
                                            .setColor('#62FC1A')
                                            .setTimestamp()
                                        return message.channel.send(changed)
                                }

                            })
                            if(!data.tier) mess = 'none'
                            else if (data.tier) mess = data.tier
                            let info = new MessageEmbed()
                                .setColor("#2EC5F9")
                                .setTitle(`Information!`)
                                .setDescription(`Current \`Tier\` Channel : <#${mess}> (ID: ${mess})\nWhich channel do you want to change it to **(don't use the channel name, use the ID or mention it with #channelname)?**. `)
                            message.channel.send(info)
                        } else {
                            return message.channel.send(wrong)
                        }
                    }
                })
                message.channel.send(pictypeembed)
        } else if (data.setups == false){
            let falseanm = new MessageEmbed()
                .setColor('GOLD')
                .setDescription(`Your Server Setup Is Not Yet Done For Setup You Need to Type **\`+setup\`**`)
                .setTitle(`:warning: Warning Alert! :warning:`)
            return message.channel.send(falseanm)
        }
    } else {
        let wrong1 = new MessageEmbed()
            .setTitle(`:warning: Warning Alert! :warning:`)
            .setDescription(`<a:LIVE:805007031823892480> You Typed Wrong word or it doesn't exits in my stat counter. **Please Try Again!**\n\`${data.Prefix}counter\` : to view all existing counter types`)
            .setColor(`GOLD`)
        return message.channel.send(wrong1)
    }
    
}

exports.help = {
    name: "counter",
  }
  
  exports.conf = {
    aliases: [],
    cooldown: 10
  }
  