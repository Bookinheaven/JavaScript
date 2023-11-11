const { MessageEmbed } = require('discord.js');
exports.run = async (client, message, args) => {
    const embed = new MessageEmbed();
    if (!message.mentions.users.first()) return message.reply("You Need To Mention Someone!");
    if (message.mentions.users.first().id == message.author.id) return message.reply("I Don't Know If Thats Possible Chief")
    let avatar = message.author.avatarURL({size: 2048}); // Use 2048 for high quality avatar.
    embed.setAuthor(`${message.author.username} Made ${message.mentions.users.first().username} Cry! ;-; Sad...`, avatar)
    var color = [
      '#ff0000',
      '#ffc107',
      '#ea8824',
      '#4b0082',
      '#f08058',
      '#ff3961',
      '#0000ff',
      '#edced0',
      '#00FFFF',
      '#FF03BC',
      '#FF8E00'
  ]
  randomNum = Math.floor(Math.random() * 101) + 1 // random starts from 1 to 100 = randomNum
    tip = ['Bored Using This Command Try Out Using The Commmand `img`', 'Bored Using This Command Try Out Using The Commmand `animegif`', 'Bored Using This Command Try Out Using The Commmand `meme`', 'Bored Using This Command Try Out Using The Commmand `play Alanwalker Faded`']
    let tips = tip[Math.floor(Math.random() * tip.length)]
    if(randomNum < 20){
        message.channel.send(`**TIP**: ${tips}`)
    }
  let colors = color[Math.floor(Math.random() * color.length)]
    var gif = [
      'https://media.tenor.com/images/bf139869d81cd9b73144d6b941ebb733/tenor.gif',
      'https://media.tenor.com/images/7e623e17dd8c776aee5e0c3e0e9534c9/tenor.gif',
      'https://media1.tenor.com/images/3caea37ad3d608fc57231050f1d52a4c/tenor.gif?itemid=5336156',
      'https://media1.tenor.com/images/c28ac58e9ed291c4dc784524dc0ac127/tenor.gif?itemid=9039052',
      'https://media1.tenor.com/images/98466bf4ae57b70548f19863ca7ea2b4/tenor.gif?itemid=14682297',
      'https://media1.tenor.com/images/d22d5b7c7face2349bcc3c272e3430a7/tenor.gif?itemid=16811598',
      'https://media1.tenor.com/images/6088fab756706a4bf141e28fe330a2be/tenor.gif?itemid=16408575',
      'https://media1.tenor.com/images/e69ebde3631408c200777ebe10f84367/tenor.gif?itemid=5081296',
      'https://media1.tenor.com/images/ce52606293142a2bd11cda1d3f0dc12c/tenor.gif?itemid=5184314',
      'https://media1.tenor.com/images/4a56f7a050031784935978c5aaa4a865/tenor.gif?itemid=4695458'

    ]
    let gifs = gif[Math.floor(Math.random() * gif.length)]
    embed.setColor(colors);
    embed.setFooter(`BK Bot © By BurnKnuckle!`); 
    embed.setImage(gifs)
    message.channel.send(embed)
    .catch(e => {
      message.channel.send('Cant Find Any Gifs');
      console.error(e);
      return;
      });
  }
exports.help = {
  name: "cry",
  description: "a loud inarticulate shout or scream expressing a powerful feeling or emotion.",
  usage: "cry [someone]",
  example: "+cry @google"
}
  
exports.conf = {
  aliases: [],
  cooldown: 5
}
