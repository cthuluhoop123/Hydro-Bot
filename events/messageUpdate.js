const db = require('../data.js')

exports.run = function (Discord, client, oldMessage, newMessage) {
  if (oldMessage.content == newMessage.content || oldMessage.author.bot || !oldMessage.content || !newMessage.content || !oldMessage.member) return
  if (oldMessage.content.length > 1024 || newMessage.content.length > 1024) {
    try {
      let embed = new Discord.RichEmbed()
        .setColor(0x009688)
        .setAuthor(`Message Edited`, oldMessage.author.avatarURL)
        .addField('Author', `${oldMessage.member.displayName}(${oldMessage.author.username}#${oldMessage.author.discriminator})`)
        .addField('Guild', oldMessage.guild.name, true)
        .addField('Channel', oldMessage.channel.name, true)
        .setDescription(`**Original Message**\n${oldMessage.content}\n**New Message**${newMessage.content}`)
        .setFooter(`Hydro-Bot`)
        .setTimestamp()
      client.channels.get(db.data.logs.messages).send({ embed })
    } catch (error) {
      return
    }
  } else {
    let embed = new Discord.RichEmbed()
      .setColor(0x009688)
      .setAuthor(`Message Edited`, oldMessage.author.avatarURL)
      .addField('Author', `${oldMessage.member.displayName}(${oldMessage.author.username}#${oldMessage.author.discriminator})`)
      .addField('Guild', oldMessage.guild.name, true)
      .addField('Channel', oldMessage.channel.name, true)
      .addField('Original message', oldMessage.content, true)
      .addField('Updated message', newMessage.content, true)
      .setFooter(`Hydro-Bot`)
      .setTimestamp()
    client.channels.get(db.data.logs.messages).send({ embed })
  }
}