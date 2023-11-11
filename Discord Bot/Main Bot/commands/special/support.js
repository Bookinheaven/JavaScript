const { MessageEmbed } = require("discord.js")

exports.run = async (client, message, args) => {
    let avatar = message.author.avatarURL({size: 2048}); // Use 2048 for high quality avatar.
    let embed = new MessageEmbed()
    .setAuthor(`${message.author.username} Thanks For Using This Command!.`, avatar)
    .setColor('#6300ff')
    .addField(`${client.user.username}, `, "Bot Invite Link : [Top.gg](https://top.gg/bot/786094670472019998) || [Direct Link](https://discord.com/oauth2/authorize?client_id=786094670472019998&scope=bot&permissions=469770302)\n\n**For More Information Join:**\nSupport Server: [Click here](https://discord.gg/VyasQKfRJc)\nBurnKnuckle Comrade Server: [Click here](https://discord.gg/VyasQKfRJc)\nMachine's Lounge | Gaming Server: [Click here](https://discord.gg/EvnYert5Wm)")
    message.channel.send(embed)
    
}
exports.help = {
    name: "support",
    description: "Support US",
    usage: "support",
    example: "support"
  }
  
  exports.conf = {
    aliases: ['sup'],
    cooldown: 5
  }
  