const Discord = require('discord.js')
const economyModel = require('../../models/onlyguild')
const ecostoreModel = require('../../models/userstuff')
exports.run = async (client, message, args) => {
    let text = args.join(" ")
    const data = await economyModel.findOne({
        GuildID: message.guild.id
    })
    let normal_prefix = data.Prefix
    if (!text){
        let embed = new Discord.MessageEmbed()
            .addFields(
                { name: '__**VIP Ranks Cost**__', value: '*This VIP Ranks Gives You Lot Of Bonus Stuff!*' },
                //{ name: '\u200B', value: '\u200B' },
                { name: 'Bronze VIP', value: `Cost: 34000[${normal_prefix}buy bronze]\nGive Daily Bonus + 10%`, inline: true },
                { name: 'Gold VIP', value: `Cost: 340000[${normal_prefix}buy gold]\nGive Daily Bonus + 70%`, inline: true },

                { name: '__**Items Cost**__', value: '*This Items Give You Alot Of Coins!*' },
                { name: 'Fishing Rod', value: `Cost: 25000[${normal_prefix}buy Fishing rod]\nUse ${normal_prefix}fish Command and Earn Coins 100 - 10000`},
                { name: 'Hunting Rifle', value: `Cost: 45000[${normal_prefix}buy Hunting rifle]\nUse ${normal_prefix}hunt Command and Earn Coins 1000 - 100000`},

            )
            .setColor("#9B26B6")
            .setThumbnail(message.guild.iconURL())
            .setFooter(`${normal_prefix}store <1> --> for the next store page!`)
        message.channel.send(embed)
    } else if (text == 1){
        let embed = new Discord.MessageEmbed()
            .addFields(
                { name: '__**Important Stuff**__', value: '*Information About Important Items!*' },
                //{ name: '\u200B', value: '\u200B' },
                { name: 'Padlock', value: `Cost: 5000[${normal_prefix}buy padlock]\nProtects You From ROB for 1 time!\n It Will Decrease 50% of money from the robber and gives Deposites in Your Wallet!`},
                //{ name: 'Robbable users', value: `Cost: 1000[${normal_prefix}buy ro]\nTells About The Robbable Users In Server`},

            )
            .setColor("#9B26B6")
            .setThumbnail(message.guild.iconURL())
            .setFooter(`${normal_prefix}store <2> --> for the next store page!`)
        message.channel.send(embed)
    } else if (text == 2){
        let embed = new Discord.MessageEmbed()
            .addFields(
                { name: '__**Collectable Stuff!**__', value: '*Information About Collectable Items!*' },
                //{ name: '\u200B', value: '\u200B' },
                { name: 'Toys', value: `Cost: 1000[${normal_prefix}buy toys]`},
                { name: 'Chocolate', value: `Cost: 800[${normal_prefix}buy chocolate]`},
                { name: 'Pizza', value: `Cost: 1200[${normal_prefix}buy pizza]`},
                { name: 'Apple', value: `Cost: 1200[${normal_prefix}buy apple]`},
                { name: 'Golden Apple', value: `Cost: 1600[${normal_prefix}buy golden apple]`},
                { name: 'Orange', value: `Cost: 1800[${normal_prefix}buy orange]`},
                { name: 'Icecream', value: `Cost: 1020[${normal_prefix}buy icecream]`},
            )
            .setColor("#9B26B6")
            .setThumbnail(message.guild.iconURL())
            //.setFooter(`${normal_prefix}store <3> --> for the next store page!`)
        message.channel.send(embed)
    }
}







exports.help = {
    name: "store",
    description: "Buy Items!."
}

exports.conf = {
    aliases: ["shop", 'sh', 'market'],
    cooldown: 10
}
