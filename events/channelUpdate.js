const db = require('../data.js')

exports.run = function (Discord, client, oldChannel, newChannel) {
  if (oldChannel.name == newChannel.name) return
  let embed = new Discord.RichEmbed()
      .setColor(0xb2b2ff)
      .setAuthor(`Channel Name Changed`, oldChannel.guild.iconURL)
      .addField('Guild', oldChannel.guild.name)
      .addField('Old Name', oldChannel.name)
      .addField('New Name', newChannel.name)
      .setFooter(`Hydro-Bot`)
      .setTimestamp()
  client.channels.get(db.data.logs.guilds).send({ embed })
}