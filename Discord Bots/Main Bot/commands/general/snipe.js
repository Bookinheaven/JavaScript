const Discord = require('discord.js'),
      db = require("quick.db");

exports.run = async (client, message, args) => {
  
  let snip = client.snipe.get(message.channel.id)

  if(!snip) return message.channel.send(":x: Not found.")

  let embed = new Discord.MessageEmbed()
  .setColor("GREEN")
  .setAuthor(snip.user,snip.profilephoto)
  .setDescription(`**Message:**\`${snip.msg}\``)
  .setTimestamp(snip.date)
  if(snip.image) embed.setImage(snip.image)

  message.channel.send(embed)
}

exports.help = {
  name: "snipe",
  description: "Shows the last deleted message.",
  usage: "/snipe",
  example: "/snipe"
};

exports.conf = {
  aliases: [],
  cooldown: 10
}

