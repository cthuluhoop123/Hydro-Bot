exports.run = async function (Discord, client, message, args) {
  let quoteID = args[0]
  let quoteMessage = await message.channel.fetchMessages({ around: quoteID, limit: 1 })
  quoteMessage = quoteMessage.array()[0]
  let embed = new Discord.RichEmbed()
      .setColor(quoteMessage.member.displayColor)
      .setAuthor(`${quoteMessage.member.displayName} at ${new Date(quoteMessage.createdTimestamp).toLocaleString()}`, quoteMessage.author.avatarURL)
      .setDescription(quoteMessage.content)
      .setFooter(`Hydro-Bot`)
      .setTimestamp()
  message.delete()
  message.channel.send({ embed })
}

exports.help = {
  info: 'Quotes a user, given message ID.'
}