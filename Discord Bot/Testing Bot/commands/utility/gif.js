const { MessageEmbed } = require('discord.js')
var cheerio = require("cheerio");
var request = require("request");
const badwords = ['xxx', 'sex', 'fuck', 'boobs', 'ass', 'labia', 'porn', 'bitch', 'bellend', 'penis head', 'noob', 'nude girls', 'arse', 'butt', 'cunt', 'vagina', 'Testicles', 'Poop', 'crap', 'fucker', 'fk', 'suck', 'sucker', 'gay','porn' , 'shit', 'bullshit']
exports.run = async (client, message, args) => {
  if (message.author.id === "751028800720207902" || message.author.id === "575680249380077588"|| message.author.id === "727611782683689030") {
    let text = args.join(' ').toLowerCase()
      for (word in badwords){
          for(str of badwords){
            if(text.includes(str)) return message.reply('No Bad Search!')
      }
    }
        const embed = new MessageEmbed();
          var options = {
            url: "http://results.dogpile.com/serp?qc=images&q="+ text + 'gif'+'&contentfilter=high',
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
                embed.setTitle(`GIF Search ${text}`);
                embed.setColor('RANDOM');
                embed.setImage(urls[Math.floor(Math.random() * urls.length)]);
                embed.setFooter(`BK Bot © By BurnKnuckle!`);
                // Send result
                message.channel.send(embed)
                  .catch(e => {
                  message.channel.send('Cant Find Any Gifs');
                  //console.error(e);
                  return;
                });
              })
  } else {
    message.reply('Only Mr.Machine, DreamKiller & BurnKnuckle Can Use This Commmand!');
          }
}

  exports.help = {
    name: "gif",
    description: "Show a Gifs.",
    usage: "gif [name]",
    example: "+gif Google"
  }
    
  exports.conf = {
    aliases: [],
    cooldown: 5
  }