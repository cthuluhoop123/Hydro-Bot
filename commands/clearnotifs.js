exports.run = async function (Discord, client, message, args) {
  await message.edit('``Clearing notifications...``')
  let guilds = client.guilds.array()
  guilds.forEach(async (guild, i) => {
    await guild.acknowledge()
    message.edit(`\`\`Cleared Notifications for ${i} of ${guilds.length}\`\``)
  }) 
  message.edit('``Done...``')
  message.delete(5000)
}

exports.help = {
  info: 'Clears all notifications from all servers.'
}