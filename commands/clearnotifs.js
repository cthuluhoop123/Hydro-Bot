exports.run = async function (Discord, client, message, args) {
  await message.edit('``Clearing notifications...``')
  let guilds = client.guilds.array()
  guilds.forEach(async (guild, i) => {
    await guild.acknowledge()
    message.edit(`\`\`Cleared Notifications for ${i} of ${guilds.length}\`\``)
  }) 
}

exports.help = {
  info: 'Clears all notifications from all servers.'
}