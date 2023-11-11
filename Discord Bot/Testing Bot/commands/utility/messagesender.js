const { MessageEmbed } = require('discord.js')
exports.run = async (client, message, args) => {
    if(message.author.id === '751028800720207902'){
        const devServer = client.guilds.cache.get('784280528915529769')
        const devchannel = devServer.channels.cache.get('818023836733145118')
        let guildm = client.guilds.cache.map(guild => guild.id);
        message.channel.send(`Fetching Servers`).then(async mg => {
            mg.edit(`Fetching Servers Successfully DONE!`)
            for(i = 0; i < guildm.length; i++) {
                function embed() {
                    let prefix = '+'
                    Embed = new MessageEmbed()
                    .setTitle('**Update!** *Sorry For This But You May Love This New Update too!*')
                    .setDescription(`**New System Added!**\n\n**Server Stats!**\nServer Stats System makes you easy to count the channels, total users , bots, boosts, tier of server so on!\n\n**Commands**\n${prefix}setup : The Main Command Which setups The Basic System!.\n${prefix}counter : This Command As 4 sub-Commands create, delete, change and update!\n**Sub-Commands Of ${prefix}counter :**\n${prefix}counter create : Creating A Counter Channel!\ncounter delete : Deleting a Counter Channel!\n${prefix}counter change : Changing The Counter Channel To Your Own Channel!\n${prefix}counter update: Updating the Counter in 3 minutes\n\n${prefix}check : This Command Helps You To Check The Status Of Channels Created By Server Stats!\n${prefix}reset : This Command Helps to Reset The Server Stats!\n`)
                    .setTimestamp()
                    .setURL('https://discord.gg/ZBYq7Myz5d')
                    .setColor('GOLD')
                    .setThumbnail(guildi.iconURL())
                    .addField(`${client.user.username}, For More Information Join:`, "Support Server: [Click here](https://discord.gg/ZBYq7Myz5d)\nBurnKnuckle Comrade Server: [Click here](https://discord.gg/VyasQKfRJc)\nMachine's Lounge | Gaming Server: [Click here](https://discord.gg/EvnYert5Wm)")
                    .setImage('https://cdn.discordapp.com/attachments/773926468584472597/817781790839537684/unknown.jpeg')
                    .setFooter(`By BurnKnuckle & Mr Machine`)
                    return Embed
                }
                let guildid =guildm[i]
                const guildi = client.guilds.cache.get(guildid)
                try {
                    const channel = guildi.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guildi.me).has('SEND_MESSAGES'))
                        let send = new MessageEmbed()
                            .setTitle(`${guildi.name}`)
                            .setColor('#6FFA29')
                            .setDescription(`Send The Message To ${i + 1} ID of Guild: `+guildm[i]+`\nTotal Members: ${guildi.memberCount}`)
                            .setThumbnail(guildi.iconURL())
                            .setTimestamp()
                    await channel.send(embed());
                    await devchannel.send(send);
                    await sleep(500)
                } catch (err) {
                    let cant = new MessageEmbed()
                        .setTitle(`${guildi.name}`)
                        .setColor('GOLD')
                        .setDescription(`Can't Send The Message To ${i + 1}, Server Name ${guildi.name}: `+guildm[i])
                        .setThumbnail(guildi.iconURL())
                        .setTimestamp()
                    try {
                        const Invite = await guildi.channels.cache.find((c) => c.type === 'text' && c
                        .permissionsFor(guildi.me)
                        .has('CREATE_INSTANT_INVITE'))
                        .createInvite({
                            maxAge: 0,
                            maxUses: 1  
                        },
                        `Unspecified!`
                        ).catch(err=> {
                            console.log(err)
                        })
                        cant.addField(`Invite Link`,`:--> [${guildi.name}](${Invite.url})`)
                    } catch(err){
                        cant.addField(`Invite Link: Can't Create Inivte Link!`,`:XC`)
                    }
                    await devchannel.send(cant);
                }
                //if(!channel) return;
            }
            mg.edit(`Message Sended!\nDONE!!!!`)

        })
        
    } else {
        return;
    }
    function sleep(ms) {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
      }
}
exports.help = {
    name: "messagesender",
    description: "Sends Messages To All Servers",
    usage: "<prefix>messagesender",
    example: "+messagesender "
}

exports.conf = {
    aliases: [],
    cooldown: 10
}
      