const Discord = require("discord.js");
const leveling = require('../../models/guildstuff')
module.exports.run = async (client, message, args) => {
  const leaderboard = await leveling.find({
    GuildID: message.guild.id
  }).sort([['Levels', 'descending'],['XP', 'descending']]).exec();
    data2 = await leveling.find({
      GuildID: message.guild.id
    }).sort([
      ['Levels', 'descending'],
      ['XP', 'descending']
  ]).exec((err, res) => {
      if (err) console.log(err);
  let embed = new Discord.MessageEmbed()
  .setTitle("Levels Leaderboard!")
    //if there are no results
    if (res.length === 0) {
      embed.setColor("RED");
      embed.setDescription("No data found")
    } else if (res.length < 10) {
      //less than 10 results
      embed.setColor("BLURPLE");
      x = 0
      for (i = 0; i < res.length; i++) {
        let member = message.guild.members.cache.get(res[i].UserID)
        if(member) {
          if(res[i].Levels > 0){
            let total = res[i].Levels
          let XPs = res[i].XP
            let UserId = message.author.id
            let bksrank = leaderboard.findIndex(i => i.UserID === UserId) + 1;
          embed.setFooter(`${message.author.username} Your Top ${bksrank}!`)
          embed.addField(`${x + 1}. ${member.user.username}`, `Level: ${total}, Needed XP: ${XPs + client.leveling.getlevel(total)} XP: ${XPs}/${client.leveling.getlevel(total)}`);
          x++
          }
          
        }
      }
    } else {
      //more than 10 results
      embed.setColor("BLURPLE");
      x=0
      for (i = 0; i < 10; i++) {
        let member = message.guild.members.cache.get(res[i].UserID)
        if (member) {
          if(res[i].Levels > 0){
            let total = res[i].Levels
          let XPs = res[i].XP
            let UserId = message.author.id
            let bksrank = leaderboard.findIndex(i => i.UserID === UserId) + 1;
          embed.setFooter(`${message.author.username} Your Top ${bksrank}!`)
          embed.addField(`${x + 1}. ${member.user.username}`, `Level: ${total}, Needed XP: ${XPs + client.leveling.getlevel(total)} XP: ${XPs}/${client.leveling.getlevel(total)}`);
          x++
          }
        }
      }
    }

    message.channel.send(embed);
  })

}

exports.help = {
    name: "levels",
    description: "Show Leaderboard of levels!."
  }
  
  exports.conf = {
    aliases: [],
    cooldown: 10
  }