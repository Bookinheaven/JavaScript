const Discord = require("discord.js");
const ms = require("parse-ms");
const mongoose = require('mongoose')
const ecostoreModel = require('../../models/userstuff')
exports.run = async (client, message, args) => {
    const user = await ecostoreModel.findOne({
        UserID: message.author.id
    })
    
    const amount = args[0]
    const result = Math.floor(Math.random() * 10);
    const balance = user.Balance
    
    if (!amount) return message.channel.send("Please insert an amount first.");
    if (isNaN(amount)) return message.channel.send("The amount was not a number.");
    if (amount > balance || !balance || balance === 0) return message.channel.send("You don't have enough money.");
    
    if (amount < 400) return message.channel.send("You don't have enough money for gambling. The minimum was 400.");

    let cooldown = 300000; // 5Mins
    let pad_zero = num => (num < 10 ? '0' : '') + num;
    try {
        if(!user){
            if (result < 5) {
                if (user) {
                    user.Balance -= parseInt(amount);
                    user.Timeofgam = Date.now()
                await user.save()
                        .catch(err => console.log(err));
               } else if (!user) {
                return message.channel.send('You Need To Use Daily Command Once In My Life')
               }
                return message.channel.send(`Ahh, no. You lose $${amount}. Good luck next time.`);
            } else if (result > 5) {
                if (user) {
                    user.Balance += parseInt(amount);
                    user.Timeofgam = Date.now()
                await user.save()
                        .catch(err => console.log(err));
               } else if (!user) {
                return message.channel.send('You Need To Use Daily Command Once In My Life')
               }
                return message.channel.send(`Woohoo! You won ${amount}! Good luck, have fun!`);
            }
        }
        else if(user){
            let lastGamble = user.Timeofgam
            if (lastGamble !== null && cooldown - (Date.now() - lastGamble) > 0) {
                let timeObj = ms(cooldown - (Date.now() - lastGamble));
                let second = pad_zero(timeObj.seconds).padStart(2, "0");
                return message.channel.send(`Wooo that is too fast. You need to wait **${second}** second(s) before you can gambling again.`);
            
            } else {
                // 50:50
                if (result < 5) {
                    if (user) {
                        user.Balance -= parseInt(amount);
                        user.Timeofgam = Date.now()
                    await user.save()
                            .catch(err => console.log(err));
                   } else if (!user) {
                    return message.channel.send('You Need To Use Daily Command Once In My Life')
                   }
                    return message.channel.send(`Ahh, no. You lose $${amount}. Good luck next time.`);
                } else if (result > 5) {
                    if (user) {
                        user.Balance += parseInt(amount);
                        user.Timeofgam = Date.now()
                    await user.save()
                            .catch(err => console.log(err));
                   } else if (!user) {
                    return message.channel.send('You Need To Use Daily Command Once In My Life')
                   }
                    return message.channel.send(`Woohoo! You won ${amount}! Good luck, have fun!`);
                }
            }
        }
    } catch (error) {
        console.log(error);
        }
}

exports.help = {
    name: "gamble",
    description: "An efficient way to double your money.",
    usage: "gamble <bet/amount>",
    example: "gamble 500"
}

exports.conf = {
    aliases: ["gambling"],
    cooldown: 5
}
