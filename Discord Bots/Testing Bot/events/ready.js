const Discord = require('discord.js')
module.exports = async (client) => {
  var activevar = [`+help | ${client.guilds.cache.size} Servers!`, `+support | ${client.guilds.cache.size} Servers!`,`With BurnKnuckle Comrade!`];
  var activities = activevar[Math.floor(Math.random()*activevar.length)];
  //client.user.setUsername("BurnKnuckle Tester")
  await console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(activities, {type: 'PLAYING'})

}