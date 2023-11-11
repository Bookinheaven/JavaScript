const { MessageEmbed } = require('discord.js');
exports.run = async (client, message, args) => {
    const embed = new MessageEmbed();
    if (!message.mentions.users.first()) return message.reply("You Need To Mention Someone!");
    if (message.mentions.users.first().id == message.author.id) return message.reply("I Don't Know If Thats Possible Chief")
    embed.setTitle(`${message.author.username} Makes Happier ${message.mentions.users.first().username}!`);
    randomNum = Math.floor(Math.random() * 101) + 1 // random starts from 1 to 100 = randomNum
    tip = ['Bored Using This Command Try Out Using The Commmand `img`', 'Bored Using This Command Try Out `Try Out Economy System`', 'Bored Using This Command Try Out Using The Commmand `meme`', 'Bored Using This Command Try Out Using The Commmand `play Alanwalker Faded` or `search Alanwalker faded`']
    let tips = tip[Math.floor(Math.random() * tip.length)]
    if(randomNum < 10){
        message.channel.send(`**TIP**: ${tips}`)
    }
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
  let colors = color[Math.floor(Math.random() * color.length)]
    var happygif = [
      'https://media1.tenor.com/images/04c9e57a1cb8445026ad6ba210d33c03/tenor.gif?itemid=15696882',
      'https://media1.tenor.com/images/325b3ba6a2beabe21c79b54c6de4e2c7/tenor.gif?itemid=15060821',
      'https://media1.tenor.com/images/930ceba3996715ca8c72a89169d813f8/tenor.gif?itemid=14223414',
      'https://media1.tenor.com/images/76cd13cb5f2eb2f97aa038831bc94dda/tenor.gif?itemid=9596035',
      'https://media.tenor.com/images/41a994bafff46055aaf9839499cdae80/tenor.gif',
      'https://media.tenor.com/images/e73b60a5344de3a41c2243a80bb26637/tenor.gif'
      
      ]
    let happygifs = happygif[Math.floor(Math.random() * happygif.length)]
    embed.setColor(colors);
    embed.setFooter(`BK Bot © By BurnKnuckle!`); 
    embed.setImage(happygifs)
    message.channel.send(embed)
    .catch(e => {
      message.channel.send('Cant Find Any Gifs');
      console.error(e);
      return;
      });
  }
exports.help = {
  name: "happy",
  description: "Happiness is often defined as a pleasant emotional state that is characterized by feelings of contentment, joy, gratification, satisfaction, and well-being.",
  usage: "happy [someone]",
  example: "+happy @google"
}
  
exports.conf = {
  aliases: [],
  cooldown: 5
}
