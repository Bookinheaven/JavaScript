const { MessageEmbed, Presence } = require("discord.js");
const { getMember } = require("../../functions.js");

exports.run = async (client, message, args) => {
        // Get a member from mention, id, or username
        let person = getMember(message, args[0]);

        if (!person || message.author.id === person.id) {
            person = message.guild.members.cache
                .filter(m => m.id !== message.author.id)
                .random();
        }

        const love = Math.random() * 100;
        const loveIndex = Math.floor(love / 10);
        const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);

        const embed = new MessageEmbed()
            .setColor("#ffb6c1")
            .addField(`☁ **${person.displayName}** loves **${message.member.displayName}** this much:`,
            `💟 ${Math.floor(love)}%\n\n${loveLevel}`);
            embed.setFooter('BK Bot © By BurnKnuckle!')

        message.channel.send(embed);
    }

exports.help = {
    name: "clove",
    description: "Calculates the love affinity you have for another person.",
    usage: "[mention | id | username]",
    example: "clove @BurnKnuckle#233"
};

exports.conf = {
    aliases: ['affinity'],
}