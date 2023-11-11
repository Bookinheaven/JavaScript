const Discord = require("discord.js");
const economyModel = require('../../models/guildstuff')
const ecostoreModel = require('../../models/userstuff')

module.exports.run = async (client, message, args) => {

    const data = await ecostoreModel.findOne({
        UserID: message.author.id
    })
        if(data){
            let member = data.Bank
            if (args[0] == 'all') {
                let money = data.Balance
                let bank = data.Bank      
                let embedbank = new Discord.MessageEmbed()
                .setColor('#FFFFFF')
                .setDescription("You don't have any money to Withdraw")
            
                if(bank === 0) return message.channel.send(embedbank)
                data.Bank -= parseInt(bank)
                data.Balance += parseInt(bank)
                await data.save().catch(err => console.log(err));
                let embed5 = new Discord.MessageEmbed()
                .setColor("#FFFFFF")
                .setDescription(`You have Withdrawed all your coins into your bank`);
                 message.channel.send(embed5)
              
              } else {
              
              let embed2 = new Discord.MessageEmbed()
              .setColor("#FFFFFF")
              .setDescription(`Specify an amount to Withdraw`);
              
              if (!args[0]) {
                  return message.channel.send(embed2)
                  .catch(err => console.log(err))
              }
              let embed3 = new Discord.MessageEmbed()
              .setColor("#FFFFFF")
              .setDescription(`You can't Withdraw negative money`);
            
              if (message.content.includes('-')) { 
                  return message.channel.send(embed3)
              }
              let embed4 = new Discord.MessageEmbed()
              .setColor("#FFFFFF")
              .setDescription(`You don't have that much money`);
            
              if (member < args[0]) {
                  return message.channel.send(embed4)
              }
              let embed6 = new Discord.MessageEmbed()
              .setColor("#FFFFFF")
              .setDescription(`Pleace Remove \`,\` From The Money`);
            
              if (message.content.includes(',')) { 
                  return message.channel.send(embed6)
              }
    
              let embed5 = new Discord.MessageEmbed()
              .setColor("#FFFFFF")
              .setDescription(`You have Withdrawed ${args[0]} coins into your bank`);
              message.channel.send(embed5)
              data.Bank -= parseInt(args[0])
              data.Balance += parseInt(args[0])
              await data.save().catch(err => console.log(err));
        }
        } else if (!data){
            return message.channel.send('You Need To Use Daily Command Once In My Life')
        }
}


exports.help = {
    name: "withdraw",
    description: "Withdraw Money From Bank.",
    usage: "withdraw <amount> or <all>",
    example: "withdraw all\nwithdraw 104051"
}
  
exports.conf = {
    aliases: ['wid', 'giveback', 'with', 'bankdraw'],
    cooldown: 5
}
