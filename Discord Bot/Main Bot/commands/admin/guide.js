const { MessageEmbed } = require('discord.js');
const prefixdata = require('../../models/onlyguild') 

exports.run = async (client, message, args) => {
    const data = await prefixdata.findOne({
        GuildID: message.guild.id
    })
    let prefix = data.Prefix
  let avatar = message.author.avatarURL({size: 2048}); // Use 2048 for high quality avatar.

  function embeds(member, number){
    let listofnames = [' ','Leveling System!','Economy System!','ModLog System!','Music System!','Welcome System!', 'GoodBye System!','Moderation Commands!','Image Manipulcations!','Anime Emotions!','Fun Commands!','Speical Commands!']
    let nameof = listofnames[number]
    let listofde = [  
      ' ',
      `Leveling system shows you how active you are in the server by Ranking you up,\nThe more you chat the higher your rank is from the other members of the server\n\n**Normal Commands**:\n${prefix}rank or ${prefix}rank @someuser **:** *Helps To Know Your Leveling Card or Your Friends!*\n${prefix}levels **:** *To Know The Rank Of Your Members In Server!*\n\n**Admin Commands:**\n${prefix}setlevels **:** *To Make Separate Channel For Leveling Messages!*\n${prefix}setlevelings **:** *If You Want To Off Separate Channel, You Can Off or You Can On!*`,
      `Economy System Tells You About Your Future Development in World,\n\nDon't Wait For Time Make The Time To Follow You!.\nLeave The Way To Eco-System!\n\n**Normal Commands**:\n${prefix}daily : Earn 500 Everyday With This Command\n${prefix}weekly : Earn 10000[10k]-40000[40k]\n${prefix}monthly : Earn 100000[100k]-400000[400k]\n${prefix}work : Work And Get Amount 8000-10000\n${prefix}balance or ${prefix}balance @someuser: To Know The Balance Of Your Account!\n${prefix}rob @someuser : To Rob The Money From User!\n${prefix}crime : Make A Crime And Get Money\n${prefix}fish : To Use This Command You Need To Buy Fishing rod!\n${prefix}hunt : To Use This Command You Need To Buy Hunting rifle!\n${prefix}beg : Beg Money!\n${prefix}rich : To See The LeaderBoard Of Economy System in Server!\n${prefix}roulette <Bet amount> : Bet Money and Guess The Color To Earn Money!\n${prefix}gamble <amount> : Bet Money And Earn Money!\n${prefix}inventory : To see The Stuff What You Have!\n${prefix}slots : Bet Money And Win Your Luck!\n${prefix}store : To Know The Information About The Items\n${prefix}buy <item> : Buy Items From Store!\n${prefix}sell <item> : Sell Items You Have\n${prefix}deposite <amount or all> : Deposite Money In Bank!\n${prefix}withdraw <amount or all> : Take Back Your Deposites!\n\n**Pre-User Commands:**\n${prefix}peacemode : This Helps To Be Peace When Some One Is Trying To Rob You!\n${prefix}use : This Is Very Usefull Command, It Helps To Use Usable Items In Your Inventory!\n${prefix}open lootbox : This Command Helps You To Open Lootboxs\n${prefix}transfer @someuser <amount> : Transfer Money To Friends\n${prefix}eat chocolate : Earn 200 - 500`,
      `ModLog System Makes Your Server More Professional and Systematic!\n\n**Commands**:\n${prefix}modlog @someuser : Helps You To Know Yours or Your Server Mates Warn And Mutes\n${prefix}modlog set #channel : This Sends Message of Warn, Mute, Unmute, kick and Ban Stuff Information To Custom Channel Also!\n${prefix}modlog off : This Offs The Modlot Channel!`,
      `Music System Changes Your Mood And Give You A Epic Experience!\n\n**Commands**:\n${prefix}play <Song Name> : This Playings The Song You Want But It Search It Self the Song Name, You Cant Select!\n${prefix}search <Song Name> : This Give The Information About The Songs You Search And You Can Play That By Typing The Number of The Song Displayed In List!\n${prefix}pause : This Command Will Pause The Current Song!\n${prefix}resume : This Command Will Resume The Current Song Which Is Paused!\n${prefix}volume <0-100> : Changes The Volume Of The Song!\n${prefix}queue : Gives The List Of The Song Currently Added!\n${prefix}removequeue <Number> : Removes A Song From Queue\n${prefix}playlist <Playlist Title Name> : Plays The Full Play List From Youtube!\n${prefix}move : This Moves The Song To The Last of Queue!\n${prefix}shuffle : This Command Will Shuffles The Songs!\n${prefix}skip : Skips The Present Song And The Next Song In Queue Will Play!\n${prefix}skipto <Number In Queue> : This Will Skips To The Particular Song In Queue!\n${prefix}loop : This Will Loop The Queue!\n${prefix}lyrics : This Will Show The Current Playing Songs Lyrics!\n${prefix}stop : This Command Will Stop The Songs And Ends The Queue!`,
      `Welcome System Is The Best Way To Welcome New Members to Your Servers!\nYou Can Do It So Easly!\n\n**Commands**\n${prefix}welcome set #channel : This Will Set The Welcome Image Channel!\n${prefix}welcome message \`Hey <member>, Welcome to **<server>**!\`\n\n__**This Are The Indicators :**__\n**<member>** = *This Show Joined Member!*\n**<server>** = *This Shows Your Server Name!*\n**<total>** = *This Will Give A Value Of Total Users with Bots!*\n**<users>** = *This Will Give A Value Of Users With Out Bots!*\n**<bots>** = *This Will Give A Value Of Bots!*\n**To Display Channel** : *Mention the channel with #channelname*\n\n${prefix}welcome off : This Will Offs The Welcome Image Channel\n${prefix}welcome on : This Will On The Welcome Image Channel\n${prefix}welcome type : This Will Change The Image Type in List!`,
      `Goodbye System Is The Best Way To Say Goodbye To Left Members In Your Servers!\nYou Can Do It So Easly!\n\n**Commands**\n${prefix}goodbye set #channel : This Will Set The Goodbye Image Channel!\n${prefix}goodbye message \`<member>, Left The Server **<server>**!\`\n\n__**This Are The Indicators :**__\n**<member>** = *This Show Left Member!*\n**<server>** = *This Shows Your Server Name!*\n**<total>** = *This Will Give A Value Of Total Users with Bots!*\n**<users>** = *This Will Give A Value Of Users With Out Bots!*\n**<bots>** = *This Will Give A Value Of Bots!*\n**To Display Channel** : *Mention the channel with #channelname*\n\n${prefix}goodbye off : This Will Offs The Goodbye Image Channel\n${prefix}goodbye on : This Will On The Goodbye Image Channel\n${prefix}goodbye type : This Will Change The Image Type in List!`,
      `Moderation System Helps You To Decrease Bad Things In Server!\n\n**Commands**\n${prefix}warn : This Command Sends A Warn Message To Him And In Channel\n${prefix}removemutes @someuser <amount> : This Will Help You To Decrease Warns of Your Friend!\n${prefix}clear <1-100> : This Command Helps To Clear Some Amount Of Messages!\n${prefix}mute @someuser : This Command Helps To Mute Some User, No Need To Create Role!. The 'Muted' Role Will Create Automatically!\n${prefix}unmute @someuser [Who Is Already Muted] : This Will Un Mute The Person And Gives Access To Chat!\n${prefix}kick @someuser : This Command Will Kick Some User From The Server!\n${prefix}ban @someuser : This Command Bans The User From Server!`,
      `Image Manipulcation is so Fun Try Out On Your Friends, In A Friendly Manner!\n\n${prefix}slap @someuser : Creates A Image Like Slaping The Person!\n${prefix}rip @someuser : Creates A Image Like Rest In Peace The Person!\n${prefix}pornhub @someuser <text>: Creates A Image From PornHub with The Pinged User!\n${prefix}gay @someuser : Creates A Image Like Users RAINBOW Avator!\n${prefix}bed @someuser : This Creates A Image Like Monstor Under My Bed!\n${prefix}blur @someuser : This Changes The Avator to Blur!\n${prefix}circle @someuser : This Changes The Avator To Circle Shape\n${prefix}beautiful @someuser : This Command Makes A Image That Say 'This Is Beautiful'!\n${prefix}burn @someuser : This Makes A Burn Black Effect On Avator!\n${prefix}brightness @someuser <amount of burn> : This Increases The Brightness of Avator!\n${prefix}changemyname <text> : This Command Makes A Image 'Change My Name'!\n${prefix}darkness @someuser <amount of darkness> : This Decreases The Brightness of Avator!\n${prefix}delete @someuser : This Creates A Image Of Delete from Recycle Bin! \n${prefix}effect @someuser : This Creates A Image Of Effect Of KID!\n${prefix}facepalm @someuser : This Creates A Anime Face Palm Picture!\n${prefix}fuse @someuser : This Combines The Two Avators And Makes A Picture!\n${prefix}greyscale @someuser : This Make A Gray Picture Of Avator!\n${prefix}sepia @someuser : This Make A Gray Picture Of Avator But it Occupies 50%!\n${prefix}shit @someuser : This Creates Image That The Person Is Shit!\n${prefix}spank @someuser : This Makes Spank Image Of Avator!\n${prefix}trash @someuser : This Makes A Trash Image Of User\n${prefix}trigger @someuser : This Command Triggers The Users Avator!\n${prefix}wanted @someuser : This Commadn Creats A Wanted Image!\n${prefix}wasted @someuser : This Command Creates A Wasted Image!\n${prefix}youtube @someuser <text> : This Command Creates A YouTube Comment Image!`,
      `Anime Gif Emotions Are So Usefull To Have Fun!\n\n**Commands**\n${prefix}angry @someuser : This Command Posts A Angry Anime Gifs!\n${prefix}cry @someuser : This Command Posts A Crying Emotion Anime Gifs!\n${prefix}cuddle @someuser : This Command Posts Cuddling Anime Gifs!\n${prefix}disgust @someuser : This Command Posts Disgust Anime Gifs!\n${prefix}fear @someuser : This Command Posts Fearing Anime Gifs!\n${prefix}happy @someuser : This Command Posts Happy Anime Gifs!\n${prefix}hug @someuser: This Command Posts Hugging Anime Gifs!\n${prefix}kill @someuser : This Command Posts Wasted Anime Gifs!\n${prefix}loves @someuser : This Command Posts Lovely Anime Gifs!\n${prefix}pat @someuser : This Command Posts Patting Anime Gifs!\n${prefix}sad @someuser : This Command Posts Sad Anime Gifs!`,
      `Fun Commands Are Quite Opposite Of Other Commands!\nThis Commands Give You A BOOST!\n\n**Commands**\n${prefix}meme : This Command Sends Epic Memes!\n${prefix}afk <text>: This Will Help When You Dont Want To Pinged With Any One While AFK!\n${prefix}avator @someuser : This Will Show The Avator In High Quality!\n${prefix}binary <encode/decode> <text> : This Command Will Decode Or Encode The Text What You give!\n${prefix}cnjoke : This Sends Jokes!\n${prefix}dadjoke : This Sends Epic Jokes!\n${prefix}roast @someuser : This Will Roast Users!\n${prefix}rps : Rock Paper Scissors!\n${prefix}ping : This Will Show The Bot Speed!\n${prefix}snipe : This Will Show The Recent Deleted Message!\n${prefix}spotify @someuser : This Will Send A Image Of Song That The User Is Listening!\n${prefix}urban <text> : This Will Show The Meaning For The Words!\n${prefix}serverinfo : This Will Show The Server Information!\n${prefix}weather <city> : This Will Show The Weather Report Of Your City!\n${prefix}userinfo : This Will Show The User Information!\n**${prefix}help : This Is The Main Command Of The Whole Bot!**`,
      `Speical Commands Are Provided For You Guys!\n\n**Commands**\n${prefix}bug <command name> <bug issue> : This Will Send The Message To Admins!\n${prefix}clove @someuser : This Will Caluculate Love On Others FOR FUN!\n${prefix}support : Support US!\n${prefix}invite : This Will Send A Message Through DM and Gives You A Invite Link Of Bot\n${prefix}ytstat <youtube channel name> : This Will Gives You Information About Channel!\n${prefix}image <name> : This Will Sends Image of Your Search!`
    ]
    let avatar = member.avatarURL({size: 2048}); // Use 2048 for high quality avatar.
    let embeded = new MessageEmbed()
    .setAuthor(`${member.username}`, avatar)
    .setTitle(`Guide Of BK Bot **Sub Page** ${nameof}`)
    .setColor('#6300ff')
    .setDescription(`${listofde[number]}`)
    .addField(`${client.user.username}, For More Information Join:`, "Support Server: [Click here](https://discord.gg/ZBYq7Myz5d)\nBurnKnuckle Comrade Server: [Click here](https://discord.gg/VyasQKfRJc)\nMachine's Lounge | Gaming Server: [Click here](https://discord.gg/EvnYert5Wm)")
    .setTimestamp()
    .setFooter("[] optional, <> required. Don't includes these things while typing a command.")
    return embeded
  }
  let embedsss = embeds(message.author, args[0])
  switch(args[0]){
    case '1':
      message.channel.send(embedsss)
      break;
    case "2":
      message.channel.send(embedsss)
      break;
    case "3":
      message.channel.send(embedsss)
      break;
    case "4":
      message.channel.send(embedsss)
      break;
    case "5":
      message.channel.send(embedsss)
      break;
    case "6":
      message.channel.send(embedsss)
      break;
    case "7":
      message.channel.send(embedsss)
      break;
    case "8":
      message.channel.send(embedsss)
      break;
    case "9":
      message.channel.send(embedsss)
      break;
    case "10":
      message.channel.send(embedsss)
      break;
    case "11":
      message.channel.send(embedsss)
      break;
    default:
      let embed = new MessageEmbed()
        .setAuthor(`Hi ${message.author.username}`, avatar)
        .setTitle(`Guide Of BK Bot **Main Page!**`)
        .setColor('#6300ff')
        .setDescription(`I Am ${client.user.username}, I have Alot Of InBuild Commands!\nExamples:-\n**My Defualt Prefix** : +\nIf You Want To Change The Prefix Use The Command:\n${prefix}setprefix <newprefix>\nIf You Forgot Your Prefix Type **'wimp'** Without Any Prefix!\n\nI Have 11 Epic Systems!:\n1.Leveling System!\n2.Economy System!\n3.ModLog System!\n4.Music System!\n5.Welcome System!\n6.GoodBye System!\n7.Moderation Commands!\n8.Image Manipulcation!\n9.Anime Emotions!\n10.Fun Commands!\n11.Speical Commands!\n\n<:starings:805306609554817076> Use ${prefix}guide [Number of command system]\n<a:developer:808977861826052137> Any Problems Contact: '! BurnKnuckle(Big BRO!)#5091' Or 'Mr.Machine#1665'`)
        .setFooter(`${client.user.username} By ! BurnKnuckle(Big BRO!) & Mr.Machine! With <3`)
        .setTimestamp()
        return message.channel.send(embed)
    
  }


}

exports.help = {
    name: "guide",
    description: "Show The Guide Of The Bot",
    usage: "+guide <command system>",
    example: "+guide "
  }
  
  exports.conf = {
    aliases: [],
    cooldown: 10
  }
  