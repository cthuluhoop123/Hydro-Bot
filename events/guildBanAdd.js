const db = require('../data.js')

exports.run = function (Discord, client, guild, user) {
  let embed = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setAuthor(`User Banned`, guild.iconURL)
      .addField('Guild', guild.name)
      .addField('User', `${user.username}#${user.discriminator}`)
      .setFooter(`Hydro-Bot`)
      .setTimestamp()
  client.channels.get(db.data.logs.guilds).send({ embed })
}