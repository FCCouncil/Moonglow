exports.run = (client, message, args, level) => {
// make this an embed -flatbird :))  
// If no specific command is called, show all filtered commands.
    if (!args[0]) {
      // Filter all commands by which are available for the user's level, using the <Collection>.filter() method.
      const myCommands = message.guild ? client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level) : client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level &&  cmd.conf.guildOnly !== true);
  
      // Here we have to get the command names only, and we use that array to get the longest name.
      // This make the help commands "aligned" in the output.
      const commandNames = myCommands.keyArray();
      const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
  
      let currentCategory = "";
      let output = ``;
      const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
      sorted.forEach( c => {
        const cat = c.help.category.toProperCase();
        if (currentCategory !== cat) {
          output += `\n**${cat}:** \n`;
          currentCategory = cat;
        }
        output += `\`${message.settings.prefix}${c.help.name}${" ".repeat(longest - c.help.name.length)}\` ** - ** ${c.help.description}\n`;
      });
      const Discord = require('discord.js')
        const embed = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setDescription(output)
        message.channel.send(embed);
    } else {
      // Show individual command's help.
      let command = args[0];
      if (client.commands.has(command)) {
        command = client.commands.get(command);
        if (level < client.levelCache[command.conf.permLevel]) return;
        const Discord = require('discord.js')
        const embed = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setDescription(`**Command:** ${command.help.name}\n**Description:** ${command.help.description}\n**Usage:** ${command.help.usage}`)
        message.channel.send(embed + `\n\n[Use ${message.settings.prefix}help <commandname> for details]\n`);
      }
    }
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["h", "halp"],
    permLevel: "User"
  };
  
  exports.help = {
    name: "help",
    category: "System",
    description: "Displays all the available commands for your permission level.",
    usage: "help [command]"
  };
