const db = require('../data.js')

exports.run = function (Discord, client, channel) {
  if (!channel.guild || !channel) return
  let embed = new Discord.RichEmbed()
      .setColor(0xf44336)
      .setAuthor(`Channel Deleted`, channel.guild.iconURL)
      .addField('Guild', channel.guild.name)
      .addField('Channel Name', channel.name)
      .setFooter(`Hydro-Bot`)
      .setTimestamp()
  client.channels.get(db.data.logs.guilds).send({ embed })
}