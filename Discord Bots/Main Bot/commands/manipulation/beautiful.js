const canvacord = require("canvacord");
const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {
  randomNum = Math.floor(Math.random() * 101) + 1 // random starts from 1 to 100 = randomNum
  tip = ['Bored Using This Command Try Out Using The Commmand `img`', 'Bored Using This Command Try Out `Try Out Economy System`', 'Bored Using This Command Try Out Using The Commmand `meme`', 'Bored Using This Command Try Out Using The Commmand `play Alanwalker Faded` or `search Alanwalker faded`']
  let tips = tip[Math.floor(Math.random() * tip.length)]
  if(randomNum < 10){
      message.channel.send(`**TIP**: ${tips}`)
  }
  let user;
  
  if (message.mentions.users.first()) {
    user = message.mentions.users.first();
  } else if (args[0]) {
    if(isNaN(args[0])) return message.reply('Check out What You Wrote Again\n<prefix>beautiful [@someone or memberid(751028800120207917)]')
    if(args[0] === String) return message.reply('Check out What You Wrote Again\n<prefix>beautiful [@someone or memberid(751028831720207917)]')
    if(args[0].length !== 18) return message.reply('Check out What You Wrote Again\n<prefix>beautiful [@someone or memberid(751028210720207917)]')
    user = message.guild.members.cache.get(args[0]).user
  } else {
    user = message.author;
  }
  
    let avatar = user.displayAvatarURL({ dynamic: true, format: 'png' });
    let image = await canvacord.Canvas.beautiful(avatar);
    let attachment = new Discord.MessageAttachment(image, "beautiful.png");

    return message.channel.send(attachment);
}

exports.help = {
  name: "beautiful",
  description: "beautiful user avatar",
  usage: "beautiful [@user | user ID]",
  example: "beautiful @BurnKnuckle \nbeautiful"
}

exports.conf = {
  aliases: [],
  cooldown: 5
}
