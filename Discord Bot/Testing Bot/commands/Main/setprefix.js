const prefixModel = require("../../models/onlyguild")

exports.run = async (client, message, args) => {
    const data = await prefixModel.findOne({
        GuildID: message.guild.id
    })
    if (!message.member.permissions.any(["ADMINISTRATOR", "MANAGE_GUILD", "KICK_MEMBERS", "BAN_MEMBERS"])) {
        return message.channel.send("<a:uncheck:800984261192187914> You Dont' Have Permission To Change Prefix\n Kindly Check That You Have Administrator Or Manage Guild Or Kick Members & Ban Members");
      }
    if (!args[0]) return message.channel.send('You must provide a **new prefix**!');
    if (args[0].length > 5) return message.channel.send('Your new prefix must be under \`5\` characters!')

    if (!data){
        let newData = new prefixModel({
            GuildID: message.guild.id,
            Prefix: args[0]
        })
        newData.save();
        return message.channel.send(`Prefix Changed To **\`${args[0]}\`**`);
    }

    if (data) {
        if (args[0] === data.Prefix) return message.channel.send('Please Provide A New Prefix Not Your Server Prefix')
        data.Prefix = args[0]
        data.save().catch(err => console.log(err));

        return message.channel.send(`Prefix Changed To **\`${args[0]}\`**`);
    }

}


exports.help = {
    name: "setprefix",
    description: "Custom Prefix For Server",
    usage: "+setprefix <New Prefix>",
    example: "+setprefix ="
  }
  
  exports.conf = {
    aliases: ['prefix'],
    cooldown: 10
  }
  