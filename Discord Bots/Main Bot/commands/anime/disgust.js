const { MessageEmbed } = require('discord.js');
exports.run = async (client, message, args) => {
    const embed = new MessageEmbed();
    if (!message.mentions.users.first()) return message.reply("You Need To Mention Someone!");
    if (message.mentions.users.first().id == message.author.id) return message.reply("I Don't Know If Thats Possible Chief")
    embed.setTitle(`${message.author.username} Disgust ${message.mentions.users.first().username}!`);
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
    var gif = [
      'https://media1.tenor.com/images/0b42fed5a4b7ff4e5f9c7680059cf0da/tenor.gif?itemid=11102640',
      'https://media.tenor.com/images/90d093227e2fbbe3fa9be252f6011c42/tenor.gif',
      'https://media.tenor.com/images/afac531ed5efdae0e36275e9363ac85f/tenor.gif',
      'https://media.tenor.com/images/252fbcc5b057bb2e50577b0833f08c77/tenor.gif',
      'https://media.tenor.com/images/77cd94904b4080f231ae4a5e8844d939/tenor.gif',
      'https://media1.tenor.com/images/400cec55aaaa5b76d226c7171ac5008e/tenor.gif?itemid=5598911',
      'https://media1.tenor.com/images/553956eee851b98b7c38b9c1e2f20a11/tenor.gif?itemid=8620570',
      'https://media.tenor.com/images/2a24246650d7d48e7b203169f0608c1a/tenor.gif'
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
  name: "disgust",
  description: "Poor hygiene, infection, blood, rot, and death can also trigger a disgust response. This may be the body's way of avoiding things that may carry transmittable diseases.",
  usage: "disgust [someone]",
  example: "+disgust @google"
}
  
exports.conf = {
  aliases: [],
  cooldown: 5
}
