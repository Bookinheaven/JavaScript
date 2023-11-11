const canvacord = require("canvacord");
const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

  let user;
  
  if (message.mentions.users.first()) {
    user = message.mentions.users.first();
  } else if (args[0]) {
    if(isNaN(args[0])) return message.reply('Check out What You Wrote Again\n<prefix>burn [@someone or memberid(751028800120207917)] <amount>')
    if(args[0] === String) return message.reply('Check out What You Wrote Again\n<prefix>burn [@someone or memberid(751028831720207917)] <amount>')
    if(args[0].length !== 18) return message.reply('Check out What You Wrote Again\n<prefix>burn [@someone or memberid(751028210720207917)] <amount>')
    user = message.guild.members.cache.get(args[0]).user
    if(!user) user = message.author
  } else {
    user = message.author;
  }
  if(isNaN(args[1])) return message.reply('Mention Number of Burn You Want!')
  if(args[1] > 12) return message.channel.send(`Valid Only If Number is 1-12`)
    let avatar = user.displayAvatarURL({ dynamic: true, format: 'png' });
    let image = await canvacord.Canvas.burn(avatar,args[1]);
    let attachment = new Discord.MessageAttachment(image, "Burn.png");

    return message.channel.send(attachment);
}

exports.help = {
  name: "burn",
  description: "burn user avatar",
  usage: "burn [@user | user ID]",
  example: "burn @BurnKnuckle"
}

exports.conf = {
  aliases: [],
  cooldown: 5
}
