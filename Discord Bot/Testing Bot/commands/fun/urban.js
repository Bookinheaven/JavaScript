const urban = require('relevant-urban');
const { MessageEmbed } = require('discord.js');
exports.run = async (client, message, args) => {
        if(!args[0])
        return message.channel.send("Please Enter Something To Search");

        let image = "https://www.collinsdictionary.com/images/full/dictionary_168552845.jpg";
        try {
            let res = await urban(args.join(' '))
                if (!res) return message.channel.send("No results found for this topic, sorry!");
                let { word, urbanURL, definition, example, thumbsUp, thumbsDown, author } = res;

                let embed = new MessageEmbed()
                    .setColor("GREEN")
                    .setAuthor(`Word - ${word}`)
                    .setThumbnail(image)
                    .setDescription(`**Defintion:**\n*${definition || "No definition"}*\n\n**Example:**\n*${example || "No Example"}*`)
                    .addField("**Link**",  `[link to ${word}](${urbanURL})`)
                    //.addField('**Rating:**', `**Upvotes: ${thumbsUp}:thumbsup: | Downvotes: ${thumbsDown}:thumbsdown:**`)
                    //.addField("**Author:**", `${author || "unknown"}`)
                    .setTimestamp()

                message.channel.send(embed)
            
        } catch (e) {
            console.log(e)
            return message.channel.send("Try again")
        }
    }


exports.help = {
    name: "urban",
    description: "urban dictionary, Give information about urban words!",
    usage: "<prefix>urban [word]",
    example: "+urban burn"
}
    
exports.conf = {
    aliases: ['ub'],
    cooldown: 10
}
          