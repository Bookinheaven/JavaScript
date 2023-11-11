const welcomeModel = require('../../models/onlyguild') 

exports.run = async (client, message, args) => {
    const data = await welcomeModel.findOne({
        GuildID: message.guild.id
    })
    if (!message.member.permissions.any(["ADMINISTRATOR", "MANAGE_GUILD", "KICK_MEMBERS", "BAN_MEMBERS"])) {
      return message.channel.send("<a:uncheck:800984261192187914> You Dont' Have Permission To Change Welcome Settings\n Kindly Check That You Have Administrator Or Manage Guild Or Kick Members & Ban Members");
    }
    if(!args[0]) return;
    let text = args[0].toLowerCase()
    if(text == 'off') {
      if(data.Welcoming === true) {
        data.Welcoming = false
        data.save().catch(err => console.log(err));
        return message.channel.send('From Now I Can\'t send Welcome Images!')
      } else if (data.Welcoming === false){
      }
    } else if(text == 'on'){
        if(data.Welcoming === false && data.Welcome) {
          data.Welcoming = true
          data.save().catch(err => console.log(err));
          return message.channel.send('Welcome Images Are ready now!!')
        } else if (data.Welcoming === true){
          return message.channel.send('Welcome Images Are Already in Work!')
        }
    } else if(text == 'type'){
      if(!args[1]) return message.channel.send('Mention type of picture in [Anime or Normal or Abstract or Nature or Colors or Avengers]');
      let text2 = args[1].toLowerCase()
      if(!text2) return message.channel.send('Mention type of picture in [Anime or Normal or Abstract or Nature or Colors or Avengers]')
      
      if (text2 == "normal") nextchange = 0
      else if (text2 == "abstract") nextchange = 1
      else if (text2 == "anime") nextchange = 2
      else if (text2 == "nature") nextchange = 3
      else if (text2 == "colors") nextchange = 4
      else if (text2 == "avengers") nextchange = 5
      else return message.channel.send('[Anime or Normal or Abstract or Nature or Colors or Avengers]');
      if(text2 == data.welcometype) return message.channel.send(`You Need To Give New Image Type Not Old One!`)
      data.welcometype = nextchange
      data.save().catch(err => console.log(err))

      return message.channel.send(`You Changed Welcome Images to ${text2}`)
    } else if(text == 'message'){
      let nextchange = args.join(" ").slice(8);
//      let channel = message.mentions.channels
 //     console.log(channel)
   //   console.log(nextchange)
      if(!nextchange) return message.channel.send('Mention Some Welcome Message!')

      if(nextchange == data.Welcometext) return message.channel.send(`${data.Welcometext} Is Your Before One And You Kept The Same Text Again!`)

      data.Welcometext = nextchange
      data.save().catch(err => console.log(err))
      return message.channel.send(`You Changed Welcome Message To \`${nextchange}\`!`)
    } else if (text == 'set'){
        let channel = message.mentions.channels.first()
        if(!channel) return message.channel.send("Please Mention the channel first!")
        if (!data){
            message.channel.send(`Welcome Channel Has Set To ${channel}!`);

            let newwelcomeData = new welcomeModel({
                GuildID: message.guild.id,
                Welcome: channel.id,
                Welcoming: true
            })
            newwelcomeData.save();
            return;

        }
        else if (channel.id == data.Welcome) return message.channel.send('Please Provide A New Channel Not Old Channel')
        else if (data) {
            if(!data.Welcome) {
              message.channel.send(`Welcome Channel Has Set To ${channel}!`);
            } else if (data.Welcome){
              message.channel.send(`Welcome Channel Has Changed To ${channel}!`);
            }
            data.Welcome = channel.id
            data.Welcoming = true
            data.save().catch(err => console.log(err));
        }
      } else {
        message.channel.send(`${data.Prefix}welcome set #channel\n${data.Prefix}welcome <on\ of>\n${data.Prefix}welcome type [Anime or Normal or Abstract or Nature or Colors or Avengers] \nFor More Information Type ${data.Prefix}guide and see The Welcome System`)
      }
    }
  
exports.help = {
    name: "welcome",
    description: "Custom Welcome Message For Server",
    usage: "+welcome <set/message/type/on or off>",
    example: "+welcome set 797816794134872104 or #welcome\n+welcome on or off\n+welcome type anime or normal or abstract or nature or colors or avengers"
  }
  
  exports.conf = {
    aliases: ['welcomech','wch'],
    cooldown: 10
  }
  