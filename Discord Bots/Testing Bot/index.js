const Discord = require('discord.js');
const client = new Discord.Client();
const mongoose = require('mongoose');
const moment = require('moment')
client.queue = new Map();
const prefix = require('./models/onlyguild');


    mongoose.connect('', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
}).then(console.log('Connected To MongoDB'));

client.on("warn", console.warn); 
client.on("error", console.error);
client.login("")//client.login(process.env.token);
client.snipe = new Map()
client.recent = new Set();
client.leveling = require("./until/LevelingUtil")
require("./handler/loadCommands.js")(client);
require("./handler/Event.js")(client);


client.on('message', async (message) => {
    if (message.content === 'ahh!') {
        const reactionEmoji = message.guild.emojis.cache.find(emoji=>emoji);
        console.log(reactionEmoji)
        message.react(reactionEmoji);
    }
	if (message.content === 'wtest') {
        if(message.author.id == '' || message.author.id == ''){
            client.emit('guildMemberAdd', message.member);
        } else return;
    }
    else if (message.content === 'ltest') {
        if(message.author.id == '' || message.author.id == ''){
            client.emit('guildMemberRemove', message.member);
        } else return;
    }
    else if (message.content === 'wimp') {
        const data = await prefix.findOne({
            GuildID: message.guild.id
        });
        if(!data.Prefix){
            return message.channel.send(`Your Server Prefix Is \`+\``);
        }
        if(data.Prefix) {
            const prefix = data.Prefix;
            return message.channel.send(`Your Server Prefix Is \`${prefix}\``);
        }
    } else if (message.content == 'hms'){
        if(message.author.id == '' || message.author.id == ''){
            message.channel.send(`${client.guilds.cache.size} Servers`)
         } else return;

    } else if(message.content == 'servers'){
        if(message.author.id === '' || message.author.id === ''){
            const Guilds = client.guilds.cache.map(guild => guild.name);
                let me = new Discord.MessageEmbed()
                    .setTitle(`Total Server List! of ${client.user.username}`)
                    //.setDescription(`${abc}`)
                    .setTimestamp()
                    .setThumbnail(client.user.displayAvatarURL())
                    .setFooter(`${client.user.username}`)
                    .setColor('GOLD')

                for (i = 0; i < Guilds.length; i++) {
                    abc = `${Guilds[i]}`
                    me.addField(`${abc}`,`Server Number: #${i + 1 }`, false)
                    
                }
                
                    return message.channel.send(me).catch(err=> {
                        if(err)
                        return message.channel.send(Guilds)
                    })
        }
    } else if(message.content == 'botinfo'){
        if(message.author.id === '' || message.author.id === ''){
            let me = new Discord.MessageEmbed()
                .setTitle(`BotInfo! of ${client.user.username}!`)
                .setDescription(`> About Bots Outer Shell! [🛡️]: \nTotal Servers: ${client.guilds.cache.size} Servers!\nTotal Channels: ${client.channels.cache.size} Channels!\nTotal Users: ${client.users.cache.size} Users! [<a:Girl_Laughing:785499172710776862>]\n\n> **About Inner Shell!** [<:bot:805306609957077022>]: \nClient Name: ${client.user}\nClient ID: ${client.user.id}\nClient Discriminator: ${client.user.discriminator}\nTotal Commands: ${client.commands.size} Comamnds!\nTotal Aliases: ${client.aliases.size}\nBot Started At: ${moment(client.readyAt).format('LLLL')}\nBot Created At: ${moment(client.user.createdAt).format('LLLL')}\nLibrary Used: Discord.js! [<:discordjs:817734881101479986>]`)
                .setTimestamp()
                .setThumbnail(client.user.displayAvatarURL())
                .setFooter(`${client.user.username}`)
                .setColor('GOLD')
            return message.channel.send(me)
        }
    }
});
