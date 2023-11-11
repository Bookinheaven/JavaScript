const { MessageEmbed } = require('discord.js');
const setuping = require('../../models/onlyguild')
exports.run = async (client, message) => {
    const data = await setuping.findOne({
        GuildID: message.guild.id
    })
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS") || !message.guild.me.hasPermission("MANAGE_GUILD") || !message.guild.me.hasPermission("VIEW_CHANNEL")) {
        let mea = new MessageEmbed()
            .setTitle(`I Dont' Have Permission To Setup Counters!`)
            .setDescription(`Kindly Check That I Have **Administrator** Or **Manage Channel** or **Manage Guild**`)
            .setColor('GOLD')
        return message.channel.send(mea);
      }
    if (!message.member.permissions.any(["ADMINISTRATOR", "MANAGE_GUILD", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_ROLES"])) {
        let noperauthor = new MessageEmbed()
        .setTitle(`${message.author.username} You Dont' Have Permission To Setup Counters!`)
        .setDescription(`Kindly Check That You Have **Administrator** Or **Manage Channel** or **Manage Guild**`)
        .setColor('GOLD')
    return message.channel.send(noperauthor);
    }

    if(data.setups === true){
        let doneembed = new MessageEmbed()
            .setTitle(`:warning: Warning Alert! :warning:`)
            .setDescription(`<a:LIVE:805007031823892480> The Bot Setup Has Been Already Done!.\nDo You Want To Reset Old Stat Counters Use Command \`${data.Prefix}reset\``)
            .setColor(`GOLD`)
        return message.channel.send(doneembed)

    } else if (data.setups === false){
        let filter = (message) => !message.author.bot;

        let options = {
          max: 1,
          time: 15000
        };
        let collector = message.channel.createMessageCollector(filter, options);

        collector.on('collect', async (m) => {
            if(m.content == 'cancel'){
                collector.stop()
                let canclepr = new MessageEmbed()
                    .setTitle(`Process Status of **Stat Counter Setup**!`)
                    .setDescription(`:x: Process Has Been Canceled!`)
                await message.channel.send(canclepr)
                
            }
        });

        collector.on('end', async (collected, reason) => {
            if (reason === 'time') {
                let timeup = new MessageEmbed()
                .setTitle(`Process Status of **Stat Counter Setup**!`)
                .setDescription(`⏰ Process Has Been Canceled! Because You Didn't Respond in Time!.`)
                .setColor('RED')
                message.channel.send(timeup);
            } else if(!collected.array()[0].content){
                return;
            }
            else if(collected.array()[0].content == 'voice'){
                chek = 'voice'
                message.guild.channels.create(`📊 Server Status 📊`, {
                    type: 'category',
                    permissionOverwrites: [
                        {
                            id: client.user.id,
                            allow: ['MANAGE_CHANNELS','CONNECT','VIEW_CHANNEL','SEND_MESSAGES'],
                        },
                        {
                            id: message.guild.roles.everyone,
                            allow: ['VIEW_CHANNEL'],
                            deny : ['CONNECT','SEND_MESSAGES']
                        },

                    ]
                }).then(async(category) => {
                    data.category = category.id
                    await category.setPosition(0)
                        .catch(console.error);
                    await message.guild.channels.create(`All Members: ${message.guild.memberCount.toLocaleString()}`, {
                        type: 'voice',
                        parent: category,
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
                        //await channel.setParent(category)
                        await channel.setPosition(0)
                            .catch(console.error);
                        data.all = channel.id
                        await data.save().catch(err => console.log(err))
                        await message.guild.channels.create(`Members: ${message.guild.members.cache.filter(member => !member.user.bot).size.toLocaleString()}`, {
                            type: 'voice',
                            parent: category,
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
                            //creating channel [member]
                        }).then(async(channel1) => {
                            //await channel1.setParent(category)
                            await channel1.setPosition(1)
                                .catch(console.error);
                            data.members = channel1.id

                            await data.save().catch(err => console.log(err))
                            await message.guild.channels.create(`Bots: ${message.guild.members.cache.filter(member => member.user.bot).size.toLocaleString()}`, {
                                type: 'voice',
                                parent: category,
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
                                //creating channel [member]
                            }).then(async(channel2) => {
                                //await channel2.setParent(category)
                                await channel2.setPosition(2)
                                    .catch(console.error);
                                data.bots = channel2.id
                                
                            })
                        })
                    })
                    data.setups = true
                    await data.save().catch(err => console.log(err))
                }).then(async() => {
                    let doneembed = new MessageEmbed()
                        .setTitle(`Successfully Done!`)
                        .setDescription(`The setup has been completed and From now stats Will automatically update the counters every 3 minutes.\nTry Out ${data.Prefix}counter to see full list of stat Counters Available Right now!`)
                        .setColor(`#62FC1A`)
                    await message.channel.send(doneembed)
                    return;
                }) .catch(console.error);
            } else if(collected.array()[0].content == 'text'){
                await message.guild.channels.create(`📊 Server Status 📊`, {
                    type: 'category',
                    permissionOverwrites: [
                        {
                            id: client.user.id,
                            allow: ['MANAGE_CHANNELS','CONNECT','VIEW_CHANNEL','SEND_MESSAGES'],
                        },
                        {
                            id: message.guild.roles.everyone,
                            allow: ['VIEW_CHANNEL'],
                            deny : ['CONNECT','SEND_MESSAGES']
                        },

                    ]
                }).then(async(category) => {
                    data.category = category.id
                    category.setPosition(0)
                            .catch(console.error);
                    await message.guild.channels.create(`All Members: ${message.guild.memberCount.toLocaleString()}`, {
                        type: 'text',
                        parent: category,
                        permissionOverwrites: [
                            {
                                id: client.user.id,
                                allow: ['MANAGE_CHANNELS','VIEW_CHANNEL','SEND_MESSAGES'],
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
                        //creating channel [member]
                    }).then(async(channel) => {
                        //await channel.setParent(category)
                        await channel.setPosition(0)
                            .catch(console.error);
                        data.all = channel.id
                        await data.save().catch(err => console.log(err))
                        await message.guild.channels.create(`Members: ${message.guild.members.cache.filter(member => !member.user.bot).size.toLocaleString()}`, {
                            type: 'text',
                            parent: category,
                            permissionOverwrites: [
                                {
                                    id: client.user.id,
                                    allow: ['MANAGE_CHANNELS','VIEW_CHANNEL','SEND_MESSAGES'],
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
                            //creating channel [member]
                        }).then(async(channel1) => {
                            //await channel1.setParent(category)
                            await channel1.setPosition(1)
                                .catch(console.error);
                            data.members = channel1.id
                            await data.save().catch(err => console.log(err))

                            await message.guild.channels.create(`Bots: ${message.guild.members.cache.filter(member => member.user.bot).size.toLocaleString()}`, {
                                type: 'text',
                                parent: category,
                                permissionOverwrites: [
                                    {
                                        id: client.user.id,
                                        allow: ['MANAGE_CHANNELS','VIEW_CHANNEL','SEND_MESSAGES'],
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
                                //creating channel [member]
                            }).then(async(channel2) => {
                                //await channel2.setParent(category)
                                await channel2.setPosition(2)
                                    .catch(console.error);
                                data.bots = channel2.id
                            })
                        })
                    })
                    data.setups = true
                    data.save().catch(err => console.log(err))
                }).then(async() => {
                    let doneembed = new MessageEmbed()
                        .setTitle(`Successfully Done!`)
                        .setDescription(`The setup has been completed and From now stats Will automatically update the counters every 3 minutes.\nTry Out ${data.Prefix}counter to see full list of stat Counters Available Right now!`)
                        .setColor(`#62FC1A`)
                    await message.channel.send(doneembed)
                    return;
                }) .catch(console.error);
                
            } else {
                let embed = new MessageEmbed()
                .setColor('GOLD')
                .setTitle(`:warning: Warning Alert! :warning:`)
                .setDescription('**Wrong Selection!** **Try Agian!**') 
                return message.channel.send(embed)
            }
            
        })
        let pictypeembed = new MessageEmbed()
            .setTitle(`Pick Up One From This!`)
            .setDescription(`Which type of channel do you want to use as a Stat Counter - \`voice\`, \`text\` or type cancel to cancel the process!.`)
            .setColor(`#2EC5F9`)
        message.channel.send(pictypeembed)   
    }

}
exports.help = {
    name: "setup",
  }
  
  exports.conf = {
    aliases: [],
    cooldown: 10
  }
  