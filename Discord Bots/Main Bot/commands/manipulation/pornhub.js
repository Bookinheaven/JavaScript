const canvacord = require("canvacord");
const Discord = require('discord.js');
// const { options } = require("snekfetch");
module.exports.run = async (client, message, args) => {
    options = { username: null, message: null, image: null }
    let user;
  
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else if (args[0]) {
      if(isNaN(args[0])) return message.reply('Check out What You Wrote Again\n<prefix>phub [@someone or memberid(751028800120207917)]')
      if(args[0] === String) return message.reply('Check out What You Wrote Again\n<prefix>phub [@someone or memberid(751028831720207917)]')
      if(args[0].length !== 18) return message.reply('Check out What You Wrote Again\n<prefix>phub [@someone or memberid(751028210720207917)]')
      user = message.guild.members.cache.get(args[0]).user
    }
    else {
        user = message.author;
    }
    text = args.join(" ").slice(22);
    if(text.length < 1) return message.channel.send('Pleace Mention Some Text')
    options.username = `${user.tag}`
    options.message = `${text}`
    
    let avatar = user.displayAvatarURL({ dynamic: true, format: 'png' });
    options.image = avatar
    let image = await canvacord.Canvas.phub(options);
    let attachment = new Discord.MessageAttachment(image, "phub.png");

    return message.channel.send(attachment);
}

exports.help = {
  name: "pornhub",
  description: "phub user avatar",
  usage: "phub [@user | user ID]",
  example: "phub @BurnKnuckle \nphub"
}

exports.conf = {
  aliases: ['phub'],
  cooldown: 5
}
