const canvacord = require("canvacord");
const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {
    text = args.join(' ')
    let image = await canvacord.Canvas.clyde(text);
    let attachment = new Discord.MessageAttachment(image, "clyde.png");

    return message.channel.send(attachment);
}

exports.help = {
  name: "clyde",
  description: "clyde Text Message",
  usage: "clyde [Some Text]",
  example: "clyde BurnKnuckle"
}

exports.conf = {
  aliases: [],
  cooldown: 5
}
