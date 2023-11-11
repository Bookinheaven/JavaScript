const Discord = require("discord.js");
const mongoose = require('mongoose')
let ms = require("parse-ms");
const ecostoreModel = require('../../models/userstuff')
const hunty = require('../../assets/hunting.json');
exports.run = async (client, message, args) => {
    const userid = await ecostoreModel.findOne({
         UserID: message.author.id
 })
    if (!userid){
        return message.reply(`You Still Didnt Used Daily Command How Can You Use This Command`)
    } else if(userid){
        let timeout = 1800000
        let lastwork = userid.Timeofhunt
        if (lastwork !== null && timeout - (Date.now() - lastwork) > 0) {
            let time = ms(timeout - (Date.now() - lastwork));

            let timeEmbed = new Discord.MessageEmbed()
            .setColor("#FF0000")
            .setDescription(`You have already Hunted Recently\n\nTry again in ${time.minutes}m ${time.seconds}s `);
            message.channel.send(timeEmbed)
        } else {
            if(userid.Hunter == false) return message.reply(`You Dont Even Have Hunting Rifle for that use command \`store\``)
            if(userid.Hunter == true) {
                let zeroembed = new Discord.MessageEmbed() 
                    .setColor('#ee82ee') 
                    .setDescription(`:x: | **${message.author.username}**, You Got a Nothing!!. <a:money:800987439559737344> **0**. :D`)
                const huntID = Math.floor(Math.random() * 10) + 1;
                let rarity;
                if (huntID < 8) rarity = 'Insects'
                else if (huntID < 2) return message.channel.send(zeroembed);
                else if (huntID < 7) rarity = 'common';
                else if (huntID < 9) rarity = 'uncommon';
                else if (huntID < 10) rarity = 'rare';
                else rarity = 'legendary';
                let randomval = Math.floor(Math.random() * 8 + 0);
                const huntsname = hunty[rarity].name[randomval];
                const huntsemo = hunty[rarity].symbol[randomval]
                let huntmin = hunty[rarity].min
                let huntmax = hunty[rarity].max
                const worth = Math.floor(Math.random() * huntmax) + huntmin
                userid.Balance += worth;
                userid.Timeofhunt = Date.now()
                let hx = userid.Huntings + 1
                userid.Huntings = parseInt(hx)
                userid.save().catch(err => console.log(err))
                
                let embed = new Discord.MessageEmbed() 
                    .setColor('#ee82ee') 
                    .setDescription(`🏹 | **${message.author.username}**, You Got a ${huntsemo}. You Hunted ${huntsname}, You Got <a:money:800987439559737344> **${worth}**. You Can Sell Hunted Animals Too! `)
                return message.channel.send(embed);
        }
        }
        
        
    }
    
      
    } 
exports.help = {
    name: "hunt",
    description: "hunt with hunting Rifle."
}

exports.conf = {
    aliases: ['hunting']
}
    