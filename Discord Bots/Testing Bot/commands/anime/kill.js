const { MessageEmbed } = require('discord.js');
exports.run = async (client, message, args) => {
    const embed = new MessageEmbed();
    if (!message.mentions.users.first()) return message.reply("You Need To Mention Someone To Kill Them!");
    if (message.mentions.users.first().id == message.author.id) return message.reply("I Don't Know If Thats Possible Chief")
    embed.setTitle(`${message.author.username} Wasted ${message.mentions.users.first().username}!`);
    
    var killgif = [
      'https://media1.tenor.com/images/bb79ec22351406ccda24384ca2441fcf/tenor.gif?itemid=18042592',
      'https://media1.tenor.com/images/4570aed0d818e791cd69f2fe8417369c/tenor.gif?itemid=18042578',
      'https://media.tenor.com/images/fef4eccd601652ed2c1f7d24ed0f31ba/tenor.gif',
      'https://media.tenor.com/images/6192dbf540b3a5f2e5fb8b972d2856a4/tenor.gif',
      'https://media.tenor.com/images/53556b3925ecd0cf3f67c7c0490596df/tenor.gif',
      'https://media.tenor.com/images/fe89919039e43c4c681bdb46358a502f/tenor.gif',
      'https://media1.tenor.com/images/560c804176fd19aa9bb8a4d32f1a3041/tenor.gif?itemid=17608722'

      ]
    let killgifs = killgif[Math.floor(Math.random() * killgif.length)]
    embed.setColor('#FF0000');
    embed.setFooter(`BK Bot © By BurnKnuckle!`); 
    embed.setImage(killgifs)
    message.channel.send(embed)
    .catch(e => {
      message.channel.send('Cant Find Any Gifs');
      console.error(e);
      return;
      });
  }
exports.help = {
  name: "kill",
  description: "kill anime gifs.",
  usage: "kill [someone]",
  example: "+kill @google"
}
  
exports.conf = {
  aliases: [],
  cooldown: 5
}
