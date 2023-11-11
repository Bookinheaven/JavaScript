const Discord = require('discord.js')
const ecostoreModel = require('../../models/userstuff')
module.exports.run = async (client, message, args) => {
    let bronzeamount = 34000
    let goldamount = 340000
    let fishingrodamount = 25000
    let hunterrifle = 45000
    //let petammount = 10000
    let toys = 1000
    let chocolate = 800
    let pizza = 1200
    let apple = 1200
    let goldenapple = 1600
    let orange = 1800
    let icecream = 1020 
    let padlock = 5000
    let banknote = 10000
    //let goldlikeamount = 500000
    let text = args.join(' ')
    const userid = await ecostoreModel.findOne({
        UserID: message.author.id
    })

    if (!args[0]){
        let embed3 = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription('Enter an item to buy')
            message.channel.send(embed3)
    }
    let tex = args[0].toLowerCase()
    if(!userid){ //if there is no data of eco stroe for user it will create
        let newData = new ecostoreModel({
            UserID: message.author.id
            
        })
        await newData.save()
                .catch(err => console.log(err));
        return message.reply('Your Registered Try Again Now!')
    }
    else if(userid){ //if its there it will find the data
        let Embed = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`You need ${bronzeamount - userid.Balance} coins to purchase Bronze VIP`)
        let Embed1 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`You need ${goldamount - userid.Balance} coins to purchase Gold VIP`)

        if (tex == 'bronze') {
            if (userid.BronzeVIP == true){
                return message.channel.send(`You Already Bought It Forgot?`)
            }
            if (userid.Balance < bronzeamount) return message.channel.send(Embed)
                userid.BronzeVIP = true

                let Embed2 = new Discord.MessageEmbed()
                .setColor("#FFFFFF")
                .setDescription(`Purchased Bronze VIP For ${bronzeamount} Coins`);
                userid.Balance -= parseInt(bronzeamount)
                userid.save().catch(err => console.log(err))
                return message.channel.send(Embed2)
        } else if (tex == 'gold') {
            if (userid.GoldVIP == true){
                return message.channel.send(`You Already Bought It Forgot?`)
            }
            if (userid.Balance < goldamount) return message.channel.send(Embed1)
                userid.GoldVIP = true

                let Embed2 = new Discord.MessageEmbed()
                .setColor("#FFFFFF")
                .setDescription(`Purchased Gold VIP For ${goldamount} Coins`);
                userid.Balance -= parseInt(goldamount)
                userid.save().catch(err => console.log(err))
                return message.channel.send(Embed2)
        } else if (text == 'Fishing rod' || text == 'fishing rod' || text == 'Fishing Rod' || text == 'FISHING ROD') {
            if (userid.FishingRod == true){
                return message.channel.send(`You Already Bought It Forgot?`)
            }
            if (userid.Balance > fishingrodamount) {
                userid.FishingRod = true

                let Embed2 = new Discord.MessageEmbed()
                .setColor("#FFFFFF")
                .setDescription(`Purchased Fishing Rod For ${fishingrodamount} Coins`);
                userid.Balance -= parseInt(fishingrodamount)
                userid.save().catch(err => console.log(err))
                return message.channel.send(Embed2)

            } else {
                let earn = fishingrodamount - userid.Balance
                return message.reply(`You Dont Have Enough Money Earn ${earn}`)
            }

        } else if (text == 'Hunting rifle' || text == 'Hunting Rifle' || text == 'hunting rifle' || text == 'HUNTING RIFLE') {
            if (userid.Hunter == true){
                return message.channel.send(`You Already Bought It Forgot?`)
            }
            if (userid.Balance > hunterrifle) {
                userid.Hunter = true

                let Embed2 = new Discord.MessageEmbed()
                .setColor("#FFFFFF")
                .setDescription(`Purchased Hunter Rifle For ${hunterrifle} Coins`);
                userid.Balance -= parseInt(hunterrifle)
                userid.save().catch(err => console.log(err))
                return message.channel.send(Embed2)

            } else {
                let earn = hunterrifle - userid.Balance
                return message.reply(`You Dont Have Enough Money Earn ${earn} More To Get Hunting Rifle!`)
            }
        
    } /*else if (args[0] == 'Pets' || args[0] == 'PETS'|| args[0] == 'pets' || args[0] == 'pet') {
        if (userid.Pets == true){
            return message.channel.send(`You Already Bought It Forgot?`)
        }
        if (userid.Balance > petammount) {
            userid.Pets = true

            let Embed2 = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`Purchased Pets For ${petammount} Coins`);
            userid.Balance -= parseInt(petammount)
            userid.save()
            return message.channel.send(Embed2)

        } else {
            let earn = petammount - userid.Balance
            return message.reply(`You Dont Have Enough Money Earn ${earn} More To Get a Pet!`)
        }
    }*/ else if (text == 'padlock') {
        if (userid.Balance > padlock) {
            userid.padlocks += parseInt(1)

            let Embed2 = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`Purchased Padlock For ${padlock} Coins`);
            userid.Balance -= parseInt(padlock)
            userid.save().catch(err => console.log(err))
            return message.channel.send(Embed2)

        } else {
            let earn = padlock - userid.Balance
            return message.reply(`You Dont Have Enough Money Earn ${earn} More To Get Padlock!`)
        }
    }
    else if (tex == 'toys') {// toys chocolate pizza goldenapple apple orange icecream
        if(args[1] > 10){
            return message.channel.send(`You Can Only Buy 10 Toys At A Time!`)
        }
        if(tex) amount = args[1]
        else amount = 1
        let totalamount = amount*toys
        if (userid.Balance > totalamount) {
            userid.toys += parseInt(amount)

            let Embed2 = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`Purchased Toy ${amount} For ${totalamount} Coins`);
            userid.Balance -= parseInt(totalamount)
            userid.save().catch(err => console.log(err))
            return message.channel.send(Embed2)

        } else {
            let earn = toys - userid.Balance
            return message.reply(`You Dont Have Enough Money Earn ${earn} More To Get toys!`)
        }
    } else if (args[0] == 'pizza') {// toys chocolate pizza goldenapple apple orange icecream
        if(args[1] > 10){
            return message.channel.send(`You Can Only Buy 10 Pizzas At A Time!`)
        }
        if(args[1]) amount = args[1]
        else amount = 1
        let totalamount = amount*pizza
        if (userid.Balance > totalamount) {
            userid.pizza += parseInt(amount)

            let Embed2 = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`Purchased pizza ${amount} For ${totalamount} Coins`);
            userid.Balance -= parseInt(totalamount)
            userid.save().catch(err => console.log(err))
            return message.channel.send(Embed2)

        } else {
            let earn = pizza - userid.Balance
            return message.reply(`You Dont Have Enough Money Earn ${earn} More To Get pizzas!`)
        }
    } else if (args[0] == 'chocolate') {// toys chocolate pizza goldenapple apple orange icecream
        if(args[1] > 10){
            return message.channel.send(`You Can Only Buy 10 chocolate At A Time!`)
        }
        if(args[1]) amount = args[1]
        else amount = 1
        let totalamount = amount*chocolate
        if (userid.Balance > totalamount) {
            userid.chocolate += parseInt(amount)

            let Embed2 = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`Purchased chocolate ${amount} For ${totalamount} Coins`);
            userid.Balance -= parseInt(totalamount)
            userid.save().catch(err => console.log(err))
            return message.channel.send(Embed2)

        } else {
            let earn = pizza - userid.Balance
            return message.reply(`You Dont Have Enough Money Earn ${earn} More To Get chocolates!`)
        }
    } else if (args[0] == 'goldenapple') {// toys chocolate pizza goldenapple apple orange icecream
        if(args[1] > 10){
            return message.channel.send(`You Can Only Buy 10 Golden Apple At A Time!`)
        }
        if(args[1]) amount = args[1]
        else amount = 1
        let totalamount = amount*goldenapple
        if (userid.Balance > totalamount) {
            userid.goldenapple += parseInt(amount)

            let Embed2 = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`Purchased Golden Apple ${amount} For ${totalamount} Coins`);
            userid.Balance -= parseInt(totalamount)
            userid.save().catch(err => console.log(err))
            return message.channel.send(Embed2)

        } else {
            let earn = goldenapple - userid.Balance
            return message.reply(`You Dont Have Enough Money Earn ${earn} More To Get Golden Apple!`)
        }
    } else if (args[0] == 'apple') {// toys chocolate pizza goldenapple apple orange icecream
        if(args[1] > 10){
            return message.channel.send(`You Can Only Buy 10 Apples At A Time!`)
        }
        if(args[1]) amount = args[1]
        else amount = 1
        let totalamount = amount*apple
        if (userid.Balance > totalamount) {
            userid.apple += parseInt(amount)
            if(amount > 1) ap = 'Apples'
            else ap = 'Apple'
            let Embed2 = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`Purchased ${amount} ${ap} For ${totalamount} Coins`);
            userid.Balance -= parseInt(totalamount)
            userid.save().catch(err => console.log(err))
            return message.channel.send(Embed2)

        } else {
            let earn = apple - userid.Balance
            return message.reply(`You Dont Have Enough Money Earn ${earn} More To Get Apple!`)
        }
    } else if (args[0] == 'orange') {// toys chocolate pizza goldenapple apple orange icecream
        if(args[1] > 10){
            return message.channel.send(`You Can Only Buy 10 Orange At A Time!`)
        }
        if(args[1]) amount = args[1]
        else amount = 1
        let totalamount = amount*orange
        if (userid.Balance > totalamount) {
            userid.orange += parseInt(amount)

            let Embed2 = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`Purchased Orange ${amount} For ${totalamount} Coins`);
            userid.Balance -= parseInt(totalamount)
            userid.save().catch(err => console.log(err))
            return message.channel.send(Embed2)

        } else {
            let earn = orange - userid.Balance
            return message.reply(`You Dont Have Enough Money Earn ${earn} More To Get Orange!`)
        }
    } else if (args[0] == 'icecream') {// toys chocolate pizza goldenapple apple orange icecream
        if(args[1] > 10){
            return message.channel.send(`You Can Only Buy 10 Icecream At A Time!`)
        }
        if(args[1]) amount = args[1]
        else amount = 1
        let totalamount = amount*icecream
        if (userid.Balance > totalamount) {
            userid.icecream += parseInt(amount)

            let Embed2 = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`Purchased Icecream ${amount} For ${totalamount} Coins`);
            userid.Balance -= parseInt(totalamount)
            userid.save().catch(err => console.log(err))
            return message.channel.send(Embed2)

        } else {
            let earn = icecream - userid.Balance
            return message.reply(`You Dont Have Enough Money Earn ${earn} More To Get Icecream!`)
        }
    }
    
}
}

exports.help = {
    name: "buy",
    description: "Buy Items With This Command!."
}

exports.conf = {
    aliases: [],
    cooldown: 10
}
