const Discord = require("discord.js");
const mongoose = require('mongoose')
const economyModel = require('../../models/guildstuff')
const ecostoreModel = require('../../models/userstuff')
let ms = require("parse-ms");
const fishes = require('../../assets/fishy.json');
exports.run = async (client, message, args) => {
    const userid = await ecostoreModel.findOne({
         UserID: message.author.id
 })
    if (!userid){
        return message.reply(`You Still Didnt Used Daily Command How Can You Use This Command`)
    } else if(userid){
        let timeout = 1800000
        let lastwork = userid.Timeoffish
        if (lastwork !== null && timeout - (Date.now() - lastwork) > 0) {
            let time = ms(timeout - (Date.now() - lastwork));

            let timeEmbed = new Discord.MessageEmbed()
            .setColor("#FF0000")
            .setDescription(`You have already Fished Recently\n\nTry again in ${time.minutes}m ${time.seconds}s `);
            message.channel.send(timeEmbed)
        } else {
            if(userid.FishingRod == false) return message.reply(`You Dont Even Have Fishing Rod for that use command \`store\``)
            if(userid.FishingRod == true) {
                const fishID = Math.floor(Math.random() * 10) + 1;
                let rarity;
                if (fishID < 5) rarity = 'junk';
                else if (fishID < 8) rarity = 'common';
                else if (fishID < 9) rarity = 'uncommon';
                else if (fishID < 10) rarity = 'rare';
                else if (fishID < 1)rarity = 'legendary';
                const fish = fishes[rarity];
                let fishmin = fish.min
                let fishmax = fish.max
                const worth = Math.floor(Math.random() * fishmax) + fishmin
                userid.Balance += worth;
                userid.Timeoffish = Date.now()
                let x = userid.fishs + 1
                userid.fishs = parseInt(x);
                userid.save().catch(err => console.log(err))
                
                let embed = new Discord.MessageEmbed() 
                    .setColor('#ee82ee') 
                    .setDescription(`🎣 | **${message.author.username}**, You caught a ${rarity} ${fish.symbol}. You Got <a:money:800987439559737344> **${worth}**. You Can Caught Fishs Too!`)
                return message.channel.send(embed);
        }
        }
        
        
    }
    
      
    } 
exports.help = {
    name: "fish",
    description: "fishing with fishing rod."
}

exports.conf = {
    aliases: ['fishing']
}
    