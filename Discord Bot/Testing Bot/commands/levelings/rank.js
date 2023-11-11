const Discord = require("discord.js");
const leveling = require('../../models/guildstuff')
const canvacord = require("canvacord");
const ownrank = require('../../include/rankset')

module.exports.run = async (client, message, args) => {
    let user;
    if (message.mentions.users.first()) {
        user = message.mentions.users.first();
    } else if (args[0]) {
        user = message.guild.members.cache.get(args[0]).user;
    } else {
        user = message.author;
    }

    if (user.bot || user === client.user) {
        return message.channel.send("This User Is A Bot.");
    }
     
    const userData =  await leveling.findOne({
       GuildID: message.guild.id,
       UserID: user.id
    });
    const leaderboard = await leveling.find({
        GuildID: message.guild.id
      }).sort([['xp', 'descending']]).exec();
      let UserId = user.id
      let bksrank = leaderboard.findIndex(i => i.UserID === UserId) + 1;
    const requiredXP = client.leveling.getlevel(userData.Levels)


      const own = new ownrank()
        .setAvatar(user.displayAvatarURL({ dynamic: false, format: 'png'}))
        .setRank(bksrank)
        .setCurrentXP(userData.XP)
        .setRequiredXP(requiredXP)
        .setBackground('IMAGE', 'https://images.unsplash.com/photo-1524169358666-79f22534bc6e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80')
        .setStatus(user.presence.status, true, true)
        .setProgressBar("#FFFFFF", "COLOR")
        .setLevel(userData.Levels)
        .setUsername(`${user.username}`)
        .setDiscriminator(user.discriminator);

        own.build()
        .then(data => {
            const attachment = new Discord.MessageAttachment(data, "RankCards.png");
            message.channel.send(attachment);
        });

}

exports.help = {
    name: "rank",
    description: "Show Your Level Profile!."
  }
  
  exports.conf = {
    aliases: [],
    cooldown: 10
  }