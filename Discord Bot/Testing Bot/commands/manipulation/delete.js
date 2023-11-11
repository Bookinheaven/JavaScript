const canvacord = require("canvacord");
const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {
  
  let user;
  
  if (message.mentions.users.first()) {
    user = message.mentions.users.first();
  } else if (args[0]) {
    if(isNaN(args[0])) return message.reply('Check out What You Wrote Again\n<prefix>delete [@someone or memberid(751028800120207917)]')
    if(args[0] === String) return message.reply('Check out What You Wrote Again\n<prefix>delete [@someone or memberid(751028831720207917)]')
    if(args[0].length !== 18) return message.reply('Check out What You Wrote Again\n<prefix>delete [@someone or memberid(751028210720207917)]')
    user = message.guild.members.cache.get(args[0]).user
  } else {
    user = message.author;
  }
  text = args[1]
  if(!text) return message.reply('Syntax : <*delete @BurnKnuckle [true or false]>')
  
  if(text == 'true'){
    let avatar = user.displayAvatarURL({ dynamic: true, format: 'png' });
    let image = await canvacord.Canvas.delete(avatar, true);
    let attachment = new Discord.MessageAttachment(image, "delete.png");

    return message.channel.send(attachment);
  } else if(text == 'false'){
    let avatar = user.displayAvatarURL({ dynamic: true, format: 'png' });
    let image = await canvacord.Canvas.delete(avatar, false);
    let attachment = new Discord.MessageAttachment(image, "delete.png");

    return message.channel.send(attachment);
  } else return message.reply("It Should be true or false");
  

}

exports.help = {
  name: "delete",
  description: "delete user avatar",
  usage: "delete [@user | user ID]",
  example: "delete @BurnKnuckle \ndelete"
}

exports.conf = {
  aliases: [],
  cooldown: 5
}
