const Discord = require("discord.js");
const economyModel = require('../../models/guildstuff')
const ecostoreModel = require('../../models/userstuff')
let ms = require("parse-ms");
exports.run = async (client, message, args) => {
   let cooldown = 8.64e+7;
   let amount = 500;
   let timern = Date.now()
   const user = await ecostoreModel.findOne({
       UserID: message.author.id
   })
   const guild = await economyModel.findOne({
        GuildID: message.guild.id,
        UserID: message.author.id
})
    
   if(!guild){
    let newData = new economyModel({
        GuildID: message.guild.id,
        UserID: message.author.id,
        })
        await newData.save()
                .catch(err => console.log(err));
        return;
   }
   if(user){
        if(user.BronzeVIP == false && user.GoldVIP == false){
            let daily = user.Timeofdialy
            if (daily !== null && cooldown - (Date.now() - daily) > 0) {
                let time = ms(cooldown - (Date.now() - daily));

            let timeEmbed = new Discord.MessageEmbed()
                .setColor("#FFFFFF")
                .setDescription(`You have already collected your daily reward\n\nCollect it again in ${time.hours}h ${time.minutes}m ${time.seconds}s `);
                return message.channel.send(timeEmbed)            
            } else {
                let moneyEmbed = new Discord.MessageEmbed()
                    .setColor("#FFFFFF")
                    .setDescription(`You've collected your Daily reward of ${amount}<a:money:800987439559737344>`);
                message.channel.send(moneyEmbed)
                user.Balance += parseInt(amount);
                user.Timeofdialy = timern
                user.save().catch(err => console.log(err))
            }
        }
        else if(user){
            let bonusamountforbron = 1500
            let bonusamountforgold = 2500
            if(user.BronzeVIP == true){
                if(user.GoldVIP == true){
                    let totalamount = amount + bonusamountforgold
                    let bonusamount = bonusamountforgold
                    let daily = user.Timeofdialy
                    if (daily !== null && cooldown - (Date.now() - daily) > 0) {
                        let time = ms(cooldown - (Date.now() - daily));
                
                    let timeEmbed = new Discord.MessageEmbed()
                        .setColor("#FFFFFF")
                        .setDescription(`You have already collected your daily reward\n\nCollect it again in ${time.hours}h ${time.minutes}m ${time.seconds}s `);
                        return message.channel.send(timeEmbed)            
                    } else {
                        let moneyEmbed = new Discord.MessageEmbed()
                            .setColor("#FFFFFF")
                            .setDescription(`You've collected your Daily reward of ${amount}<a:money:800987439559737344> and You Got Bonus ${bonusamount}, Total: ${totalamount}<a:money:800987439559737344> Because You Have Gold VIP!`);
                        message.channel.send(moneyEmbed)
                        user.Balance += parseInt(totalamount);
                        user.Timeofdialy = timern
                        user.save().catch(err => console.log(err))
                    }
                } else {
                    let totalamount = amount + bonusamountforbron
                    let bonusamount = bonusamountforbron
                    let daily = user.Timeofdialy
                    if (daily !== null && cooldown - (Date.now() - daily) > 0) {
                        let time = ms(cooldown - (Date.now() - daily));
                
                    let timeEmbed = new Discord.MessageEmbed()
                        .setColor("#FFFFFF")
                        .setDescription(`You have already collected your daily reward\n\nCollect it again in ${time.hours}h ${time.minutes}m ${time.seconds}s `);
                        return message.channel.send(timeEmbed)            
                    } else {
                        let moneyEmbed = new Discord.MessageEmbed()
                            .setColor("#FFFFFF")
                            .setDescription(`You've collected your Daily reward of ${amount}<a:money:800987439559737344> and You Got Bonus ${bonusamount}, Total: ${totalamount}<a:money:800987439559737344> Because You Have Bronze VIP!`);
                        message.channel.send(moneyEmbed)
                        user.Balance += parseInt(totalamount);
                        user.Timeofdialy = timern
                        user.save().catch(err => console.log(err))

                    }
                }
            }
            else if(user.BronzeVIP == false){
                if(user.GoldVIP == true){
                    let totalamount = amount + bonusamountforgold
                    let bonusamount = bonusamountforgold
                    let daily = user.Timeofdialy
                    if (daily !== null && cooldown - (Date.now() - daily) > 0) {
                        let time = ms(cooldown - (Date.now() - daily));
                
                    let timeEmbed = new Discord.MessageEmbed()
                        .setColor("#FFFFFF")
                        .setDescription(`You have already collected your daily reward\n\nCollect it again in ${time.hours}h ${time.minutes}m ${time.seconds}s `);
                        return message.channel.send(timeEmbed)            
                    } else {
                        let moneyEmbed = new Discord.MessageEmbed()
                            .setColor("#FFFFFF")
                            .setDescription(`You've collected your Daily reward of ${amount}<a:money:800987439559737344> and You Got Bonus ${bonusamount}, Total: ${totalamount}<a:money:800987439559737344> Because You Have Gold VIP!`);
                        message.channel.send(moneyEmbed)
                        user.Balance += parseInt(totalamount);
                        user.Timeofdialy = timern
                        user.save().catch(err => console.log(err))
                    }
                }
                else {
                    let daily = user.Timeofdialy
                    if (daily !== null && cooldown - (Date.now() - daily) > 0) {
                        let time = ms(cooldown - (Date.now() - daily));

                    let timeEmbed = new Discord.MessageEmbed()
                        .setColor("#FFFFFF")
                        .setDescription(`You have already collected your daily reward\n\nCollect it again in ${time.hours}h ${time.minutes}m ${time.seconds}s `);
                        return message.channel.send(timeEmbed)            
                    } else {
                        let moneyEmbed = new Discord.MessageEmbed()
                            .setColor("#FFFFFF")
                            .setDescription(`You've collected your Daily reward of ${amount} <a:money:800987439559737344>`);
                        message.channel.send(moneyEmbed)
                        user.Balance += parseInt(amount);
                        user.Timeofdialy = timern
                        user.save().catch(err => console.log(err))
                    }
                }
                
            }
            
        }
        
        }
}

exports.help = {
    name: "daily",
    description: "Collect the daily credits."
}

exports.conf = {
    aliases: ["dailies"],
    cooldown: 10
}
