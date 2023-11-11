const { MessageEmbed } = require('discord.js')
exports.run = async (client, message, args) => {
  //if (message.deletable) message.delete();
      let devServer = client.guilds.cache.get('805743940597973032')
      let channel = devServer.channels.cache.get('817760857219661834')  
        
      if (!channel)
        channel = devServer.channels.cache.get('815538248398274591');
      if(!devServer) return;

  if (!args[0]) return message.channel.send("Please provide a command name") //or command aliase
  let avatar = message.author.avatarURL({size: 2048})
  let commands = client.commands.map(command=> command.help.name)
  let aliase = client.commands.get(client.aliases.get(args[0]))
  await commands
  for(i = 0; i <= client.commands.size; i++) {
    if(commands[i] == args[0]){
      if (!args[1])
        return message.channel.send("Please provide a reason for the report")
      if (args.slice(1).join(" ").length > 1024) return message.channel.send(`Reason Should Be less Than \`1024 Words\`, Shot It Please!`)

    const devembed = new MessageEmbed()
    .setColor("GOLD")
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL)
    .setAuthor(`Report On Command: ~${commands[i]}`, avatar)
    .addFields(
      { name: `**Server Name**`, value: `${message.guild.name}\nID: ${message.guild.id}`, inline: true},
      { name: `**Reported User**`, value: `UserName: ${message.author.username}\nID: ${message.author.id}`, inline: true},
      { name: `**Reason**`, value: `${args.slice(1).join(" ")}`},
      { name: `**Reported Channel From**`, value: `${message.channel}\nID: ${message.channel.id}`},
  )
    channel.send(devembed).catch(err=> console.log(err))
    let suss = new MessageEmbed()
    .setColor("#62FC1A")
    .setTimestamp()
    .setTitle(`Report Successfully!`)
    .setFooter(`${message.guild.name} |`)
    .setDescription(`Command Name: **${commands[i]}**\nSent The Report To my Devs **! BurnKnuckle(Big BRO!** & **Mr.Machine**\nMake Sure Your **Dm's Is Open**, So If They Have Any Doubt's, **They Will Contact You ${message.author.username}!** `)
    .setAuthor(`Report On Command: ~${commands[i]}`, avatar)
    return message.channel.send(suss).catch(err=> console.log(err))
    } else {
      if(aliase){
        if (!args[1]) return message.channel.send("Please provide a reason for the Bug")
        if (args.slice(1).join(" ").length > 1024) return message.channel.send(`Reason Should Be less Than \`1024 Words\`, Shot It Please!`)
        const devembed = new MessageEmbed()
            .setColor("GOLD")
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL)
            .setAuthor(`Report On Command: ~${commands[i]}`, avatar)
            .addFields(
              { name: `**Server Name**`, value: `${message.guild.name}\nID: ${message.guild.id}`, inline: true},
              { name: `**Reported User**`, value: `UserName: ${message.author.username}\nID: ${message.author.id}`, inline: true},
              { name: `**Reason**`, value: `${args.slice(1).join(" ")}`},
              { name: `**Reported Channel From**`, value: `${message.channel}\nID: ${message.channel.id}`},
          )
        channel.send(devembed).catch(err=> console.log(err))
        let suss = new MessageEmbed()
        .setColor("#62FC1A")
        .setTimestamp()
        .setTitle(`Report Successfully!`)
        .setFooter(`${message.guild.name} |`)
        .setDescription(`Command Name: **${commands[i]}**\nSent The Report To my Devs **! BurnKnuckle(Big BRO!** & **Mr.Machine**\nMake Sure Your **Dm's Is Open**, So If They Have Any Doubt's, **They Will Contact You ${message.author.username}!** `)
        .setAuthor(`Report On Command: ~${commands[i]}`, avatar)
        return message.channel.send(suss).catch(err=> console.log(err))
        }

    }
  }
  let notacommand = new MessageEmbed()
    .setAuthor(`:warning: Wrong Command Name Or Aliase :warning:`, avatar)
    .setColor('GOLD')
    .setDescription(`Kindly Check That its A Command Or Aliase!`)
    .setTimestamp()
    return message.channel.send(notacommand)
}



exports.help = {
  name: "report",
  description: "Report Us If any problems!",
  usage: "<prefix>report <command name> <reason> ",
  example: "+report contact no one contacted yet!..."
};

exports.conf = {
  aliases: [],
}