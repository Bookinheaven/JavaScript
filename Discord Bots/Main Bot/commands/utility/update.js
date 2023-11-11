const { MessageEmbed } = require('discord.js')
exports.run = async (client, message, args) => {
    if(message.author.id === '751028800720207902' || message.author.id === '575680249380077588'){
        if (message.deletable) message.delete();
    let Embed = new MessageEmbed()
        .setTitle('**Biggest Update!** *Sorry For This But You May Love This New Update!*')
        .setDescription(`**New Systems Added!**\n\nRead Guide By Command '<prefix>guide'!\n1.Leveling System! (new)\n2.Economy System! (updated)\n3.ModLog System! (new)\n4.Music System! (updated)\n5.Welcome System! (updated)\n6.GoodBye System! (new)\n7.Moderation Commands! (updated)\n8.Image Manipulcation! (updated)\n9.Anime Emotions! (updated)\n10.Fun Commands! (new commands)\n11.Speical Commands! (added new bug command)`)
        .setTimestamp()
        .setURL('https://discord.gg/ZBYq7Myz5d')
        .setColor('GOLD')
        .setThumbnail(message.guild.iconURL())
        .addField(`${client.user.username}, For More Information Join:`, "Support Server: [Click here](https://discord.gg/ZBYq7Myz5d)\nBurnKnuckle Comrade Server: [Click here](https://discord.gg/VyasQKfRJc)\nMachine's Lounge | Gaming Server: [Click here](https://discord.gg/EvnYert5Wm)")
        .setImage('https://images.unsplash.com/photo-1467810563316-b5476525c0f9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80')
        .setFooter(`By BurnKnuckle & Mr Machine`)
        message.channel.send(Embed)
    }
}


exports.help = {
    name: "update",
    description: "Sends Messages To All Servers",
    usage: "<prefix>update",
    example: "+update "
}

exports.conf = {
    aliases: [],
    cooldown: 10
}
      