const Discord = require("discord.js");
const economyModel = require('../../models/guildstuff')
const ecostoreModel = require('../../models/userstuff')
module.exports.run = async (client, message, args) => {
    const data = await economyModel.findOne({
        GuildID: message.guild.id,
        UserID: message.author.id
    })
    const author = await ecostoreModel.findOne({
        UserID: message.author.id
    })
    if(!args[0]) return message.channel.send(`Syntax:
             <prefix>use padlock or banknote`)
    let text = args[0].toLowerCase()
    if(!author){
        return message.channel.send('You Still Didnt Used Daily Or Work Command!')
    }
    if(text == 'padlock'){
        if(data.padlock == false) {
                if(author.padlocks >= 1){
                    author.padlocks -= parseInt(1)
                    author.save().catch(err => console.log(err))

                    data.padlock = true
                    data.Timeofpadlock = Date.now()
                    data.save().catch(err => console.log(err))
                    return message.reply('You Used Padlock From Now No One Can rob you for the first time!')
                } else{
                    message.reply('You Dont Have Any PadLocks In Your Inventory, Want To Buy? use Command `store`')
                }
                
        } else if(data.padlock == true) {
                return message.reply('Your Padlock is already In Use!')
        }
    } else if(text == 'banknote'){
        if(author.banknotes >= 1){
            author.banknotes -= parseInt(1)
            author.Bankspace += 5000
            //author.Timeofbanknote = Date.now()
            author.save().catch(err => console.log(err))
            return message.reply('<a:banknote:804663263349440512> You Used BankNote Add You Got Added 5000 Bank Space Enjoy! XD')
        } else{
            message.reply('You Dont Have Any BankNotes In Your Inventory, Want To Buy? use Command `store`')
        }
    } else if(text == 'ro'){
        if(author.robb >= 1){
            author.robb -= parseInt(1)
            author.Bankspace += 5000
            author.save().catch(err => console.log(err))
            return message.reply('<a:banknote:804663263349440512> You Used BankNote Add You Got Added 5000 Bank Space Enjoy! XD')
        } else{
            message.reply('You Dont Have Any BankNotes In Your Inventory, Want To Buy? use Command `store`')
        }
    } 
    
    else {
        message.channel.send(`You Can Only Use Padlock & banknote`)
    }
}

exports.help = {
    name: "use",
    description: "use Items!."
}

exports.conf = {
    aliases: [],
    cooldown: 10
}
