const { MessageEmbed } = require("discord.js");
const usersd = require('../../models/userstuff')
exports.run = async (client, message, args) => {
        const autho = await usersd.findOne({
            UserID: message.author.id
        })
        function isOdd(num) {
            if ((num % 2) == 0) return false;
            else if ((num % 2) == 1) return true;
        }

        let colour = args[0];
        let money = parseInt(args[1]);
        let moneydb = autho.Balance

        let random = Math.floor((Math.random() * 10));

        let moneyhelp = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(` Specify an amount to gamble | <prefix>roulette <color> <amount>`);

        let moneymore = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(` You are betting more than you have`);

        let colorbad = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(` Specify a color | Red [1.5x] (normal) Black [2x] (hard) Green [15x](rare)`);

        if (!colour) return message.channel.send(colorbad);
        colour = colour.toLowerCase()
        if (!money) return message.channel.send(moneyhelp);
        if (money > moneydb) return message.channel.send(moneymore);

        if (colour == "b" || colour.includes("black")) colour = 0;
        else if (colour == "r" || colour.includes("red")) colour = 1;
        else if (colour == "g" || colour.includes("green")) colour = 2;
        else return message.channel.send(colorbad);

        if (random == 1 && colour == 2) { // Green
            money *= 15
            autho.Balance += money
            let moneyEmbed1 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ You won ${money} coins\n\nMultiplier: 15x`);
            message.channel.send(moneyEmbed1)
        } else if (isOdd(random) && colour == 1) { // Red
            money = parseInt(money * 1.5)
            autho.Balance += money
            let moneyEmbed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`🔴 You won ${money} coins\n\nMultiplier: 1.5x`);
            message.channel.send(moneyEmbed2)
        } else if (!isOdd(random) && colour == 0) { // Black
            money = parseInt(money * 2)
            autho.Balance += money
            let moneyEmbed3 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`⬛ You won ${money} coins\n\nMultiplier: 2x`);
            message.channel.send(moneyEmbed3)
        } else { // Wrong
            autho.Balance -= money
            let moneyEmbed4 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ You lost ${money} coins\n\nMultiplier: 0x`);
            message.channel.send(moneyEmbed4)
        }
            autho.games += 1

            autho.save().catch(err => console.log(err))
    }

exports.help = {
    name: "roulette",
    description: "Bet a colour to win or lose",
    usage: "<prefix>roulette [color] <amount>",
    example: "+roulette r 10000"
}
    
exports.conf = {
    aliases: [],
    cooldown: 10
}
          