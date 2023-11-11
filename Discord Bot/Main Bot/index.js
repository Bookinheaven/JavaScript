const Discord = require('discord.js');
const client = new Discord.Client();
const Canvas = require('canvas')
const mongoose = require('mongoose');
const cooldowns = new Discord.Collection()
client.queue = new Map();
const db = require('quick.db')
const prefix = require('./models/onlyguild');
const welcome = require('./models/onlyguild')
const userdata1 = require('./models/userstuff')
const usergil = require('./models/guildstuff')
const { owners } = require('./config.json')
const jimp = require("jimp");
const welcomes = require('./assets/welcome.json')

mongoose.connect('xxx', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
}).then(console.log('Connected To MongoDB'));

client.on("warn", console.warn); 
client.on("error", console.error);
client.login(process.env.token);
client.snipe = new Map()
client.recent = new Set();
client.leveling = require("./until/LevelingUtil")
require("./handler/loadCommands.js")(client);
require("./handler/Event.js")(client);

client.on("messageDelete", async(message,channel) => {
    if(message.author.bot) return;
    if(!message.guild) return;
    client.snipe.set(message.channel.id, {
        msg:message.content,
        user:message.author.tag,
        profilephoto:message.author.displayAvatarURL(),
        image:message.attachments.first() ? message.attachments.first().proxyURL : null,
        date:message.createdTimestamp
        
    })
})

client.on('guildMemberAdd', async (member) => {
    const data2 = await welcome.findOne({
        GuildID: member.guild.id
    });
    if(!data2) return;
    if(!data2.Welcome) return;
    if (data2.Welcoming === false) return;
	const textChannel = member.guild.channels.cache.find(ch => ch.id === data2.Welcome)
    if (!textChannel) return ;
    if (data2.welcometype === 0) backs = "normal"
    else if (data2.welcometype === 1) backs = "abstract"
    else if (data2.welcometype === 2) backs = "anime"
    else if (data2.welcometype === 3) backs = "nature"
    else if (data2.welcometype === 4) backs = "colors"
    else if (data2.welcometype === 5) backs = "avengers"
    else return;
    var autoval = [Math.floor(Math.random() * welcomes.welcomes[backs].length)]
    let back1 = welcomes.welcomes[backs]
    let back = back1[autoval]

    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext("2d");

    const font = 'sans-serif';
    blur = false
    if (blur) {
      const background = await jimp.read(back);

      background.blur(5);

      let mraw = await background.getBufferAsync("image/png");

      const fixedbkg = await Canvas.loadImage(mraw);

      ctx.drawImage(fixedbkg, 0, 0, canvas.width, canvas.height);
    } else {
      const fixedbkg = await Canvas.loadImage(back);

      ctx.drawImage(fixedbkg, 0, 0, canvas.width, canvas.height);
    }

    ctx.strokeRect(0, 0, canvas.width, canvas.height);

      let blurImage = await Canvas.loadImage(
        "https://cdn.discordapp.com/attachments/735118044145123348/735477847526998077/20200722_181613.png"
      )
      ctx.drawImage(blurImage, 0, 0, canvas.width, canvas.height);
    
    let xname = member.user.username;

    ctx.font = `bold 26px ${font}`;
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "start";
    ctx.strokeStyle = "#f5f5f5";


    ctx.fillText(`${xname}`, 278, 113);
    ctx.strokeText(`${xname}`, 278, 113);

    ctx.font = `bold 20px ${font}`;
    ctx.fillStyle = "#FFFFFF";

    ctx.fillText(`#${member.user.discriminator}`, 278, 160);

    let image = await jimp.read(
      member.user.displayAvatarURL({ format: "jpg", dynamic: true })
    );
    image.resize(1024, 1024);
    image.circle();
    let raw = await image.getBufferAsync("image/png");

    const avatar = await Canvas.loadImage(raw);
    // Draw a shape onto the main canvas
    ctx.drawImage(avatar, 72, 48, 150, 150);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'join.png');

    let total = member.guild.memberCount
    let users = member.guild.members.cache.filter(member => !member.user.bot).size;
    let bots = member.guild.members.cache.filter(member => member.user.bot).size
    let textdata = data2.Welcometext.replace(/<member>/g, member).replace(/<server>/g, member.guild.name).replace(/<total>/g, total).replace(/<users>/g, users).replace(/<bots>/g, bots)
    textChannel.send(`${textdata}`,attachment);
})

client.on('guildMemberRemove', async member => {
    const data2 = await welcome.findOne({
        GuildID: member.guild.id
    });

    if (data2.lefting === false) return;
    if(!data2.left) return;
	const textChannel = member.guild.channels.cache.find(ch => ch.id === data2.left)
    if (!textChannel) return ;
    if (data2.lefttype === 0) backs = "normal"
    else if (data2.lefttype === 1) backs = "abstract"
    else if (data2.lefttype === 2) backs = "anime"
    else if (data2.lefttype === 3) backs = "nature"
    else if (data2.lefttype === 4) backs = "colors"
    else if (data2.lefttype === 5) backs = "avengers"
    else return;
    var autoval = [Math.floor(Math.random() * welcomes.welcomes[backs].length)]
    let back1 = welcomes.welcomes[backs]
    let back = back1[autoval]

    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext("2d");

    const font = 'sans-serif';
    blur = false
    if (blur) {
      const background = await jimp.read(back);

      background.blur(5);

      let mraw = await background.getBufferAsync("image/png");

      const fixedbkg = await Canvas.loadImage(mraw);

      ctx.drawImage(fixedbkg, 0, 0, canvas.width, canvas.height);
    } else {
      const fixedbkg = await Canvas.loadImage(back);

      ctx.drawImage(fixedbkg, 0, 0, canvas.width, canvas.height);
    }

    ctx.strokeRect(0, 0, canvas.width, canvas.height);

      let blurImage = await Canvas.loadImage(
        "https://cdn.discordapp.com/attachments/735118044145123348/735477847526998077/20200722_181613.png"
      )
      ctx.drawImage(blurImage, 0, 0, canvas.width, canvas.height);
    
    let xname = member.user.username;

    ctx.font = `bold 26px ${font}`;
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "start";
    ctx.strokeStyle = "#f5f5f5";


    ctx.fillText(`${xname}`, 278, 113);
    ctx.strokeText(`${xname}`, 278, 113);

    ctx.font = `bold 20px ${font}`;
    ctx.fillStyle = "#FFFFFF";

    ctx.fillText(`#${member.user.discriminator}`, 278, 160);

    let image = await jimp.read(
      member.user.displayAvatarURL({ format: "jpg", dynamic: true })
    );
    image.resize(1024, 1024);
    image.circle();
    let raw = await image.getBufferAsync("image/png");

    const avatar = await Canvas.loadImage(raw);
    // Draw a shape onto the main canvas
    ctx.drawImage(avatar, 72, 48, 150, 150);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'left.png');

    let total = member.guild.memberCount
    let users = member.guild.members.cache.filter(member => !member.user.bot).size;
    let bots = member.guild.members.cache.filter(member => member.user.bot).size
    let textdata = data2.lefttext.replace(/<member>/g, member).replace(/<server>/g, member.guild.name).replace(/<total>/g, total).replace(/<users>/g, users).replace(/<bots>/g, bots)
    textChannel.send(`${textdata}`,attachment);
    
    
})
client.on('message', async (message) => {
    if (message.author.bot) return;
    const data = await prefix.findOne({
        GuildID: message.guild.id
    });
    if(!data){
        let newData = new prefix({
            GuildID: message.guild.id
        })
        await newData.save();
        message.channel.send('Hi Your Server As Been Registred Now You Can Use All Commands!')
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
        if (!commandfile) return;
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
})
client.on('guildCreate', async guild => {
    const devServer = client.guilds.cache.get('805743940597973032')
    const devchannel = devServer.channels.cache.get('806043634268897280')

    let channelID;
    let channels = guild.channels.cache;

    channelLoop:
    for (let key in channels) {
        let c = channels[key];
        if (c[1].type === "text") {
            channelID = c[0];
            break channelLoop;
        }
    }
    const embedss = new Discord.MessageEmbed()
        .setTitle('I Have aLot Of InBuild Commands! Around 100')
    let module = client.helps.array();
    for (const mod of module) {
        // You can change the .join(" | ") to commas, dots or every symbol.
        embedss.addField(`${mod.name}`, mod.cmds.map(x => `\`${x}\``).join(" | "));
      }
    await devchannel.send(`<a:check:800984260986798131> BK Bot has Joined ${guild} <@751028800720207902> <@575680249380077588>`);
    let channel = guild.channels.cache.get(guild.systemChannelID || channelID);
    channel.send(`Hi Guys!, Thanks for inviting me into this server! ` , embedss );
}) 
client.on('guildDelete', async guild => {
    const devServer = client.guilds.cache.get('805743940597973032')
    const channel = devServer.channels.cache.get('806043667444793364')

    await channel.send(`<a:uncheck:800984261192187914> BK Bot has Kicked From ${guild} <@751028800720207902> <@575680249380077588>`); 
}) 

client.on('message', async (message) => {
	if (message.content === 'wtest') {
        if(message.author.id == '751028800720207902' || message.author.id == '575680249380077588'){
            client.emit('guildMemberAdd', message.member);
        } else return;
    }
    else if (message.content === 'ltest') {
        if(message.author.id == '751028800720207902' || message.author.id == '575680249380077588'){
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
    } else if (message.content == 'servers'){
        if(message.author.id == 'x' || message.author.id == 'x'){
            const Guilds = client.guilds.cache.map(guild => guild.name);
            message.channel.send(Guilds)
         } else return;

    } else if (message.content == 'hms'){
        if(message.author.id == 'x' || message.author.id == 'x'){
            message.channel.send(`${client.guilds.cache.size} Servers`)
         } else return;

    }
});
