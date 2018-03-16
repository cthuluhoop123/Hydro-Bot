const db = require('../data.js')

exports.run = function (Discord, client, message) {
  if (!message.content || message.author.bot || !message.member) return
  let embed = new Discord.RichEmbed()
      .setColor(0xf44336)
      .setAuthor(`Message Deleted`, message.author.avatarURL)
      .addField('Author', `${message.member.displayName}(${message.author.username}#${message.author.discriminator})`)
      .addField('Guild', message.guild.name, true)
      .addField('Channel', message.channel.name, true)
      .addField('Message', message.content)
      .setFooter(`Hydro-Bot`)
      .setTimestamp()
  client.channels.get(db.data.logs.messages).send({ embed })
}