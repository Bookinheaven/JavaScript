const { MessageEmbed } = require('discord.js');
exports.run = async (client, message, args) => {
    const embed = new MessageEmbed();
    if (!message.mentions.users.first()) return message.reply("You Need To Mention Someone To Love Them!");
    if (message.mentions.users.first().id == message.author.id) return message.reply("I Don't Know If Thats Possible Chief")
    embed.setTitle(`${message.author.username} Loves ${message.mentions.users.first().username}!`);

    var lovesgif = [
      'https://media1.tenor.com/images/c251343262ab40b922b1b05d007f2b94/tenor.gif?itemid=5180037',
      'https://media1.tenor.com/images/59371e16bf2c92a158a0bf84e1e70bb6/tenor.gif?itemid=12479110',
      'https://media.tenor.com/images/e9308b0dfe3281150db831f86c4035aa/tenor.gif',
      'https://media.tenor.com/images/6f80dcaf38625704b182dae689a5af3a/tenor.gif',
      'https://media.tenor.com/images/f90cff0ee0512532452cec2aa8c55b4f/tenor.gif',
      'https://media1.tenor.com/images/fb1aa76944c156acc494fff37ebdbcfa/tenor.gif?itemid=14521920'
      
      ]
      randomNum = Math.floor(Math.random() * 101) + 1 // random starts from 1 to 100 = randomNum
      tip = ['Bored Using This Command Try Out Using The Commmand `img`', 'Bored Using This Command Try Out `Try Out Economy System`', 'Bored Using This Command Try Out Using The Commmand `meme`', 'Bored Using This Command Try Out Using The Commmand `play Alanwalker Faded` or `search Alanwalker faded`']
      let tips = tip[Math.floor(Math.random() * tip.length)]
      if(randomNum < 10){
          message.channel.send(`**TIP**: ${tips}`)
      }
    let lovesgifs = lovesgif[Math.floor(Math.random() * lovesgif.length)]
    
    embed.setColor('#FF01E8');
    embed.setFooter(`BK Bot © By BurnKnuckle!`); 
    embed.setImage(lovesgifs)
    message.channel.send(embed)
    .catch(e => {
      message.channel.send('Cant Find Any Gifs');
      console.error(e);
      return;
      });
  }
exports.help = {
  name: "love",
  description: "loves anime gif.",
  usage: "love [someone]",
  example: "+love @google"
}
  
exports.conf = {
  aliases: [],
  cooldown: 5
}
