const db = require('../data.js')

exports.run = function (Discord, client, guild, user) {
  let embed = new Discord.RichEmbed()
      .setColor(0x00ff00)
      .setAuthor(`User unbanned in ${guild.name}`, guild.iconURL)
      .addField('User', `${user.username}#${user.discriminator}`)
      .setFooter(`Hydro-Bot`)
      .setTimestamp()
  client.channels.get(db.data.logs.guilds).send({ embed })
}