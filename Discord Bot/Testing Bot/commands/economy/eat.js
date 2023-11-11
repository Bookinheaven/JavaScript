const Discord = require("discord.js")
const { rand } = require('../../functions')
const ecostoreModel = require('../../models/userstuff')
exports.run = async (client, message, args) => {
    const data = await ecostoreModel.findOne({
        UserID: message.author.id
    })
    if(!data){
        return message.channel.send('You Still Didnt Used Daily Or Work Command!')
    }
    if(!args[0]) return message.channel.send(`Syntax:
             <prefix>eat chocolate, Pizza`)
    let text = args[0].toLowerCase()
    if(data){
            if(text == 'chocolate'){
                if(data.chocolate >= 1){
                    let random = rand(200,500)
                    data.chocolate -= 1
                    data.Balance += random
                    data.save().catch(err => console.log(err))
                    let avatar = message.author.avatarURL({size: 2048}); // Use 2048 for high quality avatar.
                    let embed = new Discord.MessageEmbed()
                    .setAuthor(`${message.author.username}`, avatar)
                    .setColor('#ffb400')
                    .setDescription(`You Got ${random} Coins!`)
                    return message.channel.send(embed)
                } else if (data.chocolate == 0){
                    return message.channel.send(`${message.author.username} You Dont Have a Chocolate`)
                }
        } else if (text == 'pizza'){
            if(data.pizza >= 1){
                let random = rand(800,1000)
                data.Balance += random
                data.save().catch(err => console.log(err))
                let avatar = message.author.avatarURL({size: 2048}); // Use 2048 for high quality avatar.
                let embed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.username}`, avatar)
                .setColor('#ffb400')
                .setDescription(`You Got ${random} Coins!`)
                return message.channel.send(embed)
            } else if (data.pizza == 0){
                return message.channel.send(`${message.author.username} You Dont Have a Pizza!`)
            }
        }
    
    }
}
exports.help = {
    name: "eat",
    description: "Eat Stuff And Earn Money!",
    usage: 'eat <some item>',
    example: '*eat chocolate'
}

exports.conf = {
    aliases: [],
    cooldown: 5
}
