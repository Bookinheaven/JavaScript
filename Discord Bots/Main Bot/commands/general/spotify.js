const { MessageAttachment } = require('discord.js');
const ownsport = require('../../include/Spotify')
exports.run = async (client, message, args) => {
        let user = message.mentions.users.first() || message.author;
        let status;
        if(user.presence.activities.length === 1) status = user.presence.activities[0]
        else if(user.presence.activities.length > 1) status = user.presence.activities[1]

        if (user.presence.activities.length === 0 || status.name !== "Spotify" && status.type !== "LISTENING") return message.channel.send("This user isn't listening the Spotify.");
        
        if (status !== null && status.type === "LISTENING" && status.name === "Spotify" && status.assets !== null) {
        let image = `https://i.scdn.co/image/${status.assets.largeImage.slice(8)}`,
            url = `https://open.spotify.com/track/${status.syncID}`,
            name = status.details,
            artist = status.state,
            album = status.assets.largeText,
            timeStart = status.timestamps.start,
            timeEnd = status.timestamps.end
        const card = new ownsport()
        .setAuthor(artist)
        .setAlbum(album)
        .setStartTimestamp(timeStart)
        .setEndTimestamp(timeEnd)
        .setImage(image)
        .setTitle(name);
        card.build()
            .then(data => {
                const attachment = new MessageAttachment(data, "sos.png");
                message.channel.send(attachment);
            });
        }
    }




exports.help = {
    name: "spotify",
    description: "Show Your Level Profile!.",
    description: "shows stats of the person listening",
    usage: "[no mention | mention (optional)]",
  }
  
  exports.conf = {
    aliases: [],
    cooldown: 10
  }