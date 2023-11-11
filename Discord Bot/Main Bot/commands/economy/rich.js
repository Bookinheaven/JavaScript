const Discord = require("discord.js");
const ecostoreModel = require('../../models/userstuff')
module.exports.run = async (client, message, args) => {

    const leaderboard = await ecostoreModel.find({
    }).sort([['Bank', 'descending'],['Balance', 'descending']]).exec();
    let UserId = message.author.id
     const  data2 = await ecostoreModel.find({
      }).sort([
        ['Bank', 'descending'],
        ['Balance', 'descending']
    ]).exec((err, res) => {
        if (err) console.log(err);
    let embed = new Discord.MessageEmbed()
    .setTitle("Economy Rich User Leaderboard")
      //if there are no results
      if (res.length === 0) {
        embed.setColor("RED");
        embed.addField("No data found", "Try Work Command Or Daily Command!")
      } else if (res.length < 10) {
        //less than 10 results
        embed.setColor("BLURPLE");
        let x = 0
        for (i = 0; i < res.length; i++) {
          let member = message.guild.members.cache.get(res[i].UserID)
          if(member) {
               x++
              let total = res[i].Bank + res[i].Balance
              embed.addField(`${x}. ${member.user.username}`, `**Total Balance**: ${total}`); 
          }
        }
      } else {
        //more than 10 results
        embed.setColor("BLURPLE");
        let x = 0
        let y = 0
        for (i = 0; i < 10; i++) {
          let member = message.guild.members.cache.get(res[i].UserID)
          if (member) {
            x++
            y++
            let total = res[i].Bank + res[i].Balance
            if(res[i].UserID === UserId){
              embed.setFooter(`${message.author.username} Your in Top ${y++}!`)
            }
            embed.addField(`${x}. ${member.user.username}`, `**Total Balance**: ${total}`); 
          }
        }
      }
  
      message.channel.send(embed);
    })
    
  }
        
exports.help = {
    name: "rich",
    description: "Show Who Are Rich In Server",
    usage: "!rich",
    example: "!rich"
}

exports.conf = {
    aliases: [],
    cooldown: 15
}
            