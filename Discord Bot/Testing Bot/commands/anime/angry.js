const { MessageEmbed } = require('discord.js');
exports.run = async (client, message, args) => {
    const embed = new MessageEmbed();
    if (!message.mentions.users.first()) return message.reply("You Need To Mention Someone!");
    if (message.mentions.users.first().id == message.author.id) return message.reply("I Don't Know If Thats Possible Chief")
    let avatar = message.author.avatarURL({size: 2048}); // Use 2048 for high quality avatar.
    embed.setAuthor(`${message.author.username} Angry On ${message.mentions.users.first().username}!`, avatar)
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
      'https://media1.tenor.com/images/0b42fed5a4b7ff4e5f9c7680059cf0da/tenor.gif?itemid=11102640',
      'https://media.tenor.com/images/ef795689617a8c97379b297fd7557235/tenor.gif',
      'https://media.tenor.com/images/8f0fd194a5af38663c43d0c5b6d7042b/tenor.gif',
      'https://media.tenor.com/images/f1c73d36e72343d0e26d4da210155796/tenor.gif',
      'https://media.tenor.com/images/6665c57af123e46c25195d4bcea1c13b/tenor.gif',
      'https://media.tenor.com/images/bdbfd51c62207fbe1d5c0672c6cadd41/tenor.gif',
      'https://media.tenor.com/images/05ce3419afc1d528f53ba657c2101783/tenor.gif'
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
  name: "angry",
  description: "Anger can be a particularly powerful emotion characterized by feelings of hostility, agitation, frustration, and antagonism towards others. Like fear, anger can play a part in your body's fight or flight response",
  usage: "angry [someone]",
  example: "+angry @google"
}
  
exports.conf = {
  aliases: [],
  cooldown: 5
}
