const Discord = require('discord.js')
const ms = require("parse-ms");
const ecostoreModel = require('../../models/userstuff')

module.exports.run = async (client, message, args) => {
  const userid = await ecostoreModel.findOne({
    UserID: message.author.id
}) 
        let capability = userid.Bankspace  //if bankspace = 1000 it should only dep 1000 and other amount should be normal
        let dep = capability - userid.Bank  //if cal the amount should minus and it tells the bank space
        let cap = dep - userid.Balance  //it finds the value to add in bal and it tells how much remian in the bankspace

    if(userid){
        let member = userid.Balance
        if (args[0] == 'all') {
            let money = userid.Balance
            let embedbank = new Discord.MessageEmbed()
            .setColor('#FFFFFF')
            .setDescription("You Don't have money to deposit")
        
            if(money === 0) return message.channel.send(embedbank)

            if (capability - userid.Bank == 0) return message.channel.send(`You Dont Have Bank Space ${message.author.username}`)
            if (userid.Balance >= dep){
                let val = userid.Balance - dep // this should be the the amount of bank
                let val2 = dep - cap // this should be value minus from the balance
                let shoulddep = val2 - val
                //console.log(`this is the present value of bank ${val} \nthis is the present value of balance ${val2}, should be dep in the bank ${shoulddep}, should be minus from bank ${dep}, total = ${val}/${capability}`)
                userid.Bank += parseInt(shoulddep)
                userid.Balance -= parseInt(dep)
                userid.save().catch(err => console.log(err))
                let embed5 = new Discord.MessageEmbed()
                    .setColor("#FFFFFF")
                    .setDescription(`You have deposited ${dep} coins into your bank`);
                return message.channel.send(embed5)
            }
            else if (userid.Balance < dep){
                let val = dep - data.Balance // this should be the the amount of bank
                let val2 = dep - cap // this should be value minus from the balance
                let shoulddep = val - val2 
                userid.Bank += parseInt(val)
                userid.Balance -= parseInt(val2)
                userid.save().catch(err => console.log(err))
                //console.log(` this is the value of bank ${val} \nthis is the value of balance ${val2}, ${shoulddep}`)
                let embed5 = new Discord.MessageEmbed()
                    .setColor("#FFFFFF")
                    .setDescription(`You have deposited ${val2} coins into your bank`);
                return message.channel.send(embed5)
            }
          
          } else {
          
            let embed2 = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`Specify an amount to deposit`);
            if (!args[0]) {
                return message.channel.send(embed2)
                .catch(err => console.log(err))
            }
            let embed3 = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`You can't deposit negative money`);
            
            if (message.content.includes('-')) { 
                return message.channel.send(embed3)
            }
            let embed4 = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`You don't have that much money`);
            
            if (member < args[0]) {
                return message.channel.send(embed4)
            }
            if (capability - userid.Bank == 0) return message.channel.send(`You Dont Have Bank Space ${message.author.username}`)
                if (args[0] <= dep){
                    let val = dep - args[0] // this should be the the amount of bank
                    let val2 = args[0] - cap  // this should be value minus from the balance
                    //let shoulddep = val2 - val
                    let bankdep = args[0]
                    //console.log(`this is the present value of bank ${val} \nthis is the present value of balance ${val2}, should be dep in the bank ${shoulddep}, should be minus from bank ${bankdep}, total = ${val}/${capability}`)
                    userid.Bank += parseInt(bankdep)
                    userid.Balance -= parseInt(bankdep)
                    userid.save().catch(err => console.log(err))
                    let embed5 = new Discord.MessageEmbed()
                        .setColor("#FFFFFF")
                        .setDescription(`You have deposited ${args[0]} coins into your bank`);
                    return message.channel.send(embed5)
                }
                let embed5 = new Discord.MessageEmbed()
                    .setColor("#FFFFFF")
                    .setDescription(`You don't have that much Bank Space! Buy bank note \`store\``);
                if(args[0] > dep) return message.channel.send(embed5)
        }
        } else if (!userid){

            return message.channel.send('You Need To Use Daily Command Once In My Life')
        }
  
}
exports.help = {
    name: "deposite",
    description: "deposite And save In Bank.",
    usage: "deposite",
    example: "!deposite all"
}

exports.conf = {
    aliases: ['dep', 'take', 'bankdep']
}