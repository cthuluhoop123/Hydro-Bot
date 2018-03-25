exports.run = async function (Discord, client, message, args) {
  let embed = new Discord.RichEmbed()
    .setColor(0xaaaaaa)
    .setAuthor('Server Information')
    .addField('Owner', `${message.guild.owner.displayName}(${message.guild.owner.user.username}#${message.guild.owner.user.discriminator})`, true)
    .addField('Created', new Date(message.guild.createdTimestamp).toLocaleString(), true)
    .addField('Channels', message.guild.channels.array().length, true)
    .addField('Members', message.guild.members.array().length, true)
    .addField('Region', message.guild.region, true)
    .addField('Joined Date', new Date(message.guild.joinedAt).toLocaleString(), true)
    .addField('Verification Level', message.guild.verificationLevel, true)
    .addField('Other Features', message.guild.features.toString() || 'None')
    .setFooter(`Hydro-Bot`)
    .setTimestamp()
  if (message.guild.iconURL) {
    embed.setThumbnail(message.guild.iconURL)
  }
    
  message.delete()
  message.channel.send({ embed })
}

exports.help = {
  info: 'Gives server information.'
}