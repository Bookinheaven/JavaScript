const Discord = require("discord.js");
const ms = require("parse-ms");
const economyModel = require('../../models/guildstuff')
const ecostoreModel = require('../../models/userstuff')
module.exports.run = async (client, message, args) => {
    let embed1 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`Mention someone to Rob`);
    let user;
    if (message.mentions.users.first()) {
        user = message.mentions.users.first();
    } else if (args[0]) {
        user = message.guild.members.cache.get(args[0]).user;
    } else {
        user = message.author;
    }
    if (!message.mentions.users.first() && !args[0]) {
        return message.channel.send(embed1)
    }
    if (user === client.user){
        return message.channel.send("You Cant Rob From Me I Am UnRobbable!");
    }
    if (user.bot) {
        return message.channel.send("You Cant Rob From BOT Hehe!");
        // If the user was a bot, ignore it.
    }
    if (message.author == user){
        return message.reply('You Can\'t Rob Your Self Mad Boi!')
    }
    const author = await ecostoreModel.findOne({
        UserID: message.author.id
    })
    const data = await ecostoreModel.findOne({
        UserID: user.id
    })
    const dataguild = await economyModel.findOne({
        UserID: user.id,
    })
    const authorguild = await economyModel.findOne({
        UserID: message.author.id,
    })
    if(!data) return message.channel.send(`He Need To Use Daily Command Once In My Life`).catch(err => console.log(err));
    if(!author) return message.channel.send(`You Need To Use Daily Command Once In My Life`).catch(err => console.log(err));
    
    let moneyEmbed = new Discord.MessageEmbed()
    .setColor("GOLD")
    .setDescription(`You need atleast 10,000 coins in your wallet to rob someone`);
    
    if (author.Balance < 10000) {
        return message.channel.send(moneyEmbed)
    }
    let moneyEmbed2 = new Discord.MessageEmbed()
    .setColor("GOLD")
    .setDescription(`${user.tag} does not have anything you can rob`);
    if (data.Balance < 0) {
        return message.channel.send(moneyEmbed2)
    }
    let moneyEmbed3 = new Discord.MessageEmbed()
    .setColor("GOLD")
    .setDescription(`${user.tag} He need atleast 10,000 coins in His wallet to rob Him!`);
    if (data.Balance < 10000) {
        return message.channel.send(moneyEmbed3)
    }
try {
    if (data) {
        let timeout = 600000;
        let lastrob = author.Timeofrob
        if (lastrob !== null && timeout - (Date.now() - lastrob) > 0) {
            let time = ms(timeout - (Date.now() - lastrob));

            let timeEmbed = new Discord.MessageEmbed()
                .setColor("GOLD")
                .setDescription(`You have already robbed recently\n\nTry again in ${time.minutes}m ${time.seconds}s `);
            message.channel.send(timeEmbed)
        } else {
            if(dataguild.padlock == true){
                let five = author.Balance * 20 /100
                let final = Math.floor(Math.random() * five) + 500;
                let fin = final.toFixed();
                author.Balance -= parseInt(fin)
                author.Timeofrob = Date.now()
                author.rob += parseInt(1)
                author.save().catch(err => console.log(err));

                dataguild.padlock = false 
                dataguild.save().catch(err => console.log(err));
                data.Balance += parseInt(fin)
                data.save().catch(err => console.log(err));

                let avatar = message.author.avatarURL({size: 2048}); // Use 2048 for high quality avatar.
                let dmrobem = new Discord.MessageEmbed()
                    .setAuthor(`${message.author.username} -Bad Luck!`, avatar)
                    .setColor("RED")
                    .setDescription(`${message.author.username} Tried To Rob From You But You Have PadLock So You Got 20% of His Balance Check Out Your Balance Sir! \n${user} You Got ${(fin).toLocaleString()} From ${message.author.username} \nYour PadLock As Been Broken!`);
                let robem = new Discord.MessageEmbed()
                    .setAuthor(`${message.author.username} -Bad Luck!`, avatar)
                    .setColor("RED")
                    .setDescription(`You Cant Rob ${user.username} Because He have Padlock in Use!\nYour Wallet has decreased to 20%\n ${user} You Got ${(fin).toLocaleString()} From ${message.author.username} \nYour PadLock As Been Broken!`);
                user.send(dmrobem)
                return message.channel.send(robem)
            }
            if(dataguild.PeaceMode == true){
                author.Timeofrob = Date.now()
                author.rob += parseInt(1)
                author.save().catch(err => console.log(err));
                return message.reply(`You Cant Rob ${user.tag} Because He is in Peace Mode!`)
            }
            if(authorguild.PeaceMode == true){
                author.Timeofrob = Date.now()
                author.rob += parseInt(1)
                author.save().catch(err => console.log(err));
                return message.reply(`You Cant Rob ${user.tag} Because Peace Mode Is On For You!`)
            }
        
            let there = data.BronzeVIP
            let nothing = data.GoldVIP
            if(!there || !nothing) multvalue = 1
            if(there) multvalue = 4
            if(nothing) multvalue = 6
            let robamount = data.Balance / 20
            let randoma = Math.floor(Math.random() * robamount) + 1000;
            let random = randoma / multvalue
            let rao = random.toFixed();
            if (rao > data.Balance){
                data.Balance -= parseInt(rao);
                    await data.save()
                .catch(err => console.log(err));
            }
            
            author.Balance += parseInt(rao);
            author.rob += parseInt(1)
            author.Timeofrob = Date.now()
            author.save().catch(err => console.log(err));
            
            if(!there || !nothing){
                let embed5 = new Discord.MessageEmbed()
                    .setColor("#62FC1A")
                    .setDescription(`<:blobthief:808651742983356467> You Robbed ${user.tag}\nYou Got ${(rao).toLocaleString()} coins, You Have ${(author.Balance).toLocaleString()}`);
                message.channel.send(embed5)
            }
            else if (there){
                let embed5 = new Discord.MessageEmbed()
                    .setColor("#62FC1A")
                    .setDescription(`<:blobthief:808651742983356467> You Robbed ${user.tag}\nYou Only Got ${(rao).toLocaleString()} coins Because He Have Bronze VIP`);
                message.channel.send(embed5)
            }
            else if (nothing){
                let embed5 = new Discord.MessageEmbed()
                    .setColor("#62FC1A")
                    .setDescription(`<:blobthief:808651742983356467> You Robbed ${user.tag}\nYou Only Got ${(rao).toLocaleString()} coins Because He Have Gold VIP`);
                message.channel.send(embed5)
            }
            
        
            }
        }   
        } catch (error) {
                console.log(error);
        }
    
    
    
}
exports.help = {
    name: "rob",
    description: "ROB from user.",
    usage: "rob <@user | user ID> <amount>",
    example: "rob @burn 900"
}

exports.conf = {
    aliases: ['steal'],
    cooldown: 15
}
