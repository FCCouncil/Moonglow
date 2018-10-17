// This event executes when a new guild (server) is joined.
const fs = require("fs");
module.exports = (client, guild) => {
  /* this code checks to make sure that the bot is in the authorized list of servers below in the "activatedServers"
  If it's not in this list, then the bot will leave the server and then will return a DEBUG message to the console. */

  fs.readFile("./allowedGuildDB.json", "utf8", (err, data) => {
    if (err !== null) {
        console.log(err);
    }
    else {
        const allowedGuild = JSON.parse(data);
        if (allowedGuild.allowedGuildIDs.includes(guild.id)) {
            return;
        }
        else {
            return guild.leave(guild.id);
        }                                                            
    }
});

// If you don't want this feature on your bot, feel free to remove everything from this line of text to the above comment.
    


  client.logger.cmd(`[GUILD JOIN] ${guild.name} (${guild.id}) added the bot. Owner: ${guild.owner.user.tag} (${guild.owner.user.id})`);



};
