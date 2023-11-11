const { MessageEmbed } = require('discord.js');
exports.run = async (client, message, args) => {
    const embed = new MessageEmbed();
    if (!message.mentions.users.first()) return message.reply("You Need To Mention Someone To Hug Them!");
    if (message.mentions.users.first().id == message.author.id) return message.reply("I Don't Know If Thats Possible Chief")
    embed.setTitle(`${message.author.username} Hugs ${message.mentions.users.first().username}!`);
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
    var huggif = [
      'https://media1.tenor.com/images/4db088cfc73a5ee19968fda53be6b446/tenor.gif?itemid=14637016',
      'https://media1.tenor.com/images/34a1d8c67e7b373de17bbfa5b8d35fc0/tenor.gif?itemid=8995974',
      'https://media1.tenor.com/images/c7efda563983124a76d319813155bd8e/tenor.gif?itemid=15900664',
      'https://media1.tenor.com/images/aeb42019b0409b98aed663f35b613828/tenor.gif?itemid=14108949',
      'https://media1.tenor.com/images/e58eb2794ff1a12315665c28d5bc3f5e/tenor.gif?itemid=10195705',
      'https://media.tenor.com/images/6083ba11631dd577bcc271268d010832/tenor.gif',
      'https://media.tenor.com/images/9fe95432f2d10d7de2e279d5c10b9b51/tenor.gif'
      
      ]
    let huggifs = huggif[Math.floor(Math.random() * huggif.length)]
    embed.setColor(colors);
    embed.setFooter(`BK Bot © By BurnKnuckle!`); 
    embed.setImage(huggifs)
    message.channel.send(embed)
    .catch(e => {
      message.channel.send('Cant Find Any Gifs');
      console.error(e);
      return;
      });
  }
exports.help = {
  name: "hug",
  description: "hugs.",
  usage: "hug [someone]",
  example: "+hug @google"
}
  
exports.conf = {
  aliases: [],
  cooldown: 5
}
