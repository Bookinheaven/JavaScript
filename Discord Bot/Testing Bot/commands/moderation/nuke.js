const { MessageEmbed } = require('discord.js')
exports.run = async (client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) {
            return message.reply("You do not have the perms to use this cmd!")
        }
        let filter = (message) => !message.author.bot;

        let options = {
          max: 1,
          time: 15000
        };
        let collector = message.channel.createMessageCollector(filter, options);

        collector.on('collect', async (m) => {
            if(m.content == 'no'){
                collector.stop()
                let canclepr = new MessageEmbed()
                .setColor('RED')
                    .setTitle(`Process Status of **Nuke Command**!`)
                    .setDescription(`:x: Process Has Been Canceled!`)
                await message.channel.send(canclepr)
                
            }
        });

        collector.on('end', async (collected, reason) => {
            if (reason === 'time') {
                let timeup = new MessageEmbed()
                .setTitle(`Process Status of **Nuke Command**!`)
                .setDescription(`⏰ Process Has Been Canceled! Because You Didn't Respond in Time!.`)
                .setColor('RED')
                message.channel.send(timeup);
            } else if(!collected.array()[0].content){
                return;
            }
            else if(collected.array()[0].content == 'yes'){
                let reason = args.join(" ") || "Unspecified"
                if(!message.channel.deletable) {
                    let embed = new MessageEmbed()
                    .setTitle('Missing Permissions! For Nuke Command!')
                    .setDescription(`:warning: I Don't Have **Access** In\nChannel **${message.channel.name}(${message.channel.id})\nKindly Check That I Have Permission **'Manage Guild' or 'Manage Messages'**`)
                    .setColor('ORANGE')
                    return message.reply(embed)
                }
                let newchannel = await message.channel.clone()
                await message.channel.delete()
                let embed = new MessageEmbed()
                    .setColor('ORANGE')
                    .setTitle("Channel Nuked!")
                    .setDescription(`Reason: ${reason}!`)
                    .setImage('https://media0.giphy.com/media/oe33xf3B50fsc/200.gif')
                await newchannel.send(embed)
            }
        })
        let itwill = new MessageEmbed()
        .setColor('GOLD')
        .setTitle(`:warning: It Will Delete The All Messages In Channel (${message.channel.name})`)
        .setDescription('If You Want To Delete Some Message Use Command `+clear <number of message less than 100>`\n If You Want To Clone Channel Then `yes` or `no`')
        message.channel.send(itwill)
    }

exports.help = {
    name: "nuke",
    description: "Nukes a given channel"
  }
  
  exports.conf = {
    aliases: [],
    cooldown: 10
  }