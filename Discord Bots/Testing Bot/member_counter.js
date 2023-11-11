const membersa = require('./models/onlyguild') 
module.exports = async (client, member) => {
  const data = await membersa.findOne({
    GuildID: member.guild.id
  })
  if(!data) return;
  const guildid = data.GuildID
  if(data.members) memberschannel = data.members
  if(data.all) allchannel = data.all
  if(data.bots) botchannel = data.bots
  if(data.channels) channelschannel = data.channels
  if(data.text) textchannel = data.text
  if(data.voice) voicechannel = data.voice
  if(data.categories) categorieschannel = data.categories
  if(data.announcement) announcementchannel = data.announcement
  if(data.roles) roleschannel = data.roles
  if(data.role) rolechannel = data.role , roleid = data.roleid
  if(data.emojis) emojischannel = data.emojis
  if(data.static) staticchannel = data.static
  if(data.animated) animatedchannel = data.animated
  if(data.boosts) boostschannel = data.boosts
  if(data.tier) tierchannel = data.tier

  const updateMembers = (guild) => {
    if(!data.members){
    } else if(memberschannel){
      let channel = guild.channels.cache.get(memberschannel)
      if(!channel) {
        data.members = undefined
        data.save().catch(err => console.log(err))
      }
      if(channel){
        if(!channel.name.match(/\d+/g)){
          on1 = `Members: ${guild.members.cache.filter(member => !member.user.bot).size.toLocaleString()}`
          console.log(`members ---> ${on1}`)
          channel.setName(`${on1}`)
        } else if(channel.name.match(/\d+/g)){
        let matches = channel.name.match(/\d+/g).reverse();; 
        if(matches) {
          on1 = channel.name.replace(matches[0], `${guild.members.cache.filter(member => !member.user.bot).size.toLocaleString()}`)
          console.log(`members ---> ${on1}`)
          channel.setName(`${on1}`)
        }
      }
    }

    }
    if(!data.all){
    } else if(allchannel){
      let channel = guild.channels.cache.get(allchannel)
      if(!channel) {
        data.all = undefined
        data.save().catch(err => console.log(err))
      }
      if(channel){
        if(!channel.name.match(/\d+/g)) {
          on2 = `All Members: ${guild.memberCount.toLocaleString()}`
          console.log(`all ---> ${on2}`)
          channel.setName(`${on2}`)
        } else if(channel.name.match(/\d+/g)) {
        let matches = channel.name.match(/\d+/g).reverse();; 
        if(matches){
          on2 = channel.name.replace(matches[0], `${guild.memberCount.toLocaleString()}`)
          console.log(`all ---> ${on2}`)
          channel.setName(`${on2}`)
      }
    }
  }
    }
    if(!data.bots){
    } else if(botchannel){
      let channel = guild.channels.cache.get(botchannel)
      if(!channel) {
        data.bots = undefined
        data.save().catch(err => console.log(err))
      }
      if(channel){
        if(!channel.name.match(/\d+/g)){
          on3 = `Bots: ${guild.members.cache.filter(member => member.user.bot).size.toLocaleString()}`
          console.log(`bot ---> ${on3}`)
          channel.setName(`${on3}`)
        } else if(channel.name.match(/\d+/g)) {
        let matches = channel.name.match(/\d+/g).reverse();
        if(matches) {
          on3 = channel.name.replace(matches[0], `${guild.members.cache.filter(member => member.user.bot).size.toLocaleString()}`)
          console.log(`bot ---> ${on3}`)
          channel.setName(`${on3}`)
        }
      }
    } 
    }
    if(!data.channels){
    } else if(channelschannel){
      let channel = guild.channels.cache.get(channelschannel)
      if(!channel) {
        data.channels = undefined
        data.save().catch(err => console.log(err))
      }
      if(channel){
        if(!channel.name.match(/\d+/g)){
          on4 = `Channels: ${guild.channels.cache.size.toLocaleString()}`
          console.log(`channels ---> ${on4}`)
          channel.setName(`${on4}`)
        } else if(channel.name.match(/\d+/g)) {
            let matches = channel.name.match(/\d+/g).reverse();
            if(matches){
              on4 = channel.name.replace(matches[0], `${guild.channels.cache.size.toLocaleString()}`)
              console.log(`channels ---> ${on4}`)
              channel.setName(`${on4}`)
        }
      }
    }
    }
    if(!data.text){
    } else if(textchannel){
      let channel = guild.channels.cache.get(textchannel)
      if(!channel) {
        data.text = undefined
        data.save().catch(err => console.log(err))
      }
      if(channel){
        if(!channel.name.match(/\d+/g)){
          on5 = `Text Channels: ${guild.channels.cache.filter(r => r.type === "text").size.toLocaleString()}`
          console.log(`Text Channels ---> ${on5}`)
          channel.setName(`${on5}`)
        } else if(channel.name.match(/\d+/g)){
          let matches = channel.name.match(/\d+/g).reverse();
          if (matches) {
            on5 = channel.name.replace(matches[0], `${guild.channels.cache.filter(r => r.type === "text").size.toLocaleString()}`)
            console.log(`Text Channels ---> ${on5}`)
            channel.setName(`${on5}`)
          }
        }
      }
    } 
    if(!data.voice){
    } else if(voicechannel){
      let channel = guild.channels.cache.get(voicechannel)
      if(!channel) {
        data.voice = undefined
        data.save().catch(err => console.log(err))
      }
      if(channel){
        if(!channel.name.match(/\d+/g)){
          on6 = `Voice Channels: ${guild.channels.cache.filter(r => r.type === "voice").size.toLocaleString()}`
          console.log(`voice Channels ---> ${on6}`)
          channel.setName(`${on6}`)
        } else if(channel.name.match(/\d+/g)){
            let matches = channel.name.match(/\d+/g).reverse();
            on6 = channel.name.replace(matches[0], `${guild.channels.cache.filter(r => r.type === "voice").size.toLocaleString()}`)
            console.log(`voice Channels ---> ${on6}`)
            channel.setName(`${on6}`)
        }
      }
    } 
    if(!data.categories){
    } else if(categorieschannel){
      let channel = guild.channels.cache.get(categorieschannel)
      if(!channel) {
        data.categories = undefined
        data.save().catch(err => console.log(err))
      }
      if(channel){
        if(!channel.name.match(/\d+/g)){
          on7 = `Total Categories: ${guild.channels.cache.filter(r => r.type === "category").size.toLocaleString()}`
          console.log(`Total Categories ---> ${on7}`)
          channel.setName(`${on7}`)
        } else if(channel.name.match(/\d+/g)){
            let matches = channel.name.match(/\d+/g).reverse();
            on7 = channel.name.replace(matches[0], `${guild.channels.cache.filter(r => r.type === "category").size.toLocaleString()}`)
            console.log(`Total Categories ---> ${on7}`)
            channel.setName(`${on7}`)
        }
      }
      
    } 
    if(!data.announcement){
    } else if(announcementchannel){
      let channel = guild.channels.cache.get(announcementchannel)
      if(!channel) {
        data.announcement = undefined
        data.save().catch(err => console.log(err))
      }
      if(channel){
        if(!channel.name.match(/\d+/g)){
          on8= `Announcement: ${guild.channels.cache.filter(r => r.type === "news").size.toLocaleString()}`
          console.log(`Announcement ---> ${on8}`)
          channel.setName(`${on8}`)
        } else if(channel.name.match(/\d+/g)){
            let matches = channel.name.match(/\d+/g).reverse();
            if(matches){
              on8 = channel.name.replace(matches[0], `${guild.channels.cache.filter(r => r.type === "news").size.toLocaleString()}`)
              console.log(`Announcement ---> ${on8}`)
              channel.setName(`${on8}`)
            }
          }
        }
    }
    if(!data.roles){
    } else if(roleschannel){
      let channel = guild.channels.cache.get(roleschannel)
      if(!channel) {
        data.roles = undefined
        data.save().catch(err => console.log(err))
      }
      if(channel){
        if(!channel.name.match(/\d+/g)){
          on9= `Roles: ${guild.roles.cache.size.toLocaleString()}`
          console.log(`Roles ---> ${on9}`)
          channel.setName(`${on9}`)
        } else if(channel.name.match(/\d+/g)){
            let matches = channel.name.match(/\d+/g).reverse();
            if(matches) {
            on9 = channel.name.replace(matches[0], `${guild.roles.cache.size.toLocaleString()}`)
            console.log(`Roles ---> ${on9}`)
            channel.setName(`${on9}`)
          }
        }
      }
    }
    if(!data.role){
    } else if(rolechannel){
      let channel = guild.channels.cache.get(rolechannel)
      if(!channel) {
        data.roles = undefined
        data.roleid = undefined
        data.save().catch(err => console.log(err))
      }
      const sec2 = guild.roles.cache.find(role => role.id === data.roleid);
      if(!sec2){
        data.roles = undefined
        data.roleid = undefined
        data.save().catch(err => console.log(err))
      }
      if(channel){
        if(!channel.name.match(/\d+/g)){
          on10 = `Solo Roles: ${sec2.members.size.toLocaleString()}`
          console.log(`Solo Roles ---> ${on10}`)
          channel.setName(`${on10}`)
        } else if(channel.name.match(/\d+/g)){
            let matches = channel.name.match(/\d+/g).reverse();
            if(matches){
            on10 = channel.name.replace(matches[0], `${sec2.members.size.toLocaleString()}`)
            console.log(`Solo Roles ---> ${on10}`)
            channel.setName(`${on10}`)
            }
        }
      }
    } 
    if(!data.emojis){
    } else if(emojischannel){
      let channel = guild.channels.cache.get(emojischannel)
      if(!channel) {
        data.emojis = undefined
        data.save().catch(err => console.log(err))
      }
      if(channel){
        if(!channel.name.match(/\d+/g)){
          on11 = `Total emojis : ${guild.emojis.cache.size.toLocaleString()}`
          console.log(`Total emojis ---> ${on11}`)
          channel.setName(`${on11}`)
        } else if(channel.name.match(/\d+/g)){
            let matches = channel.name.match(/\d+/g).reverse();
            on11 = channel.name.replace(matches[0], `${guild.emojis.cache.size.toLocaleString()}`)
            console.log(`Total emojis ---> ${on11}`)
            channel.setName(`${on11}`)
        }
      }
    } 
    if(!data.static){
    } else if(staticchannel){
      let channel = guild.channels.cache.get(staticchannel)
      if(!channel) {
        data.static = undefined
        data.save().catch(err => console.log(err))
      }
      if(channel){
        if(!channel.name.match(/\d+/g)){
          on12 = `Static emojis: ${guild.emojis.cache.filter(e => e.animated === false).size.toLocaleString()}`
          console.log(`Static emojis ---> ${on12}`)
          channel.setName(`${on12}`)
        } else if(channel.name.match(/\d+/g)){
          let matches = channel.name.match(/\d+/g).reverse();
          if(matches){
            on12 = channel.name.replace(matches[0], `${guild.emojis.cache.filter(e => e.animated === false).size.toLocaleString()}`)
            console.log(`Static emojis ---> ${on12}`)
            channel.setName(`${on12}`)
          }
        }      
      }
    }
    if(!data.animated){
    } else if(animatedchannel){
      let channel = guild.channels.cache.get(animatedchannel)
      if(!channel) {
        data.animated = undefined
        data.save().catch(err => console.log(err))
      }
      if(channel){
        if(!channel.name.match(/\d+/g)){
          on13 = `Animated emojis: ${guild.emojis.cache.filter(e => e.animated === true).size.toLocaleString()}`
          console.log(`Animated emojis ---> ${on13}`)
          channel.setName(`${on13}`)
        } else if(channel.name.match(/\d+/g)){
          let matches = channel.name.match(/\d+/g).reverse();
          if(matches){
            on13 = channel.name.replace(matches[0], `${guild.emojis.cache.filter(e => e.animated === true).size.toLocaleString()}`)
            console.log(`Animated emojis ---> ${on13}`)
            channel.setName(`${on13}`)
          }
        } 
      }
    }
    if(!data.boosts){
    } else if(boostschannel){
      let channel = guild.channels.cache.get(boostschannel)
      if(!channel) {
        data.boosts = undefined
        data.save().catch(err => console.log(err))
      }
      if(channel){
        if(!channel.name.match(/\d+/g)){
          on14 = `Boosts: ${guild.premiumSubscriptionCount.toLocaleString()}`
          console.log(`Boosts ---> ${on14}`)
          channel.setName(`${on14}`)
        } else if(channel.name.match(/\d+/g)){
          let matches = channel.name.match(/\d+/g).reverse();
          if(matches){
            on14 = channel.name.replace(matches[0], `${guild.premiumSubscriptionCount.toLocaleString()}`)
            console.log(`Boosts ---> ${on14}`)
            channel.setName(`${on14}`)
          }
        }  
      }
    }
    if(!data.tier){
    } else if(tierchannel){
      let channel = guild.channels.cache.get(tierchannel)
      if(!channel) {
        data.tier = undefined
        data.save().catch(err => console.log(err))
      }
      if(channel){
        if(!channel.name.match(/\d+/g)){
          on14 = `Tier: ${guild.premiumTier.toLocaleString()}`
          console.log(`Tier ---> ${on14}`)
          channel.setName(`${on14}`)
        } else if(channel.name.match(/\d+/g)){
          let matches = channel.name.match(/\d+/g).reverse();
          if(matches){
            on14 = channel.name.replace(matches[0], `${guild.premiumTier.toLocaleString()}`)
            console.log(`Tier ---> ${on14}`)
            channel.setName(`${on14}`)
          }
        }
      }
      
    }

  }

  client.on('guildMemberAdd', (member) => updateMembers(member.guild))
  client.on('guildMemberRemove', (member) => updateMembers(member.guild))

  const guildi = client.guilds.cache.get(guildid)
  updateMembers(guildi)
  console.log(`Updated Member Count of ${guildi.name}!`)
}
