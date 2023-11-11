const Discord = require("discord.js");
const guilddata = require("../models/guildstuff")
const guildss = require("../models/onlyguild")
module.exports = async (client, message, args) => {
    const data = await guilddata.findOne({
        GuildID: message.guild.id,
        UserID: message.author.id
    })
    const guilddatasss = await guildss.findOne({
        GuildID: message.guild.id
    })
    let recent = client.recent;
    if (recent.has(message.author.id)) return;
    const randomNum = Math.floor(Math.random() * 101) + 1 // random starts from 1 to 100 = randomNum
    let tip = [`**GG on leveling up! You can type \`+rank\` to see your rank card in ${message.guild.name}. ;)**`]
    let tips = tip[Math.floor(Math.random() * tip.length)]
    if (message.author.bot || message.author === client.user) return;
    let amountex = client.leveling.gainedXp();
    
    if(randomNum > 50){
        data.XP += amountex
        await data.save().catch(err => console.log(err))
    }
    if (data.XP >= client.leveling.getlevel(data.Levels)) {
        data.Levels ++;
        data.XP = 0
        if(randomNum < 1){
            message.author.send(tips)
        }
        let randomTimer = getRandomInt(10000, 20000);
    
        recent.add(message.author.id);
    
        client.setTimeout(() => {
            recent.delete(message.author.id)
        }, randomTimer);

        if(data){
            if(guilddatasss.leveling === true){
                let tosendch = message.guild.channels.cache.find(ch => ch.id === guilddatasss.Levelingsch)
                if(tosendch) {
                        data.save().catch(err => console.log(err))
                        return tosendch.send(`Rock On! **${message.author}** reached level **${data.Levels}!** Congratulations!`);
                } else if (!tosendch){
                    data.save().catch(err => console.log(err))
                    return message.channel.send(`Rock On! **${message.author}** reached level **${data.Levels}!** Congratulations!`)
                }
        } else if (guilddatasss.leveling === false){
                    data.save().catch(err => console.log(err))
                    return message.channel.send(`Rock On! **${message.author}** reached level **${data.Levels}!** Congratulations!`)

        }
    }




    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}