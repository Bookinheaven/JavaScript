exports.run = async (client, message, args) => {
        if (message.deletable) {
            await message.delete().catch(err => console.log(err))
        }
    
        // Member doesn't have permissions
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("You can't Delete messages....").then(msg => {
                msg.delete({ timeout: 5000 }).catch(err => console.log(err))
            })
        }

        // Check if args[0] is a number
        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.reply("Please Provide Number More Than 1").then(msg => {
                msg.delete({ timeout: 5000 }).catch(err => console.log(err))
            })
        }

        // Maybe the bot can't delete messages
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("I Don't Have Permission To Delete Messages ").then(msg => {
                msg.delete({ timeout: 5000 }).catch(err => console.log(err))
            })
        }

        let deleteAmount;

        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        deleted = await message.channel.bulkDelete(deleteAmount, true)
        .then(deleted => message.channel.send(`<a:trash:804277099979472908> I Deleted \`${deleted.size}\` Messages.`).then(msg => {
            msg.delete({ timeout: 3000 }).catch(err => console.log(err))
          }))

        .catch(err => console.log(err));
    }

exports.help = {
    name: "clear",
    description: "This Command Clears The Chat!",
    usage: "clear <Number>",
    example: "+clear 4"
};

exports.conf = {
    aliases: ["purge", "nuke"],
}   