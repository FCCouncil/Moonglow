const Discord = require('discord.js');
const os = require('os');
const osName = require('os-name');
//const windowsRelease = require('windows-release');
const si = require('systeminformation');




exports.run = async (client, message) => {
  const gbU =  os.totalmem / 1000000000;
  const gbR = Math.round(gbU);
    
  const freegbU = os.freemem / 1000000000;
  const freegbR = Math.round(freegbU);
  const freegbF = gbR - freegbR;

  const hours = os.uptime / 1440;
  const sysuptime = Math.floor(hours);
  const days = hours / 24;
  const sysuptimeDays = Math.round(days);

    

  const msg = await message.channel.send('Loading...');
  const embed = new Discord.RichEmbed()
    .setTitle('System Information')
    .setTimestamp();
  //let windowsVersion =si.osInfo().then(data => (data.distro));
    
  if (os.platform == 'win32') {
  /*  si.osInfo(function(data) {
      return embed.addField('Operating System', data.distro, true);
    });*/
    //embed.addField('Operating System', `${}`, true);
    //let osValue = si.osInfo();
    //embed.addField('Operating System', osValue.distro);
    //embed.addField('Operating System', `${osName(os.platform(), os.release())}`, true);
    //embed.addField('Operating System', `${windowsVersion}`, true);

    const data = await si.osInfo();
    embed.addField('Operating System', `${data.distro}`, true);
    embed.setThumbnail('https://cdn.discordapp.com/attachments/491024501971222538/491024518761021460/Windows-Logo.png');
  }
  if (os.platform == 'linux') {
    embed.addField('Operating System', 'Linux', true);
    embed.setThumbnail('https://cdn.discordapp.com/attachments/491024501971222538/491024720733536277/LINUX-LOGO.png');
  }
  if (os.platform == 'darwin') {
    embed.addField('Operating System', `${osName(os.platform(), os.release())}`, true);
    embed.setThumbnail('https://cdn.discordapp.com/attachments/491024501971222538/491024928028491779/2000px-OS_X_El_Capitan_logo.png');
  }
  if (os.platform == null || undefined) {
    embed.addField('Operating System', 'Unknown', true);
  }

  embed.addField('OS Release', `${os.release()}`, true);
  embed.addField('CPU', `${os.cpus()[0].model}`, true);
  embed.addField('CPU Cores', `${os.cpus().length}`, true);
  embed.addField('CPU Usage', `${process.cpuUsage().user}ms clock`, true);
  embed.addField('Architecture', `${os.arch}`, true);
  embed.addField('Memory', `${freegbF}GB/${gbR}GB`, true);
  embed.addField('Directory', `${os.homedir()}`, true);
  embed.addField('Process File', `${process.mainModule.filename}` ,true);
  embed.addField('System Uptime', `${sysuptimeDays} days | ${sysuptime} total hours`, true);
  embed.setFooter(client.user.username, client.user.avatarURL);
  msg.edit(embed);
};



exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Standard User'
};
  
exports.help = {
  name: 'sysinfo',
  category: 'Bot Information',
  description: 'Provides information about the computer the process is running on.',
  usage: 'sysinfo'
};