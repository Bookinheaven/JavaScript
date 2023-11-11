const { MessageEmbed } = require('discord.js')
var cheerio = require("cheerio");
var request = require("request");
const badwords = ['xxx', 'sex', 'fuck', 'boobs', 'ass', 'labia', 'porn', 'bitch', 'bellend', 'penis head', 'noob', 'nude girls', 'arse', 'butt', 'cunt', 'vagina', 'Testicles', 'Poop', 'crap', 'fucker', 'fk', 'suck', 'sucker', 'gay','porn' , 'shit', 'bullshit']
exports.run = async (client, message, args) => {
  
  let text = args.join(' ').toLowerCase()
      for (word in badwords){
          for(str of badwords){
            if(text.includes(str)) return message.reply('No Bad Search!')
      }
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
        const embed = new MessageEmbed();
          var options = {
            url: "http://results.dogpile.com/serp?qc=images&q=" + text + '&contentfilter=high',
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"
            }
        };
        await request(options, function(error, response, responseBody) {
            if (error) {
                // handle error
                return;
            }
            $ = cheerio.load(responseBody); 
            var links = $(".image a.link");
            var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
                if (!urls.length) {
                    // Handle no results
                    return;
                }
                embed.setTitle(`Image Search ${text}`);
                embed.setColor(colors);
                embed.setImage(urls[Math.floor(Math.random() * urls.length)]);
                embed.setFooter(`BK Bot © By BurnKnuckle!`);
                // Send result
                message.channel.send(embed);
              })
}

  exports.help = {
    name: "image",
    description: "Show a image.",
    usage: "image [name]",
    example: "+image Google"
  }
    
  exports.conf = {
    aliases: ['img'],
    cooldown: 5
  }