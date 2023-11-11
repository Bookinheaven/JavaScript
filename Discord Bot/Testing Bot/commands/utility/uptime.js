exports.run = (client, message, args) => {
  if(message.author.id === '751028800720207902' || message.author.id === '575680249380077588'){
    let seconds = Math.floor(message.client.uptime / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    seconds %= 60;
    minutes %= 60;
    hours %= 24;

    return message
      .reply(`Uptime: \`${days} day(s),${hours} hours, ${minutes} minutes, ${seconds} seconds\``)
      .catch(console.error);
  } else {
    return;
  }
  }
exports.help = {
  name: "uptime",
  description: "Check the uptime",
  usage: "uptime",
};

exports.conf = {
  aliases: [],
}
