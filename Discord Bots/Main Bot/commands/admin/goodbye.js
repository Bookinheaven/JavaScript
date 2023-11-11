const leftModel = require('../../models/onlyguild') 

exports.run = async (client, message, args) => {
    const data = await leftModel.findOne({
        GuildID: message.guild.id
    })
    if (!message.member.permissions.any(["ADMINISTRATOR", "MANAGE_GUILD", "KICK_MEMBERS", "BAN_MEMBERS"])) {
      return message.channel.send("<a:uncheck:800984261192187914> You Dont' Have Permission To Change Goodbye Settings\n Kindly Check That You Have Administrator Or Manage Guild Or Kick Members & Ban Members");
    }
    if(!args[0]) return;
    let text = args[0].toLowerCase()
    if(text == 'off') {
      if(data.lefting === true) {
        data.lefting = false
        data.save().catch(err => console.log(err));
        return message.channel.send('From Now I Can\'t send GoodBye Images!')
      } else if (data.lefting === false){
      }
    } else if(text == 'on'){
        if(data.lefting === false && data.left) {
          data.lefting = true
          data.save().catch(err => console.log(err));
          return message.channel.send('GoodBye Images Are ready now!!')
        } else if (data.lefting === true){
          return message.channel.send('GoodBye Images Are Already in Work!')
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
      if(text2 == data.lefttype) return message.channel.send(`You Need To Give New Image Type Not Old One!`)
      data.lefttype = nextchange
      data.save().catch(err => console.log(err))

      return message.channel.send(`You Changed GoodBye Images to ${text2}`)
    } else if(text == 'message'){
      let nextchange = args.join(" ").slice(8);
     // console.log(nextchange)
      if(!nextchange) return message.channel.send('Mention Some GoodBye Message!')

      if(nextchange == data.lefttext) return message.channel.send(`${data.lefttext} Is Your Before One And You Kept The Same Text Again!`)

      data.lefttext = nextchange
      data.save().catch(err => console.log(err))
      return message.channel.send(`You Changed GoodBye Message To \`${nextchange}\`!`)
    } else if (text == 'set'){
        let channel = message.mentions.channels.first()
        if(!channel) return message.channel.send("Please Mention the channel first!")
        if (!data){
            message.channel.send(`GoodBye Channel Has Set To ${channel}!`);

            let newleftData = new leftModel({
                GuildID: message.guild.id,
                left: channel.id,
                lefting: true
            })
            newleftData.save();
            return;

        }
        else if (channel.id == data.left) return message.channel.send('Please Provide A New Channel Not Old Channel')

        else if (data) {
            if(!data.left) {
              message.channel.send(`GoodBye Channel Has Set To ${channel}!`);
            } else if (data.left){
              message.channel.send(`GoodBye Channel Has Changed To ${channel}!`);
            }
            data.left = channel.id
            data.lefting = true
            data.save().catch(err => console.log(err));
        }
      } else {
         return message.channel.send(`${data.Prefix}GoodBye set #channel\n${data.Prefix}GoodBye <on\ of>\n${data.Prefix}GoodBye type [Anime or Normal or Abstract or Nature or Colors or Avengers] \nFor More Information Type ${data.Prefix}guide and see The GoodBye System`)
      }
    }
  
exports.help = {
    name: "goodbye",
    description: "Custom goodbye Image Type and Message For Server",
    usage: "+goodbye <set/message/type/on or off>",
    example: "+goodbye set 797816794134872104 or #goodbye\n+goodbye on or off\n+goodbye type anime or normal or abstract or nature or colors or avengers"
  }
  
  exports.conf = {
    aliases: ['goodbyech','gch'],
    cooldown: 10
  }
  