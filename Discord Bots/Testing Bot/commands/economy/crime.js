const Discord = require("discord.js");
const economyModel = require('../../models/guildstuff')
const ecostoreModel = require('../../models/userstuff')
let ms = require("parse-ms");
exports.run = async (client, message, args) => {
    let user = message.author;
    let timeout = 60000;

    let userid = await ecostoreModel.findOne({
        UserID: user.id
    })
    let there = userid.BronzeVIP
    let nothing = userid.GoldVIP

    if(!userid){
        message.reply('You Still Didnt Used Daily Command How Can You Use This Command')
        return;
    }
    else if (userid){
        if(!there || !nothing) multvalue = 2
        if(there) multvalue = 4
        if(nothing) multvalue = 6

        let randoma = Math.floor(Math.random() * 2000) + 1000;
        let random = randoma * multvalue;
        if (userid.Balance < 25000) {
            return message.channel.send('You need at least 25000$ to commit a crime')
        }
        let crime = await userid.Timeofcrime
        if (crime !== null && timeout - (Date.now() - crime) > 0) {
          
          let time = ms(timeout - (Date.now() - crime));
          
          message.channel.send(`You already commited a crime! Try again in ${time.seconds} seconds!`)
  
        } else {
                const result = [
                "WINWIN",
                "LOOSELOOSE"
                ] 

            let awnser = result[Math.floor(Math.random() * result.length)];
                
            if (awnser === "LOOSELOOSE") {
                
            message.channel.send("You were caught and had to pay `$1500` to stay out of jail");
            let amount = 1500
            userid.Balance -= parseInt(amount)
            userid.Timeofcrime = Date.now()
            userid.save().catch(err => console.log(err))
          } else {
              let embed = new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setTitle("You Have Just Commited A Crime!")
                .addField("Amount Robbed:", random)
                .setColor("RANDOM")
                .setTimestamp();
              message.channel.send(embed)

            userid.crimes += parseInt(1)
            userid.Balance += parseInt(random)
            userid.Timeofcrime = Date.now()
            userid.save().catch(err => console.log(err))
  
        }
      }
    }
    
        
     
  }
  exports.help = {
    name: "crime",
    description: ".",
    usage: "crime ",
    example: "crime "
}
  
exports.conf = {
    aliases: [],
    cooldown: 5
}
