exports.run = async (client, message, args) => {
      return message.member
        .send(`https://discord.com/oauth2/authorize?client_id=${message.client.user.id}&scope=bot&permissions=405826678`)
        .then(msg => 
          { 
            msg.delete
            ({ timeout: 100000 
            }) 
          }).catch(console.error);
    }

  exports.help = {
    name: "invite",
    description: "Send bot invite link To DM",
    usage: "invite",
    example: "invite"
};

exports.conf = {
    aliases: [],
}  