const db = require('../data.js')

exports.run = function (Discord, client, oldChannel, newChannel) {
  if (oldChannel.name == newChannel.name) return
  let embed = new Discord.RichEmbed()
      .setColor(0x9999ff)
      .setAuthor(`Channel name changed in ${oldChannel.guild.name}`, oldChannel.guild.iconURL)
      .addField('Old Name', oldChannel.name)
      .addField('New Name', newChannel.name)
      .setFooter(`Hydro-Bot`)
      .setTimestamp()
  client.channels.get(db.data.logs.guilds).send({ embed })
}