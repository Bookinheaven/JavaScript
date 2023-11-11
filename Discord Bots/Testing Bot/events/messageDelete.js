module.exports = async (client, message, channel) => {
    if(message.author.bot) return;
    if(!message.guild) return;
    client.snipe.set(message.channel.id, {
        msg:message.content,
        user:message.author.tag,
        profilephoto:message.author.displayAvatarURL(),
        image:message.attachments.first() ? message.attachments.first().proxyURL : null,
        date:message.createdTimestamp
        
    })
}