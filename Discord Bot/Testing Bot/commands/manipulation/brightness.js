const canvacord = require("canvacord");
const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

  let user;
  
  if (message.mentions.users.first()) {
    user = message.mentions.users.first();
  } else if (args[0]) {
    if(isNaN(args[0])) return message.reply('Check out What You Wrote Again\n<prefix>brightness [@someone or memberid(751028800120207917)] <amount>')
    if(args[0] === String) return message.reply('Check out What You Wrote Again\n<prefix>brightness [@someone or memberid(751028831720207917)] <amount>')
    if(args[0].length !== 18) return message.reply('Check out What You Wrote Again\n<prefix>brightness [@someone or memberid(751028210720207917)] <amount>')
    user = message.guild.members.cache.get(args[0]).user
  } else {
    user = message.author;
  }
  text = args[1]
    let avatar = user.displayAvatarURL({ dynamic: true, format: 'png' });
    let image = await canvacord.Canvas.brightness(avatar,text);
    let attachment = new Discord.MessageAttachment(image, "brightness.png");

    return message.channel.send(attachment);
}

exports.help = {
  name: "brightness",
  description: "brightness user avatar",
  usage: "brightness [@user | user ID]",
  example: "brightness @BurnKnuckle \nbrightness"
}

exports.conf = {
  aliases: [],
  cooldown: 5
}
