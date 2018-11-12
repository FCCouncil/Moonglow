if (Number(process.version.slice(1).split('.')[0]) < 8) throw new RangeError('Node 8.0.0 or higher is required. Update Node on your system.');

const Discord = require('discord.js'); 
const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);
const Enmap = require('enmap');
const EnmapLevel = require('enmap-sqlite'); //eslint-disable-line no-unused-vars

const client = new Discord.Client({
  fetchAllMembers: true,
  disableEveryone: true,
}); 


client.config = require('./config.js');
// client.config.token contains the bot's token
// client.config.prefix contains the message prefix

client.logger = require('./modules/Logger.ts');

require('./modules/functions.ts')(client);

client.commands = new Enmap();
client.aliases = new Enmap();


client.settings = new Enmap({
  name: 'settings', 
  autoFetch: true});

client.blackList = new Enmap({
  name: 'blackList',
  autofetch: true,
  fetchAll:true
});

client.alerts = new Enmap({
  name: 'alerts',
  autofetch: true,
  fetchAll: true
});

client.stats = new Enmap({
  name: 'stats', 
  autoFetch: true, 
  fetchAll: true});

client.activatedServers = new Enmap({
  name: 'activatedServers', 
  autofetch: true, 
  fetchAll: true});

client.credits = new Enmap({
  name: 'credits',
  autoFetch: true,
  fetchAll: true
});

client.repPoints = new Enmap({
  name: 'reputation',
  autoFetch: true,
  fetchAll: true
});

client.userTitle = new Enmap({
  name: 'title',
  autoFetch: true,
  fetchAll: true
});

client.userBio = new Enmap({
  name: 'bio',
  autoFetch: true,
  fetchAll: true
});

const init =  async () => {

  const { join } = require('path');
  const commands = await readdir(join(__dirname, './commands/'));
  client.logger.log(`Loading a total of ${commands.length} commands.`);
  commands.forEach(f => {
    if (!f.endsWith('.js' || '.ts')) return;
    const response = client.loadCommand(f);
    if (response) console.log(response);
  });



  const evtFiles = await readdir(join(__dirname, './events/'));
  client.logger.log(`Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split('.')[0];
    client.logger.log(`Loading Event: ${eventName}`);
    const event = require(`./events/${file}`);
    client.on(eventName, event.bind(null, client));
  });

  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }

  client.login(client.config.token);

};

init();
