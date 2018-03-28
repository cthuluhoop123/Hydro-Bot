exports.run = async function (Discord, client, message, args) {
  let d = new Date()
  await message.edit(`\`\`Pong! 🏓 ${Date.now() - message.createdTimestamp}ms\`\``)
  message.delete(5000)
}

exports.help = {
  info: 'Pings to see if selfbot is online.'
}