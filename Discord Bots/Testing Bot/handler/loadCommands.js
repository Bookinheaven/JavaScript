const Discord = require("discord.js"),
      fs = require("fs");

module.exports = client => {
  client.commands = new Discord.Collection();
  client.aliases = new Discord.Collection();
  client.helps = new Discord.Collection();
  client.cmdnames = new Discord.Collection()
  fs.readdir("./commands/", (err, categories) => {
    if (err) console.log(err)
    console.log(`Found total ${categories.length} categories.`);
    
    categories.forEach(category => {
      let moduleConf = require(`../commands/${category}/module.json`);
      moduleConf.path = `./commands/${category}`;
      moduleConf.cmds = [];
      if (!moduleConf) return; 
      client.helps.set(category, moduleConf);
      
      fs.readdir(`./commands/${category}`, (err, files) => {
        console.log(`Found total ${files.length - 1} command(s) from ${category}.`);
        if (err) console.log(err);
        let commands = new Array();
        
        files.forEach(file => {
          if (!file.endsWith(".js")) return;
          let prop = require(`../commands/${category}/${file}`);
          //console.log(array)
          
          client.commands.set(prop.help.name, prop)
          
          prop.conf.aliases.forEach(alias => {
            client.aliases.set(alias, prop.help.name);
          })
          client.cmdnames.set(file.split(".")[0])
          client.helps.get(category).cmds.push(prop.help.name);
        })
      })
    })
  })
}
/*
function loadCommands(client) {
    fs.readdir('commands/', (err, files) => {

        if (err) console.log(err);
    
        const jsfile = files.filter(f => f.split('.').pop() === 'js');
        if (jsfile.length <= 0) {
            return console.log('Bot Couldn\'t Find Commands in commands Folder.');
        }
    
        jsfile.forEach((f, i) => {
            const pull = require(`../commands/${f}`);
            client.commands.set(pull.config.name, pull);
            pull.config.aliases.forEach(alias => {
                client.aliases.set(alias, pull.config.name);
            });
            pull.config.description.forEach(descr => {
                client.description.set(descr, pull.config.name);
            });
            pull.config.usage.forEach(usag => {
                client.usage.set(usag, pull.config.name);
            });
            pull.config.example.forEach(exampl => {
                client.example.set(exampl, pull.config.name);
            });
            
        });
    });
}

module.exports = {
    loadCommands
}
*/