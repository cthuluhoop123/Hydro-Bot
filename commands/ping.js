exports.run = async function (Discord, client, message, args) {
  await message.edit('``Pong!``')
  message.delete(5000)
}

exports.help = {
  info: 'Pings to see if selfbot is online.'
}