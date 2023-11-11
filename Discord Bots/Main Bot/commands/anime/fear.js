const { MessageEmbed } = require('discord.js');
exports.run = async (client, message, args) => {
    const embed = new MessageEmbed();
    if (!message.mentions.users.first()) return message.reply("You Need To Mention Someone!");
    if (message.mentions.users.first().id == message.author.id) return message.reply("I Don't Know If Thats Possible Chief")
    embed.setTitle(`${message.author.username} Scared ${message.mentions.users.first().username}!`);
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
      'https://media1.tenor.com/images/3565384f7d317d10863b140159426d86/tenor.gif?itemid=12136289',
      'https://media.tenor.com/images/c125b22473c4d84b7340ab0575945d46/tenor.gif',
      'https://media1.tenor.com/images/829dc75ce10106dc1cace052b4fdccaa/tenor.gif?itemid=13995135',
      'https://media1.tenor.com/images/def9e92f5e00d8c7273fdf5f24fae7a2/tenor.gif?itemid=13273206',
      'https://media1.tenor.com/images/c923efcfea61a40ae7e05712ebee01be/tenor.gif?itemid=15316781',
      'https://media.tenor.com/images/3b55433596b29309d99802a6ba5ae0e1/tenor.gif',
      'https://media.tenor.com/images/141b82d71aa5062c2e4596001bb0ddcd/tenor.gif',
      'https://media.tenor.com/images/09e2a629076aa30c0717dff5acbe8068/tenor.gif',
      'https://media.tenor.com/images/d1c464c605eb2379ecafef7359118f94/tenor.gif',
      'https://media.tenor.com/images/d800af6984eca877b07e9276664ac0b4/tenor.gif'
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
  name: "fear",
  description: "Fear is a powerful emotion that can also play an important role in survival. When you face some sort of danger and experience fear.",
  usage: "fear [someone]",
  example: "+fear @google"
}
  
exports.conf = {
  aliases: [],
  cooldown: 5
}
