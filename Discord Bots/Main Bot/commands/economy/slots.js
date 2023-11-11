const slotItems = [":grapes:", ":watermelon:", ":tangerine:", ":apple:", ":jack_o_lantern:", ":blueberries:", ":strawberry:"];
const Discord = require('discord.js');
const ecostoreModel = require('../../models/userstuff')
module.exports.run = async (client, message, args) => {
    const data = await ecostoreModel.findOne({
        UserID: message.author.id
    })
    if (!data) {
        message.channel.send('You Need To Use Daily Command Once In My Life')
    }
    else if (data){
        let accbalance = await data.Balance
        let money = args[0];
        let win = false;

        let moneymore = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`You are betting more than you have`);

        let moneyhelp = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`Specify an amount`);

        if (!money) return message.channel.send(moneyhelp);
        if (money > accbalance) return message.channel.send(moneymore);

        let number = []
        for (i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }

        if (number[0] == number[1] && number[1] == number[2]) { 
            money *= 9
            win = true;
        } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) { 
            money *= 2
            win = true;
        }
        if (win) {
            let slotsEmbed1 = new Discord.MessageEmbed()
                .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou won ${money} coins`)
                .setColor("#FFFFFF")
            message.channel.send(slotsEmbed1)
            data.Balance += parseInt(money)
        } else {
            let slotsEmbed = new Discord.MessageEmbed()
                .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou lost ${money} coins`)
                .setColor("#FFFFFF")
            message.channel.send(slotsEmbed)
            data.Balance -= parseInt(money)
        }
    }
    

}
exports.help = {
    name: "slots",
    description: "Bet Money And Win Your Luck! .",
    usage: "slots",
    example: "!slots"
}

exports.conf = {
    aliases: []
}