exports.run = async function (Discord, client, message, args) {
  await message.edit('``Clearing notifications...``')
  let guilds = client.guilds.array()
  for (let i = 0; i < guilds.length; i++) {
    await guilds[i].acknowledge()
    await message.edit(`\`\`Cleared Notifications for ${i} of ${guilds.length}\`\``)
  }
  message.edit('``Done...``')
  message.delete(5000)
}

exports.help = {
  info: 'Clears all notifications from all servers.'
}