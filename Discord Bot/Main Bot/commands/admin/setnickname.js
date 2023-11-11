const Discord = require("discord.js");

exports.run = async (client, message, args) => {

  if (!message.me.hasPermission(["MANAGE_GUILD" || "ADMINISTRATOR" || `MANAGE_NICKNAMES`])) {
    return message.channel.send({embed: {color: "RED", description: "I can't use this command! Turn On Change NickNames"}})
  }
  // You can make a single array to detect the user permissions.
  if (!message.member.hasPermission(["MANAGE_GUILD" || "ADMINISTRATOR"|| `MANAGE_NICKNAMES`])) {
    return message.channel.send({embed: {color: "RED", description: "You can't use this command!"}})
  }
  
  let user = message.mentions.users.first(); // You can mention someone, not only just user.
  if (!user) return message.channel.send({embed: {color: "RED", description: "You need to mention the user!"}});
  
  let nick = args.slice(1).join(" ");
  if (!nick) return message.channel.send({embed: {color: "RED", description: "You need to input the nickname!"}});
  
  let member = message.guild.members.cache.get(user.id);
  
  await member.setNickname(nick).catch(err => console.log(err));
  return message.channel.send({embed: {color: "GREEN", description: `Successfully changed **${user.tag}** nickname to **${nick}**`}});
}


exports.help = {
  name: "setnickname",
  description: "Change Your Guild Members Nick Name!",
  usage: "+setnickname <Mention> <New Name>",
  example: "+setnickname @BK BK Comrade"
}

exports.conf = {
  aliases: ['setnick'],
  cooldown: 10
}
