const db = require('../data.js')

exports.run = function (Discord, client, channel) {
  let embed = new Discord.RichEmbed()
      .setColor(0xf44336)
      .setAuthor(`Channel deleted in ${channel.guild.name}`, channel.guild.iconURL)
      .addField('Channel Name', channel.name)
      .setFooter(`Hydro-Bot`)
      .setTimestamp()
  client.channels.get(db.data.logs.guilds).send({ embed })
}