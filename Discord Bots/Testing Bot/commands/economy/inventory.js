const Discord = require("discord.js");
const economyModel = require('../../models/guildstuff')
const ecostoreModel = require('../../models/userstuff')
const { shorten } = require('../../functions')
module.exports.run = async (client, message, args) => {

    const data = await ecostoreModel.findOne({
      UserID: message.author.id
    })
    const padlockdata = await economyModel.findOne({
      GuildID: message.guild.id,
      UserID: message.author.id
    })


  if (!data){
    return message.channel.send('Nothing In Inventory!')
  }
  else if(data){
    let money = await data.Balance
    let bank = await data.Bank

    let bronzevip = await data.BronzeVIP
    if(bronzevip === false) bronzevip = 'None'
    if(bronzevip === true) bronzevip = 'Bronze VIP'

    let goldvip = await data.GoldVIP
    if(goldvip === false) goldvip = 'None'
    if(goldvip === true) goldvip = 'GOLD VIP'

    let fishingrod = await data.FishingRod
    if(fishingrod === false) fishingrod = '<a:uncheck:800984261192187914>'
    if(fishingrod === true) fishingrod = `<a:check:800984260986798131>`

    let hunter = await data.Hunter
    if(hunter === false) hunter = '<a:uncheck:800984261192187914>'
    if(hunter === true) hunter = `<a:check:800984260986798131>`


    //let pets = await data.Pets
    //if(pets === false) pets = '<a:uncheck:800984261192187914>'
    //if(pets === true) pets = `<a:check:800984260986798131>`

    let padlocktf = await padlockdata.padlock
    if(padlocktf === false) padlock = '<a:uncheck:800984261192187914>'
    if(padlocktf === true) padlock = `<a:check:800984260986798131>`

    let padlocks = await data.padlocks
    padlocksamount = `${padlocks}`
    
    let fishs = await data.fishs
    fishsamount = `${fishs}`

    let hunts = await data.Huntings
    huntsamount = `${hunts}`

    let crimes = await data.crimes
    crimesamount = `${crimes}`

    let beg = await data.begs
    begs = `${beg}`

    let banknotes = await data.banknotes
    banknotesamount = `${banknotes}`

    let openedloot = await data.lootbox
    lootsop = `${openedloot}`

    let item = await data.apple
    apple= `${item}`
    
    let item2 = await data.goldenapple
    goldenapple= `${item2}`
    
    let item3 = await data.pizza
    pizza= `${item3}`
    
    let item4 = await data.orange
    orange= `${item4}`
    
    let item5 = await data.chocolate
    chocolate= `${item5}`
    
    let item6 = await data.icecream
    icecream= `${item6}`

    let lastitem = await data.toys
    toys= `${lastitem}`

    let loots = await data.lootboxs
    lootss = `${loots}`

    let games = await data.games
    gamers = `${games}`

    let capability = data.Bankspace 
    let dep = data.Bank
    let perce = capability - dep 
    let percentage = perce / capability * 100
    var str = `${percentage}`;
    var res = str.substring(0,3);
    //var ns = percentage.substr(0, 3)
    if (capability == dep) total = `Full Bank!`
    else total = `(${dep}/${capability})\nPercentage: ${res}%`

    
    if(!args[0]){
      let moneyEmbed = new Discord.MessageEmbed()
      .setColor("#1460AA")
      .setThumbnail(message.author.displayAvatarURL({size: 4096, dynamic: true}))
      .addFields(
        { name: `**${message.author.username}'s Inventory**`, value: '*About Your Profile!*' },
        { name: `__**Currency Profile**__`, value: '*About Your Currency!*'},
        { name: 'Wallet', value: `<a:money:800987439559737344> ${money}`, inline: true },
        { name: 'Bank', value: `<a:money:800987439559737344> ${bank} ${total}`, inline: true },

        { name: `__**Items Profile**__`, value: '*About Your Items!*'},
        { name: 'VIP Ranks', value: `${bronzevip} ,${goldvip}`},
        { name: `Fishing Rod ${fishingrod}`, value: `Fishs Caught: ${fishsamount}`, inline: true },

        { name: `Hunting Rifle ${hunter}`, value: `Animals Caught: ${huntsamount}`, inline: true },
        { name: `Padlock ${padlock}`, value: `You Have: ${padlocksamount}`, inline: true },
        { name: 'Loot Box', value: `Loots Opened: ${loots}\nYou Have: ${lootsop}`, inline: true },
        
        { name: 'BankNote', value: `Total BankNotes: <a:banknote:804663263349440512> ${banknotesamount}`, inline: true },
        { name: 'Crime', value: `Total Crimes: ${crimesamount}`, inline: true },
        { name: 'Beg', value: `Total Begs: ${begs}`, inline: true },
        { name: 'Games', value: `Total Games Played: ${gamers}`, inline: true },
      )
      .setFooter(`<prefix>inventory <1> --- Next Page!`)
      .setTimestamp()
    return message.channel.send(moneyEmbed)
    } 
    let text = args[0].toLowerCase()
    if (text == '1'){
      let moneyEmbed = new Discord.MessageEmbed()
      .setColor("#1460AA")
      .setThumbnail(message.author.displayAvatarURL({size: 4096, dynamic: true}))
      .setTimestamp()
      if(item > 1){
        moneyEmbed.addField('Apple 🍎', `You Have ${apple} 🍎`)
      }
      if(item2 > 1){
        moneyEmbed.addField('Golden Apple 🍏', `You Have ${goldenapple} 🍏`)
      }
      if(item3 > 1){
        moneyEmbed.addField('Pizza 🍕', `You Have ${pizza} 🍕`)
      }
      if(item4 > 1){
        moneyEmbed.addField('Orange 🍊', `You Have ${orange} 🍊`)
      }
      if(item5 > 1){
        moneyEmbed.addField('Chocolate 🍫', `You Have ${chocolate} 🍫`)
      }
      if(item6 > 1){
        moneyEmbed.addField('Icecream 🍦', `You Have ${icecream} 🍦`)
      }
      if(lastitem > 1){
        moneyEmbed.addField('Toys 🏎️', `You Have ${toys} 🏎️`)
      }
    return message.channel.send(moneyEmbed)
    }
    
    
  }

};

exports.help = {
  name: "inventory",
  description: "Show Your Stuff in inventory!."
}

exports.conf = {
  aliases: ["inv", 'profile'],
  cooldown: 10
}
