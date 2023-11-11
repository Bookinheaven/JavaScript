const Discord = require("discord.js");
const economyModel = require('../../models/guildstuff')
const ecostoreModel = require('../../models/userstuff')
exports.run = async (client, message, args) => {
    //let petammount = 10000
    let toys = 800
    let chocolate = 500
    let pizza = 1000
    let apple = 1000
    let goldenapple = 1200
    let orange = 1500
    let icecream = 580 
    let padlocka = 4500
    let banknote = 10000
    //let goldlikeamount = 500000
    let user = message.author;
    let tset = args[1]
    let text = args[0].toLowerCase()
    const author = await ecostoreModel.findOne({
        UserID: message.author.id
    })
    const data = await economyModel.findOne({
        GuildID: message.guild.id
    })
    if(text == 'bronze'|| text == 'bronze vip'|| text == 'bronzevip') {
        let Embed2 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`You don't have Bronze VIP To Sell`);

        let vip = await author.BronzeVIP

        if (vip == false) return message.channel.send(Embed2)
       
        author.BronzeVIP = true

        let Embed3 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`Sold Bronze VIP For 26000 Coins`);

        author.Balance += parseInt(26000)
        author.save().catch(err => console.log(err))
        return message.channel.send(Embed3)

    } else if(text == 'gold'|| text == 'gold vip'|| text == 'goldvip') {
        let Embed2 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`You don't have GOLD VIP To Sell`);

        let vip = await author.GoldVIP

        if (vip == false) return message.channel.send(Embed2)
       
        author.GoldVIP = true

        let Embed3 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`Sold GOLD VIP For 260000 Coins`);

        author.Balance += parseInt(260000)
        author.save().catch(err => console.log(err))
        return message.channel.send(Embed3)

    } else if(text == 'padlock') {
        let Embed2 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`You don't have a Padlocks to sell`);

        let padlock = author.padlocks

        if (padlock < 1) return message.channel.send(Embed2)
       
        author.padlocks -= parseInt(1)
        author.Balance += parseInt(padlocka)

        let Embed3 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`Sold a Padlock For ${padlocka} Coins`);

        author.Balance += parseInt(3000)
        author.save().catch(err => console.log(err))
        return message.channel.send(Embed3)
	} else if(text == 'fishing rod') {
        let Embed2 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`You don't have a Fishing Rod to sell`);

        let fishing = author.FishingRod

        if (fishing == false) return message.channel.send(Embed2)
       
        author.FishingRod = falseauthor

        let Embed3 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`Sold a Fishing Rod For 15000 Coins`);

        author.Balance += parseInt(15000)
        author.save().catch(err => console.log(err))
        return message.channel.send(Embed3)
	} else if(text == 'hunting rifle') {
        let Embed2 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`You don't have a Hunting Rifle to sell`);

        let hunterrifle = author.Hunter

        if (hunterrifle == false) return message.channel.send(Embed2)
       
        author.Hunter = false

        let Embed3 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`Sold a Hunting Rifle For 25000 Coins`);

        author.Balance += parseInt(25000)
        author.save().catch(err => console.log(err))
        return message.channel.send(Embed3)
	} else if(text == 'fish' || text == 'fishs') {
        if (isNaN(tset)){
            return message.reply('Mention Number Of Stuff To Sell')
        }
        if(tset > author.fishs){
            let Embed2 = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`You don't have a Fish to sell`);
            return message.channel.send(Embed2)
        } else if (tset <= author.fishs){
            let Embed2 = new Discord.MessageEmbed()
                .setColor("#FFFFFF")
                .setDescription(`You don't have Fishs to sell`);

            let fishss = author.fishs

            if (fishss == 0) return message.channel.send(Embed2)
        
            author.fishs -= parseInt(tset)
            let random = Math.floor(Math.random() * tset * 2000) + tset * 500;
            let Embed3 = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`Sold ${tset} Fishs For ${random} Coins`);

            author.Balance += parseInt(random)
            author.save().catch(err => console.log(err))
            return message.channel.send(Embed3)
        }
	} else if(text == 'hunt' ||text == 'hunts' || text == 'hunted') {
        if (isNaN(tset)){
            return message.reply('Mention Number Of Stuff To Sell')
        }
        if(tset > author.Huntings){
            let Embed2 = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`You don't have That Many Animals to sell`);
            return message.channel.send(Embed2)
        } else if (tset <= author.Huntings){
            let Embed2 = new Discord.MessageEmbed()
                .setColor("#FFFFFF")
                .setDescription(`You don't have a Animal to sell`);

            let hunts = author.Huntings

            if (hunts == 0) return message.channel.send(Embed2)
        
            author.Huntings -= parseInt(1)
            let random = Math.floor(Math.random() * tset * 2000) + tset * 500;
            let Embed3 = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`Sold ${tset} Animals For ${random} Coins`);

            author.Balance += parseInt(random)
            author.save().catch(err => console.log(err))
            return message.channel.send(Embed3)
        }
    } else if(text == 'toys' ||text == 'toy') {// toys chocolate pizza goldenapple apple orange icecream
        if (isNaN(tset)){
            return message.reply('Mention Number Of Stuff To Sell')
        }
        if(tset > author.toys){
            let Embed2 = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`You don't have That Many Toys to sell`);
            return message.channel.send(Embed2)
        } else if (tset <= author.toys){
            let Embed2 = new Discord.MessageEmbed()
                .setColor("#FFFFFF")
                .setDescription(`You don't have a Toys to sell`);

            let hunts = author.toys

            if (hunts == 0) return message.channel.send(Embed2)
        
            author.toys -= parseInt(tset)
            let random = Math.floor(Math.random() * tset * toys) + tset * toys;
            let Embed3 = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`Sold ${tset} Toys For ${random} Coins`);

            author.Balance += parseInt(random)
            author.save().catch(err => console.log(err))
            return message.channel.send(Embed3)
        }
    } else if(text == 'apple' ||text == 'apples') {// toys chocolate pizza goldenapple apple orange icecream
        if (isNaN(tset)){
            return message.reply('Mention Number Of Stuff To Sell')
        }
        if(tset > author.apple){
            let Embed2 = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`You don't have That Many Apple to sell`);
            return message.channel.send(Embed2)
        } else if (tset <= author.apple){
            let Embed2 = new Discord.MessageEmbed()
                .setColor("#FFFFFF")
                .setDescription(`You don't have a Apple to sell`);

            let hunts = author.apple

            if (hunts == 0) return message.channel.send(Embed2)
        
            author.apple -= parseInt(tset)
            let random = Math.floor(Math.random() * tset * apple) + tset * apple;
            let Embed3 = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`Sold ${tset} Apples For ${random} Coins`);

            author.Balance += parseInt(random)
            author.save().catch(err => console.log(err))
            return message.channel.send(Embed3)
        }
    } else if(text == 'goldenapple' || text == 'goldenapples' || text == 'golden apple' ||text == 'golden apples') {// toys chocolate pizza goldenapple apple orange icecream
        if (isNaN(tset)){
            return message.reply('Mention Number Of Stuff To Sell')
        }
        if(tset > author.goldenapple){
            let Embed2 = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`You don't have That Many Golden Apple to sell`);
            return message.channel.send(Embed2)
        } else if (tset <= author.goldenapple){
            let Embed2 = new Discord.MessageEmbed()
                .setColor("#FFFFFF")
                .setDescription(`You don't have a Golden Apple to sell`);

            let hunts = author.goldenapple

            if (hunts == 0) return message.channel.send(Embed2)
        
            author.goldenapple -= parseInt(tset)
            let random = Math.floor(Math.random() * tset * goldenapple) + tset * goldenapple;
            let Embed3 = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`Sold ${tset} Golden Apple For ${random} Coins`);

            author.Balance += parseInt(random)
            author.save().catch(err => console.log(err))
            return message.channel.send(Embed3)
        }
    } else if(text == 'pizza' ||text == 'pizzas') {// toys chocolate pizza goldenapple apple orange icecream
        if (isNaN(tset)){
            return message.reply('Mention Number Of Stuff To Sell')
        }
        if(tset > author.pizza){
            let Embed2 = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`You don't have That Many Pizzas to sell`);
            return message.channel.send(Embed2)
        } else if (tset <= author.pizza){
            let Embed2 = new Discord.MessageEmbed()
                .setColor("#FFFFFF")
                .setDescription(`You don't have a Pizza to sell`);

            let hunts = author.pizza

            if (hunts == 0) return message.channel.send(Embed2)
        
            author.pizza -= parseInt(tset)
            let random = Math.floor(Math.random() * tset * pizza) + tset * pizza;
            let Embed3 = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`Sold ${tset} Pizza For ${random} Coins`);

            author.Balance += parseInt(random)
            author.save().catch(err => console.log(err))
            return message.channel.send(Embed3)
        }
    } else if(text == 'orange' ||text == 'oranges') {// toys chocolate pizza goldenapple apple orange icecream
        if (isNaN(tset)){
            return message.reply('Mention Number Of Stuff To Sell')
        }
        if(tset > author.orange){
            let Embed2 = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`You don't have That Many Orange to sell`);
            return message.channel.send(Embed2)
        } else if (tset <= author.orange){
            let Embed2 = new Discord.MessageEmbed()
                .setColor("#FFFFFF")
                .setDescription(`You don't have a Orange to sell`);

            let hunts = author.orange

            if (hunts == 0) return message.channel.send(Embed2)
        
            author.orange -= parseInt(tset)
            let random = Math.floor(Math.random() * tset * orange) + tset * orange;
            let Embed3 = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`Sold ${tset} Orange For ${random} Coins`);

            author.Balance += parseInt(random)
            author.save().catch(err => console.log(err))
            return message.channel.send(Embed3)
        }
    } else if(text == 'icecream' ||text == 'icecreams') {// toys chocolate pizza goldenapple apple orange icecream
        if (isNaN(tset)){
            return message.reply('Mention Number Of Stuff To Sell')
        }
        if(tset > author.icecream){
            let Embed2 = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`You don't have That Many Icecreams to sell`);
            return message.channel.send(Embed2)
        } else if (tset <= author.icecream){
            let Embed2 = new Discord.MessageEmbed()
                .setColor("#FFFFFF")
                .setDescription(`You don't have a Icecream to sell`);

            let hunts = author.icecream

            if (hunts == 0) return message.channel.send(Embed2)
        
            author.icecream -= parseInt(tset)
            let random = Math.floor(Math.random() * tset * icecream) + tset * icecream;
            let Embed3 = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`Sold ${tset} Icecreams For ${random} Coins`);

            author.Balance += parseInt(random)
            author.save().catch(err => console.log(err))
            return message.channel.send(Embed3)
        }
    } else if(text == 'chocolate' ||text == 'chocolates') {// toys chocolate pizza goldenapple apple orange icecream
        if (isNaN(tset)){
            return message.reply('Mention Number Of Stuff To Sell')
        }
        if(tset > author.chocolate){
            let Embed2 = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`You don't have That Many Chocolates to sell`);
            return message.channel.send(Embed2)
        } else if (tset <= author.chocolate){
            let Embed2 = new Discord.MessageEmbed()
                .setColor("#FFFFFF")
                .setDescription(`You don't have a Chocolate to sell`);

            let hunts = author.chocolate

            if (hunts == 0) return message.channel.send(Embed2)
        
            author.chocolate -= parseInt(tset)
            let random = Math.floor(Math.random() * tset * chocolate) + tset * chocolate;
            let Embed3 = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`Sold ${tset} Chocolates For ${random} Coins`);

            author.Balance += parseInt(random)
            author.save().catch(err => console.log(err))
            return message.channel.send(Embed3)
        }
    }

	}


exports.help = {
    name: "sell",
    description: "Sell A Item That You Dont Want or Use!.",
    usage: 'sell <ITEM>',
    example: '*sell padlock'
}

exports.conf = {
    aliases: [],
    cooldown: 10
}
