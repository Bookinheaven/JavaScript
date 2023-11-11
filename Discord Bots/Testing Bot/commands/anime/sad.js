const { MessageEmbed } = require('discord.js');
exports.run = async (client, message, args) => {
    const embed = new MessageEmbed();
    if (!message.mentions.users.first()) return message.reply("You Need To Mention Someone!");
    if (message.mentions.users.first().id == message.author.id) return message.reply("I Don't Know If Thats Possible Chief")
    embed.setTitle(`${message.author.username} Makes UnHappier ${message.mentions.users.first().username}!`);
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
    tip = ['Bored Using This Command Try Out Using The Commmand `img`', 'Bored Using This Command Try Out `Try Out Economy System`', 'Bored Using This Command Try Out Using The Commmand `meme`', 'Bored Using This Command Try Out Using The Commmand `play Alanwalker Faded` or `search Alanwalker faded`']
    let tips = tip[Math.floor(Math.random() * tip.length)]
    if(randomNum < 10){
        message.channel.send(`**TIP**: ${tips}`)
    }
  let colors = color[Math.floor(Math.random() * color.length)]
    var sadgif = [
      'https://media1.tenor.com/images/97a0ceefeacc6760878ebf73af7fbf4a/tenor.gif?itemid=14910500',
      'https://media1.tenor.com/images/a892784674818166e8a83c74e5a54a49/tenor.gif?itemid=16249499',
      'https://media.tenor.com/images/d423460bc5d93c207f0336dd328735f2/tenor.gif',
      'https://media.tenor.com/images/56301bf106855a40c17c7882fc996387/tenor.gif',
      'https://media.tenor.com/images/b261321eff758fb664ea6ff110fec20a/tenor.gif',
      'https://media.tenor.com/images/8fef3aa41f9d27021e5f4105a7bd6768/tenor.gif',
      'https://media.tenor.com/images/f7a6e83b21b1be294ee65839098a94ef/tenor.gif',
      'https://media.tenor.com/images/d7286a667f4c7f5e3af2daf2ac3d9948/tenor.gif',
      'https://media.tenor.com/images/930e6c8bf4ead6e520be6f7e8e9058a8/tenor.gif',
      'https://media.tenor.com/images/03bf00cb8965915aff917b715a24e89a/tenor.gif',
      'https://media.tenor.com/images/983b25ee7faca2366940cecbd3ddd593/tenor.gif'
      ]
    let sadgifs = sadgif[Math.floor(Math.random() * sadgif.length)]
    embed.setColor(colors);
    embed.setFooter(`BK Bot © By BurnKnuckle!`); 
    embed.setImage(sadgifs)
    message.channel.send(embed)
    .catch(e => {
      message.channel.send('Cant Find Any Gifs');
      console.error(e);
      return;
      });
  }
exports.help = {
  name: "sad",
  description: "Sadness Is Another Type Of Emotion Often Defined As A Transient emotional State Characterized By Feelings Of Disappointment, Grief, Hopelessness, Disinterest, and Dampened Mood!.",
  usage: "sad [someone]",
  example: "+sad @google"
}
  
exports.conf = {
  aliases: [],
  cooldown: 5
}
