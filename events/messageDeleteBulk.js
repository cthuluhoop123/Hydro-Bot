const db = require('../data.js')

exports.run = function (Discord, client, messages) {
  let bulkDeletedMessages = messages.array().reverse()
  bulkDeletedMessages.forEach(message => {
    if (!message.content || message.author.bot || !message.member) return
    if(message.content.length > 1024) {
      let embed = new Discord.RichEmbed()
          .setColor(0xf44336)
          .setAuthor(`Message Bulk Deleted`, message.author.avatarURL)
          .addField('Guild', message.guild.name)
          .addField('Channel', message.channel.name)
          .addField('Author', `${message.member.displayName}(${message.author.username}#${message.author.discriminator})`)
          .setDescription('**Message**\n' + message.content)
          .setFooter(`Hydro-Bot`)
          .setTimestamp()
      client.channels.get(db.data.logs.messages).send({ embed })
    } else {
      let embed = new Discord.RichEmbed()
          .setColor(0xf44336)
          .setAuthor(`Message Bulk Deleted`, message.author.avatarURL)
          .addField('Guild', message.guild.name)
          .addField('Channel', message.channel.name)
          .addField('Author', `${message.member.displayName}(${message.author.username}#${message.author.discriminator})`)
          .addField('Message', message.content)
          .setFooter(`Hydro-Bot`)
          .setTimestamp()
      client.channels.get(db.data.logs.messages).send({ embed })
    }
  })
}