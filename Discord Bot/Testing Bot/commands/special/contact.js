const { MessageEmbed } = require('discord.js')
exports.run = async (client, message, args) => {
    let check = message.guild.channels.cache.find((c) => c.type === 'text').fetchInvites().then(invites => {
        var invite = invites.find(_i => _i)
        if(!invite) return 1
        if (invite.inviter.id == client.user.id) return 0
    }).catch(err=> console.log(err))
    let abc = await(check)
     if(abc == 0){
        let already = new MessageEmbed()
        .setColor('GOLD')
        .setTitle(`⚠️ Already Sent The Contact Message!`)
        .setDescription(`If Team Didn't Joined In 24 hours Send A Report by Command \`+report contact no one contacted yet!...\``)
        return message.channel.send(already)
     } 
     if(abc == 1){
        let Invite = await message.guild.channels.cache.find((c) => c.type === 'text')
        Invite.createInvite({
            maxAge: 0,
            maxUses: 1
        },
        `For Contact Support Team!, Requested by ${message.author.tag}`
        ).catch(err=> {
            console.log(err)
        })
        let Sender = message.author;
        const sayMessage = args.join(" ");
        let rea = new MessageEmbed()
        .setColor('GOLD')
        .setTitle('⚠️ Please Give The Reason For The Contact!')
        .setDescription(`Example: \`+contact I Can't Understand Why Welcome System Failed To Work!\``)
        if(!sayMessage) return message.channel.send(rea)
        let devServer = client.guilds.cache.get('805743940597973032')
        let channel = await devServer.channels.cache.get('817744799100436500')  
        
    let contact = new MessageEmbed()
    .setColor("00ff00")
    .setThumbnail(Sender.displayAvatarURL)
    .setDescription(`Contact message from [${message.guild.name}](${Invite.url})`)
    .setTitle("Message from contact command!")
    .addField("User", Sender, true)
    .addField("User ID: ", Sender.id, true)
    .addField("Reason: ", sayMessage)
    .setTimestamp()

        //await client.users.cache.get("751028800720207902").send(contact);

        let embed = new MessageEmbed()
        .setColor("#00ff00")
        .setTitle("Message Sent!")
        .setDescription("Your Contact Message Has Been Sent!, They Will Join In **24 hours!.**\n\n⚠️ Even though Team Didn't Joined In 24 hours Send A Report by Command: \n\`+report contact no one contacted yet!...\`")
        .addField("Reqested by ", Sender)
        .addField("Reason: ", sayMessage)
        .setFooter("Thank you for contacting with the BK Bot Beta Support!")
        await channel.send(contact)
        await message.channel.send(embed);

            message.delete();
     } else {
            let checke = new MessageEmbed()
            .setColor('GOLD')
            .setTitle('⚠️ No Permission! ⚠️')
            .setDescription(`I Dont Have Permssions To Create Invite Check it Out! ${message.author}`)
            .setTimestamp()
           return message.channel.send(checke)

     }

    

}
exports.help = {
    name: "contact",
    description: "IF You Find Any Bugs Just Report Us With This Bug Command!",
    usage: "<prefix>contact some command reason of bug",
    example: "+contact ping its not sending any message!"
  };
  
  exports.conf = {
    aliases: [],
  }