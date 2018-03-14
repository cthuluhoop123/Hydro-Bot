const db = require('../data.js')

exports.run = function (Discord, client, oldMessage, newMessage) {
  if (oldMessage.content == newMessage.content) return
  let embed = new Discord.RichEmbed()
      .setColor(0x009688)
      .setAuthor(`Message Edited`, oldMessage.author.avatarURL)
      .addField('Guild', oldMessage.guild.name)
      .addField('Author', `${oldMessage.member.displayName}(${oldMessage.author.username}#${oldMessage.author.discriminator})`)
      .addField('Original message', oldMessage.content)
      .addField('Updated message', newMessage.content)
      .setFooter(`Hydro-Bot`)
      .setTimestamp()
  client.channels.get(db.data.logs.messages).send({ embed })
}