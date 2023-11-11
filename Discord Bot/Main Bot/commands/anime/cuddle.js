const { MessageEmbed } = require('discord.js');
exports.run = async (client, message, args) => {
    const embed = new MessageEmbed();
    if (!message.mentions.users.first()) return message.reply("You Need To Mention Someone!");
    if (message.mentions.users.first().id == message.author.id) return message.reply("I Don't Know If Thats Possible Chief")
    randomNum = Math.floor(Math.random() * 101) + 1 // random starts from 1 to 100 = randomNum
    tip = ['Bored Using This Command Try Out Using The Commmand `img`', 'Bored Using This Command Try Out `Try Out Economy System`', 'Bored Using This Command Try Out Using The Commmand `meme`', 'Bored Using This Command Try Out Using The Commmand `play Alanwalker Faded` or `search Alanwalker faded`']
    let tips = tip[Math.floor(Math.random() * tip.length)]
    if(randomNum < 10){
        message.channel.send(`**TIP**: ${tips}`)
    }
    var sidetitle = ['snuggles' , 'cuddles', 'lovely', 'embrace',  'clasp', 'huddle up']
    let sidetitles = sidetitle[Math.floor(Math.random() * sidetitle.length)]
    var titles = ['cute', 'dorable','adorable' ]
    let title = titles[Math.floor(Math.random() * titles.length)]
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
    var gif = [
      'https://images-ext-1.discordapp.net/external/aHEeT-OpUhaWsKoW-xWO-zhCSoaMD6aMtADxTtlWJ2E/https/images-ext-2.discordapp.net/external/v96Ta_KPLMw94ZnN3H166MLO8bXDIi5fGA6zb6YnEQ4/https/cdn.weeb.sh/images/ByXs1AYKW.gif?width=449&height=469',
      'https://images-ext-1.discordapp.net/external/9P6NuVI8NiRo6_qjzjgS8p9nHdRcoLdxpM72J0PXFy0/https/cdn.weeb.sh/images/r1s9RqB7G.gif',
      'https://images-ext-2.discordapp.net/external/upPbrR5f3Mytsi0lDgPVBDLsH9fXE3I92MopkH6anOM/https/cdn.weeb.sh/images/SkeHkUU7PW.gif',
      'https://images-ext-1.discordapp.net/external/7YFXKUlOiK4j1YgZpbqcVLbKtbjLDEsjvl7QTzrhA5Q/https/cdn.weeb.sh/images/HJMv_k7iW.gif',
      'https://images-ext-1.discordapp.net/external/1lZsqQdSMhy6e6xKpQO6BcKTN1TspByRwpO5YVFIcRo/https/cdn.weeb.sh/images/HkzArUmvZ.gif',
      'https://images-ext-1.discordapp.net/external/x9W2Yh_3mShA6cVtB_88499K-evzS78ei6S5FTmuWF4/https/cdn.weeb.sh/images/r17lwymiZ.gif',
      'https://images-ext-2.discordapp.net/external/r-hQo7CRWPT9YVHmnUsSgDeVSzVOu-iEqH8pVYMlLzU/https/cdn.weeb.sh/images/Hyxo1CFtb.gif',
      'https://images-ext-2.discordapp.net/external/aReNuzveRgyIGtUVE9CeP7XRjJEOnLT17LogTtLMEX4/https/cdn.weeb.sh/images/SyZk8U7vb.gif',
      'https://cdn.weeb.sh/images/BkN0rIQDZ.gif',
      'https://images-ext-1.discordapp.net/external/ajddIhPZ_XgV1D6S6lsZdQaFKYZzMxhspzspH9b43RA/https/cdn.weeb.sh/images/SJbGLUQwZ.gif',
      'https://cdn.weeb.sh/images/rkA6SU7w-.gif'
      
      ]
    let gifs = gif[Math.floor(Math.random() * gif.length)]
    let avatar = message.author.avatarURL({size: 2048}); // Use 2048 for high quality avatar.
    embed.setAuthor(`${message.author.username} ${sidetitles} ${message.mentions.users.first().username}-${title}!`, avatar)
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
  name: "cuddle",
  description: "hold close in one's arms as a way of showing love or affection.",
  usage: "cuddle [someone]",
  example: "+cuddle @google"
}
  
exports.conf = {
  aliases: [],
  cooldown: 5
}
