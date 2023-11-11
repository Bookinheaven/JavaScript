const setuping = require('../../models/onlyguild')
const { MessageEmbed } = require('discord.js')
exports.run = async (client, message) => {
    const data = await setuping.findOne({
        GuildID: message.guild.id
    })
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS") || !message.guild.me.hasPermission("MANAGE_GUILD") || !message.guild.me.hasPermission("VIEW_CHANNEL")) {
        let mea = new MessageEmbed()
            .setTitle(`I Dont' Have Permission To Reset Counters!`)
            .setDescription(`Kindly Check That I Have **Administrator** Or **Manage Channel** or **Manage Guild**`)
            .setColor('GOLD')
        return message.channel.send(mea);
      }
    if (!message.member.permissions.any(["ADMINISTRATOR", "MANAGE_GUILD", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_ROLES"])) {
        let noperauthor = new MessageEmbed()
        .setTitle(`${message.author.username} You Dont' Have Permission To Reset Counters!`)
        .setDescription(`Kindly Check That You Have **Administrator** Or **Manage Channel** or **Manage Guild**`)
        .setColor('GOLD')
    return message.channel.send(noperauthor);
    }
    let no = new MessageEmbed()
        .setTitle(`Process Status of **Stat Counter Reset**!`)
        .setDescription(`:x: Process Has Been Canceled!`)
        .setColor('RED')
    let timeup = new MessageEmbed()
        .setTitle(`Process Status of **Stat Counter Reset**!`)
        .setDescription(`⏰ Process Has Been Canceled! Because You Didn't Respond in Time!.`)
        .setColor('RED')
     if (data.setups == false) {
        let warning = new MessageEmbed()
            .setTitle(`:warning: Warning Alert! :warning:`)
            .setDescription(`Your Server Didn't Setup the Stats!, For Setup Type \`${data.Prefix}setup\``)
            .setColor('RED')
         message.channel.send(warning)
     } else if(data.setups === true){
        let filter = (message) => !message.author.bot;

        let options = {
          max: 1,
          time: 15000
        };
        let collector = message.channel.createMessageCollector(filter, options);

        collector.on('collect', (m) => {
            if(m.content == 'cancel'){
                collector.stop()
                return message.channel.send(no)
            }
        });
        collector.on('end', async (collected, reason) => {
            if (reason === 'time') {
                return message.channel.send(timeup);
            } else if(!collected.array()[0].content){
                return;
            }
            else if(collected.array()[0].content == 'yes'){
                let waitting = new MessageEmbed()
                .setColor('GOLD')
                .setTitle('🔄 Reset Has Been Started!')
                .setDescription('This will take couple of seconds to finish, so please wait a moment. ⏰')
                message.channel.send(waitting)
                if(data.category){
                    let deletechannel = message.guild.channels.cache.get(data.category);
                    if(!deletechannel || deletechannel === undefined){
                    }
                    else if (deletechannel){
                        if(deletechannel){
                           await deletechannel.delete().catch(err => { 
                               if(err.method == 'delete'){
                                   let erremb = new MessageEmbed().setColor('GOLD').setDescription(`Error of Category ${deletechannel.name} : Check That I Don't Have Permission [**Manage Guild** (or) **Administrator** (or) **Manage Channel**]`).setTitle(':warning: Warning Alert :warning:')
                                    message.channel.send(erremb)
                               }
                            });   
                           }
                        data.category = undefined
                    }
                }
                if(data.all){
                    let deletechannel = message.guild.channels.cache.get(data.all);
                    if(!deletechannel || deletechannel === undefined){
                    }
                    else if (deletechannel){
                        if(deletechannel){
                           await deletechannel.delete().catch(err => { 
                            if(err.method == 'delete'){
                                let erremb = new MessageEmbed().setColor('GOLD').setDescription(`Error of All Members Stats Channel ${deletechannel.name} : Check That I Don't Have Permission [**Manage Guild** (or) **Administrator** (or) **Manage Channel**]`).setTitle(':warning: Warning Alert :warning:')
                                 message.channel.send(erremb)
                            }
                         });   
                           }
                        data.all = undefined
                    }
                }
                if(data.members){
                    let deletechannel = message.guild.channels.cache.get(data.members);
                    if(!deletechannel || deletechannel === undefined){
                    }
                    else if (deletechannel){
                        if(deletechannel){
                           await deletechannel.delete().catch(err => { 
                            if(err.method == 'delete'){
                                let erremb = new MessageEmbed().setColor('GOLD').setDescription(`Error of Members Stats Channel ${deletechannel.name} : Check That I Don't Have Permission [**Manage Guild** (or) **Administrator** (or) **Manage Channel**]`).setTitle(':warning: Warning Alert :warning:')
                                 message.channel.send(erremb)
                            }
                         });      
                           }
                        data.members = undefined
                    }
                }
                if(data.bots){
                    let deletechannel = message.guild.channels.cache.get(data.bots);
                    if(!deletechannel || deletechannel === undefined){
                    }
                    else if (deletechannel){
                        if(deletechannel){
                           await deletechannel.delete().catch(err => { 
                            if(err.method == 'delete'){
                                let erremb = new MessageEmbed().setColor('GOLD').setDescription(`Error of Bots Stats Channel ${deletechannel.name} : Check That I Don't Have Permission [**Manage Guild** (or) **Administrator** (or) **Manage Channel**]`).setTitle(':warning: Warning Alert :warning:')
                                 message.channel.send(erremb)
                            }
                         });      
                           }
                        data.bots = undefined
                    }
                }
                if(data.channels){
                    let deletechannel = message.guild.channels.cache.get(data.channels);
                    if(!deletechannel || deletechannel === undefined){
                    }
                    else if (deletechannel){
                        if(deletechannel){
                           await deletechannel.delete().catch(err => { 
                            if(err.method == 'delete'){
                                let erremb = new MessageEmbed().setColor('GOLD').setDescription(`Error of Channels Stats Channel ${deletechannel.name} : Check That I Don't Have Permission [**Manage Guild** (or) **Administrator** (or) **Manage Channel**]`).setTitle(':warning: Warning Alert :warning:')
                                 message.channel.send(erremb)
                            }
                         });      
                           }
                        data.channels = undefined
                    }
                }
                if(data.text){
                    let deletechannel = message.guild.channels.cache.get(data.text);
                    if(!deletechannel || deletechannel === undefined){
                    }
                    else if (deletechannel){
                        if(deletechannel){
                           await deletechannel.delete().catch(err => { 
                            if(err.method == 'delete'){
                                let erremb = new MessageEmbed().setColor('GOLD').setDescription(`Error of Text Stats Channel ${deletechannel.name} : Check That I Don't Have Permission [**Manage Guild** (or) **Administrator** (or) **Manage Channel**]`).setTitle(':warning: Warning Alert :warning:')
                                 message.channel.send(erremb)
                            }
                         });     
                           }
                        data.text = undefined
                    }
                }
                if(data.voice){
                    let deletechannel = message.guild.channels.cache.get(data.voice);
                    if(!deletechannel || deletechannel === undefined){
                    }
                    else if (deletechannel){
                        if(deletechannel){
                           await deletechannel.delete().catch(err => { 
                            if(err.method == 'delete'){
                                let erremb = new MessageEmbed().setColor('GOLD').setDescription(`Error of Voice Stats Channel ${deletechannel.name} : Check That I Don't Have Permission [**Manage Guild** (or) **Administrator** (or) **Manage Channel**]`).setTitle(':warning: Warning Alert :warning:')
                                 message.channel.send(erremb)
                            }
                         });     
                           }
                        data.voice = undefined
                    }
                }
                if(data.categories){
                    let deletechannel = message.guild.channels.cache.get(data.categories);
                    if(!deletechannel || deletechannel === undefined){
                    }
                    else if (deletechannel){
                        if(deletechannel){
                           await deletechannel.delete().catch(err => { 
                            if(err.method == 'delete'){
                                let erremb = new MessageEmbed().setColor('GOLD').setDescription(`Error of Categories Stats Channel ${deletechannel.name} : Check That I Don't Have Permission [**Manage Guild** (or) **Administrator** (or) **Manage Channel**]`).setTitle(':warning: Warning Alert :warning:')
                                 message.channel.send(erremb)
                            }
                         });   
                           }
                        data.categories = undefined
                    }
                }
                if(data.announcement){
                    let deletechannel = message.guild.channels.cache.get(data.announcement);
                    if(!deletechannel || deletechannel === undefined){
                    }
                    else if (deletechannel){
                        if(deletechannel){
                           await deletechannel.delete().catch(err => { 
                            if(err.method == 'delete'){
                                let erremb = new MessageEmbed().setColor('GOLD').setDescription(`Error of Announcements Channels Stats ${deletechannel.name} : Check That I Don't Have Permission [**Manage Guild** (or) **Administrator** (or) **Manage Channel**]`).setTitle(':warning: Warning Alert :warning:')
                                 message.channel.send(erremb)
                            }
                         });    
                           }
                        data.announcement = undefined
                    }
                }
                if(data.role){
                    let deletechannel = message.guild.channels.cache.get(data.role);
                    if(!deletechannel || deletechannel === undefined){
                    }
                    else if (deletechannel){
                        if(deletechannel){
                           await deletechannel.delete().catch(err => { 
                            if(err.method == 'delete'){
                                let erremb = new MessageEmbed().setColor('GOLD').setDescription(`Error of Solo Role Stats Channel ${deletechannel.name} : Check That I Don't Have Permission [**Manage Guild** (or) **Administrator** (or) **Manage Channel**]`).setTitle(':warning: Warning Alert :warning:')
                                 message.channel.send(erremb)
                            }
                         });     
                           }
                        data.role = undefined
                    }
                }
                if(data.roles){
                    let deletechannel = message.guild.channels.cache.get(data.roles);
                    if(!deletechannel || deletechannel === undefined){
                    }
                    else if (deletechannel){
                        if(deletechannel){
                           await deletechannel.delete().catch(err => { 
                            if(err.method == 'delete'){
                                let erremb = new MessageEmbed().setColor('GOLD').setDescription(`Error of Roles Stats Channel ${deletechannel.name} : Check That I Don't Have Permission [**Manage Guild** (or) **Administrator** (or) **Manage Channel**]`).setTitle(':warning: Warning Alert :warning:')
                                 message.channel.send(erremb)
                            }
                         });   
                           }
                        data.roles = undefined
                        data.roleid = undefined
                    }
                }
                if(data.emojis){
                    let deletechannel = message.guild.channels.cache.get(data.emojis);
                    if(!deletechannel || deletechannel === undefined){
                    }
                    else if (deletechannel){
                        if(deletechannel){
                           await deletechannel.delete().catch(err => { 
                            if(err.method == 'delete'){
                                let erremb = new MessageEmbed().setColor('GOLD').setDescription(`Error of Emojis Stats Channel ${deletechannel.name} : Check That I Don't Have Permission [**Manage Guild** (or) **Administrator** (or) **Manage Channel**]`).setTitle(':warning: Warning Alert :warning:')
                                 message.channel.send(erremb)
                            }
                         });      
                           }
                        data.emojis = undefined
                    }
                }
                if(data.static){
                    let deletechannel = message.guild.channels.cache.get(data.static);
                    if(!deletechannel || deletechannel === undefined){
                    }
                    else if (deletechannel){
                        if(deletechannel){
                           await deletechannel.delete().catch(err => { 
                            if(err.method == 'delete'){
                                let erremb = new MessageEmbed().setColor('GOLD').setDescription(`Error of Static Emojis Stats Channel ${deletechannel.name} : Check That I Don't Have Permission [**Manage Guild** (or) **Administrator** (or) **Manage Channel**]`).setTitle(':warning: Warning Alert :warning:')
                                 message.channel.send(erremb)
                            }
                         });      
                           }
                        data.static = undefined
                    }
                }
                if(data.animated){
                    let deletechannel = message.guild.channels.cache.get(data.animated);
                    if(!deletechannel || deletechannel === undefined){
                    }
                    else if (deletechannel){
                        if(deletechannel){
                           await deletechannel.delete().catch(err => { 
                            if(err.method == 'delete'){
                                let erremb = new MessageEmbed().setColor('GOLD').setDescription(`Error of Animated Emojis Stats Channel ${deletechannel.name} : Check That I Don't Have Permission [**Manage Guild** (or) **Administrator** (or) **Manage Channel**]`).setTitle(':warning: Warning Alert :warning:')
                                 message.channel.send(erremb)
                            }
                         });     
                           }
                        data.animated = undefined
                    }
                }
                if(data.boosts){
                    let deletechannel = message.guild.channels.cache.get(data.boosts);
                    if(!deletechannel || deletechannel === undefined){
                    }
                    else if (deletechannel){
                        if(deletechannel){
                           await deletechannel.delete().catch(err => { 
                            if(err.method == 'delete'){
                                let erremb = new MessageEmbed().setColor('GOLD').setDescription(`Error of Boosts Stats Channel ${deletechannel.name} : Check That I Don't Have Permission [**Manage Guild** (or) **Administrator** (or) **Manage Channel**]`).setTitle(':warning: Warning Alert :warning:')
                                 message.channel.send(erremb)
                            }
                         });      
                           }
                        data.boosts = undefined
                    }
                }
                if(data.tier){
                    let deletechannel = message.guild.channels.cache.get(data.tier);
                    if(!deletechannel || deletechannel === undefined){
                    }
                    else if (deletechannel){
                        if(deletechannel){
                           await deletechannel.delete().catch(err => { 
                            if(err.method == 'delete'){
                                let erremb = new MessageEmbed().setColor('GOLD').setDescription(`Error of Tier Stats Channel ${deletechannel.name} : Check That I Don't Have Permission [**Manage Guild** (or) **Administrator** (or) **Manage Channel**]`).setTitle(':warning: Warning Alert :warning:')
                                 message.channel.send(erremb)
                            }
                         });     
                           }
                        data.tier = undefined
                    }
                }
                
                data.setups = false
                data.save().catch(err => console.log(err))
                let emb = new MessageEmbed()
                    .setTitle('✅ Completed Successfully!')
                    .setDescription(`The reset has been completed successfully!, now you can run ${data.Prefix}setup again (if you can see the old channels please try to delete or reload the discord!.\nif (**mobile**) *reopen discord app*, if (**PC**) *Click \`CTRL\`+\`R\`*.`)
                    .setColor('#62FC1A')
                return message.channel.send(emb)
            } else if(collected.array()[0].content == 'no'){
                return message.channel.send(no)
                
            }
        })
        let me = new MessageEmbed()
            .setTitle(`Do you really want to reset all the stats?`)
            .setDescription(`You Can't Undo After The Reset! Think And Type! \`yes\` (or) \`no\`?`)
            .setColor('#2EC5F9')
        message.channel.send(me)
    }
}
exports.help = {
    name: "reset",
  }
  
  exports.conf = {
    aliases: [],
    cooldown: 10
  }
  