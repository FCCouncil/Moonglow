const fs = require('fs');
exports.run = (client, message, args) => {
  fs.readFile('./allowedGuildDB.json', 'utf8', async (err, data) => { // readFile method basically allows us to read the data in that file
    if (err !== null) { // Just an error checker
      return console.log(err);
    } else {
      const guildID = args[0];
      //if (typeof guildID !== 'number') return message.channel.send('TypeError: Cannot read property \'guildID\' of undefined');

      const requiredData = JSON.parse(data);
      const index = requiredData.allowedGuildIDs.indexOf(guildID);
      if (index !== -1) {
        requiredData.allowedGuildIDs.splice(index, 1);
        const guilds = client.activatedServers.get(args[1]);
        if (guilds > 1) {
          client.activatedServers.delete(args[1]);
        } else {
          client.activatedServers.remove(`${args[1]}`, `${guildID}`);
        }
        // And now we write the final data again
        const json = JSON.stringify(requiredData);
        fs.writeFile('./allowedGuildDB.json', json, 'utf8', (err) => {
          if (err !== null) {
            console.log(err);
          }
        });
        message.delete();
        const guild = client.guilds.get(guildID);
        (guild !== undefined) ? guild.leave() : null;
        message.channel.send(`✅ ***Deactivated Moonglow on ${args[0]}***`);
      }
      else {
        message.channel.send('Specified guild was never activated.');
      }
    }
  });
};
    
    
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['remove'],
  permLevel: 'Systems Support'
};
      
exports.help = {
  name: 'racd',
  category: 'System',
  description: 'Removes a server from activation.',
  usage: 'racd [...server ID] [...user ID]'
};