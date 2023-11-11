const canvacord = require("canvacord");
const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {
    text = args.join(' ')
    let image = await canvacord.Canvas.changemymind(text);
    let attachment = new Discord.MessageAttachment(image, "changemymind.png");

    return message.channel.send(attachment);
}

exports.help = {
  name: "changemymind",
  description: "change my mind Text Message",
  usage: "changemymind [Text]",
  example: "changemymind BurnKnuckle Burns>"
}

exports.conf = {
  aliases: ['cmm'],
  cooldown: 5
}
