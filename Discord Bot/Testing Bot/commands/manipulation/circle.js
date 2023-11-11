const canvacord = require("canvacord");
const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {
  let user;
  
  if (message.mentions.users.first()) {
    user = message.mentions.users.first();
  } else if (args[0]) {
    if(isNaN(args[0])) return message.reply('Check out What You Wrote Again\n<prefix>circle [@someone or memberid(751028800120207917)]')
    if(args[0] === String) return message.reply('Check out What You Wrote Again\n<prefix>circle [@someone or memberid(751028831720207917)]')
    if(args[0].length !== 18) return message.reply('Check out What You Wrote Again\n<prefix>circle [@someone or memberid(751028210720207917)]')
    user = message.guild.members.cache.get(args[0]).user
  } else {
    user = message.author;
  }
  
    let avatar = user.displayAvatarURL({ dynamic: true, format: 'png' });
    let image = await canvacord.Canvas.circle(avatar);
    let attachment = new Discord.MessageAttachment(image, "circle.png");

    return message.channel.send(attachment);
}

exports.help = {
  name: "circle",
  description: "circle user avatar",
  usage: "circle [@user | user ID]",
  example: "circle @BurnKnuckle \ncircle"
}

exports.conf = {
  aliases: [],
  cooldown: 5
}
