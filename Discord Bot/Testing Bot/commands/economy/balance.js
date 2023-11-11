const Discord = require("discord.js");
const ecostoreModel = require('../../models/userstuff')
exports.run = async (client, message, args) => {

    let user;
    if (message.mentions.users.first()) {
        user = message.mentions.users.first();
    } else if (args[0]) {
        user = message.guild.members.cache.get(args[0]).user;
    } else {
        user = message.author;
    }

    if (user.bot || user === client.user) {
        return message.channel.send("This user is a bot.");
        // If the user was a bot, ignore it.
    }

    const userid = await ecostoreModel.findOne({
        UserID: user.id
    })

    if (userid) {
        let balance = userid.Balance
        let bank = userid.Bank
        let capability = userid.Bankspace
        let perce = capability - bank 
        let percentage = perce / capability * 100
        var str = `${percentage}`;
        var res = str.substring(0,3);
        const embed = new Discord.MessageEmbed()
        embed.addField("Balance: ", `${(balance).toLocaleString()}`)
        embed.addField("Bank Balance:", `${(bank).toLocaleString()}, (Space Left: \`${res}%\`)`)
        total = balance + bank
        embed.setColor(0x7289DA)
        embed.setTitle(`Balance of ${user.tag}`)
        embed.addField("Total Balance: ", `${(total).toLocaleString()}`)
        embed.setThumbnail(user.displayAvatarURL({size: 4096, dynamic: true}))
        embed.setTimestamp(new Date)
        return message.channel.send(embed);
  
    } else if (!userid){
        if (userid === null) {
            balance = 0;
            bank = 0;
            total = 0;
            const embed = new Discord.MessageEmbed()
            .setColor(0x7289DA)
            .setTitle(`Balance of ${user.tag}`)
            .addField("Balance", `${(balance).toLocaleString()}`)
            .addField("Bank Balance", `${(bank).toLocaleString()}`)
            .addField("Total Balance", `${(total).toLocaleString()}`)
            .setThumbnail(user.displayAvatarURL({size: 4096, dynamic: true}))
            .setTimestamp(new Date)
            return message.channel.send(embed);
        }
    }
    
    
}

exports.help = {
    name: "balance",
    description: "Checking yours, or other members money.",
    usage: "balance [@user | user ID]",
    example: "balance \nbalance @burn"
}
  
exports.conf = {
    aliases: ["bal", "coin", "money", "credit"],
    cooldown: 5
}
