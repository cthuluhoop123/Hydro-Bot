const db = require('../data.js')

exports.run = function (Discord, client, channel) {
  let embed = new Discord.RichEmbed()
      .setColor(0x6666ff)
      .setAuthor(`Channel Created`, channel.guild.iconURL)
      .addField('Guild', channel.guild.name)
      .addField('Channel Name', channel.name)
      .setFooter(`Hydro-Bot`)
      .setTimestamp()
  client.channels.get(db.data.logs.guilds).send({ embed })
}