const { MessageEmbed } = require('discord.js');
exports.run = async (client, message, args) => {
    const embed = new MessageEmbed();
    if (!message.mentions.users.first()) return message.reply("You Need To Mention Someone To Pat Them!");
    if (message.mentions.users.first().id == message.author.id) return message.reply("I Don't Know If Thats Possible Chief")
    embed.setTitle(`${message.author.username} Patted ${message.mentions.users.first().username}!`);
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
    var patgif = [
      'https://media1.tenor.com/images/d3c117054fb924d66c75169ff158c811/tenor.gif?itemid=15471762',
      'https://media1.tenor.com/images/5466adf348239fba04c838639525c28a/tenor.gif?itemid=13284057',
      'https://media1.tenor.com/images/c0c1c5d15f8ad65a9f0aaf6c91a3811e/tenor.gif?itemid=13410974',
      'https://media1.tenor.com/images/78421fd64eba6902f18a0574cce1b5f5/tenor.gif?itemid=14405998',
      'https://media1.tenor.com/images/a2977ac380e2bf2cf809c0e249ea760c/tenor.gif?itemid=16937682',
      'https://media1.tenor.com/images/291ea37382e1d6cd33349c50a398b6b9/tenor.gif?itemid=10204936',
      'https://media1.tenor.com/images/398c9c832335a13be124914c23e88fdf/tenor.gif?itemid=9939761'
      ]
    let patgifs = patgif[Math.floor(Math.random() * patgif.length)]
    embed.setColor(colors);
    embed.setFooter(`BK Bot © By BurnKnuckle!`); 
    embed.setImage(patgifs)
    message.channel.send(embed)
      .catch(e => {
      message.channel.send('Cant Find Any Gifs');
      console.error(e);
      return;
      });
  }
exports.help = {
  name: "pat",
  description: "pats.",
  usage: "pat [someone]",
  example: "+pat @google"
}
  
exports.conf = {
  aliases: [],
  cooldown: 5
}
