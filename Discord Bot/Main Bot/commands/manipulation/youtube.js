const canvacord = require("canvacord");
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    let user;
    ops = { username: null, content: null, avatar: null, dark: false }
  
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else if (args[0]) {
      if(isNaN(args[0])) return message.reply('Check out What You Wrote Again\n<prefix>youtube [@someone or memberid(751028800120207917)]')
      if(args[0] === String) return message.reply('Check out What You Wrote Again\n<prefix>youtube [@someone or memberid(751028831720207917)]')
      if(args[0].length !== 18) return message.reply('Check out What You Wrote Again\n<prefix>youtube [@someone or memberid(751028210720207917)]')
      user = message.guild.members.cache.get(args[0]).user
    }
    else {
        user = message.author;
    }
    text = args.join(" ").slice(22);
    if(text.length < 1) return message.channel.send('Pleace Mention Some Text')
    
    let avatar = user.displayAvatarURL({ dynamic: true, format: 'png' });
    ops.avatar = avatar
    ops.username = `${user.tag}`
    ops.content	 = `${text}`
    ops.dark = true
    let image = await canvacord.Canvas.youtube(ops);
    let attachment = new Discord.MessageAttachment(image, "youtube.png");


    return message.channel.send(attachment);
}

exports.help = {
  name: "youtube",
  description: "youtube user avatar",
  usage: "youtube [@user | user ID]",
  example: "youtube @BurnKnuckle"
}

exports.conf = {
  aliases: [],
  cooldown: 5
}
