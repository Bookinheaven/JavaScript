const Discord = require("discord.js");
const welcome = require('../models/onlyguild')
const welcomes = require('../assets/welcome.json')
const Canvas = require('canvas')
const jimp = require("jimp");
const moment = require('moment')
module.exports = async (client, member) => {

    const data2 = await welcome.findOne({
        GuildID: member.guild.id
    });
    if(!data2) return;
    if(data2.lefting){
      if (data2.lefting === false) return;
      if(!data2.left) return;
      const textChannel = member.guild.channels.cache.find(ch => ch.id === data2.left)
      if (!textChannel) return ;
      if (data2.lefttype === 0) backs = "normal"
      else if (data2.lefttype === 1) backs = "abstract"
      else if (data2.lefttype === 2) backs = "anime"
      else if (data2.lefttype === 3) backs = "nature"
      else if (data2.lefttype === 4) backs = "colors"
      else if (data2.lefttype === 5) backs = "avengers"
      else return;
      var autoval = [Math.floor(Math.random() * welcomes.welcomes[backs].length)]
      let back1 = welcomes.welcomes[backs]
      let back = back1[autoval]

      const canvas = Canvas.createCanvas(700, 250);
      const ctx = canvas.getContext("2d");

      const font = 'sans-serif';
      blur = false
    // let link = 'https://coverfiles.alphacoders.com/470/47086.png'
      if (blur) {
        const background = await jimp.read(back);

        background.blur(5);

        let mraw = await background.getBufferAsync("image/png");

        const fixedbkg = await Canvas.loadImage(mraw);

        ctx.drawImage(fixedbkg, 0, 0, canvas.width, canvas.height);
      } else {
        const fixedbkg = await Canvas.loadImage(back);

        ctx.drawImage(fixedbkg, 0, 0, canvas.width, canvas.height);
      }

      ctx.strokeRect(0, 0, canvas.width, canvas.height);

        let blurImage = await Canvas.loadImage(
          "https://cdn.discordapp.com/attachments/735118044145123348/735477847526998077/20200722_181613.png"
        )
        ctx.drawImage(blurImage, 0, 0, canvas.width, canvas.height);
      
      let xname = member.user.username;

      ctx.font = `bold 26px ${font}`;
      ctx.fillStyle = "#FFFFFF";
      ctx.textAlign = "start";
      ctx.strokeStyle = "#f5f5f5";


      ctx.fillText(`${xname}`, 278, 113);
      ctx.strokeText(`${xname}`, 278, 113);

      ctx.font = `bold 20px ${font}`;
      ctx.fillStyle = "#FFFFFF";

      ctx.fillText(`#${member.user.discriminator}`, 278, 160);

      let image = await jimp.read(
        member.user.displayAvatarURL({ format: "jpg", dynamic: true })
      );
      image.resize(1024, 1024);
      image.circle();
      let raw = await image.getBufferAsync("image/png");

      const avatar = await Canvas.loadImage(raw);
      // Draw a shape onto the main canvas
      ctx.drawImage(avatar, 72, 48, 150, 150);

      const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'left.png');

      let total = member.guild.memberCount
      let users = member.guild.members.cache.filter(member => !member.user.bot).size;
      let bots = member.guild.members.cache.filter(member => member.user.bot).size
      let textdata = data2.lefttext.replace(/<member>/g, member).replace(/<server>/g, member.guild.name).replace(/<total>/g, total).replace(/<users>/g, users).replace(/<bots>/g, bots)
      textChannel.send(`${textdata}`,attachment).catch(err => {
          if(err == 'DiscordAPIError: Missing Access'){
              let embed = new Discord.MessageEmbed()
              .setTitle('Missing Permissions! For Goodbye Images!')
              .setDescription(`:warning: I Don't Have **Access** In\nChannel **${textChannel.name}(${textChannel.id})** in Server **${member.guild.name}!**\nKindly Check That I Have Permission **'Send Messages', 'Read Messages' and 'Attach Files'**`)
              .setColor('ORANGE')
              .setThumbnail(member.guild.iconURL())
              member.guild.owner.user.send(embed).catch(err => console.log(err))
          }
      })
    }
    if(data2.setup){
      let cooldown = 180000
          let update = data2.settime
          let updated = data2.settimer
          setInterval(async () => {
            if(update) return;
            if (updated !== null && cooldown - (Date.now() - updated) > 0) {
          } else {
              setTimeout(() => {
                  require('../member_counter.js')(client, member)
              }, cooldown)
              data2.settimer = Date.now()
              await data2.save().catch(err => console.log(err))
            }
          }, 10000)
    }  
}