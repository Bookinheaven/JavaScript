const Discord = require("discord.js");
const mongoose = require('mongoose')
const ecostoreModel = require('../../models/userstuff')
let ms = require("parse-ms");
const loot = require('../../assets/loot.json')
exports.run = async (client, message, args) => {
    let randomloot = Math.floor(Math.random() * 101) + 1 // random starts from 1 to 100 = randomNum
    tip = ['Bored Using This Command Try Out Using The Commmand `img`', 'Bored Using This Command Try Out `Try Out Economy System`', 'Bored Using This Command Try Out Using The Commmand `meme`', 'Bored Using This Command Try Out Using The Commmand `play Alanwalker Faded` or `search Alanwalker faded`']
    let tips = tip[Math.floor(Math.random() * tip.length)]
    if(randomloot < 10){
        message.channel.send(`**TIP**: ${tips}`)
    }
    const data = await ecostoreModel.findOne({
        UserID: message.author.id
    })
    if(!data){
        return message.channel.send('You Still Didnt Used Daily Or Work Command!')
    }
    if(!args[0]) return message.channel.send(`Syntax:
             <prefix>open lootbox`)
    let text = args[0].toLowerCase()
    if(data){
            if(text == 'lootbox'){
                if(data.lootbox >= 1){
                    data.lootbox -= parseInt(1)
                    const lootID = Math.floor(Math.random() * 10) + 1;
                    let rarity;
                    if (lootID < 8) rarity = 'common';
                    else if (lootID < 9) rarity = 'uncommon';
                    else if (lootID < 10) rarity = 'rare';
                    else rarity = 'legendary';
                    const loots = loot[rarity];
                    const lootmax = loots.max
                    const lootmin = loots.min
                    const worth = Math.floor(Math.random() * lootmax) + lootmin
                    if (worth <= 6){
                        let x = data.padlocks + worth
                        data.padlocks = parseInt(x)
                        let embed = new Discord.MessageEmbed() 
                        .setColor('#ee82ee') 
                        .setDescription(`**${message.author.username}**, You caught ${worth} ${rarity} ${loots.symbol}.`)
                        .setThumbnail('https://emoji.gg/assets/emoji/DefianceLootBox.png')
                        let x2 = data.lootboxs + 1
                        data.lootboxs = parseInt(x2);
                        data.save().catch(err => console.log(err))
                        return message.channel.send(embed);
                    }
                    data.Balance += worth;
                    let x = data.lootboxs + 1
                    data.lootboxs = parseInt(x);
                    data.save().catch(err => console.log(err))
                    
                    let embed = new Discord.MessageEmbed() 
                        .setColor('#ee82ee') 
                        .setDescription(`**${message.author.username}**, You caught a ${rarity} ${loots.symbol}. I bet it'd sell for around <a:money:800987439559737344> **${worth}**.`)
                        .setThumbnail('https://emoji.gg/assets/emoji/DefianceLootBox.png')
                    return message.channel.send(embed);
                } else{
                    message.reply('You Dont Have Any LootBoxs In Your Inventory!')
                }
                
            } else {
                return;
            }
        }
    

}
exports.help = {
    name: "open",
    description: "Open lootboxs and Get Cool Prizes.",
    usage: 'open <lootbox>',
    example: '*open open'
}

exports.conf = {
    aliases: [],
    cooldown: 5
}
