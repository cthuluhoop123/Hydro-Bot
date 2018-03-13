const db = require('../data.js')

exports.run = function (Discord, client, oldMember, newMember) {
  let oldRoles = oldMember.roles.map(role => role.name)
  let newRoles = newMember.roles.map(role => role.name)

  if (oldRoles == newRoles) return

  let message = ''

  oldRoles.forEach(role => {
    if (newRoles.includes(role)) {
      return
    } else {
      message = message + `**-** ${role}\n`
    }
  })

  newRoles.forEach(role => {
    if (oldRoles.includes(role)) {
      return
    } else {
      message = message + `**+** ${role}\n`
    }
  })

  if (!message) return

  let embed = new Discord.RichEmbed()
      .setColor(0xaaaaaa)
      .setAuthor(`User Roles Updated`, oldMember.guild.iconURL)
      .addField('Guild', oldMember.guild.name)
      .addField('User', `${oldMember.displayName}(${oldMember.user.username}#${oldMember.user.discriminator})`)
      .addField('Roles Modification', message)
      .setFooter(`Hydro-Bot`)
      .setTimestamp()
  client.channels.get(db.data.logs.roles).send({ embed })
}