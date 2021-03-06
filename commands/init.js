const db = require('../data.js')

exports.run = async function (Discord, client, message, args) {  
  if (db.data.logs && args[0] != 'f') {
    message.edit('Already setup! Please use \`initme f\` to force create a new log guild, or replace the contents of db.json with {}')
    message.delete(5000)
    return
  }
  try {
    message.edit('``Setting up selfbot: Creating log guild...``')
    let guild = await client.user.createGuild('Hydro-Logs', null, __dirname + '/../misc/logGuildIcon.jpg')
    message.edit('``Setting up selfbot: Setting up guild...``')
    await guild.channels.forEach(channel => {
      channel.delete('Channel not used for logs.')
    })
    let channels = await Promise.all([guild.createChannel('Messages'), guild.createChannel('Guilds'), guild.createChannel('Roles')]) 
    db.data = {}
    db.data['logs'] = {
      messages: channels[0].id,
      guilds: channels[1].id,
      roles: channels[2].id
    }
    message.edit('``Setting up selfbot: Saving data...``')
    db.saveDb()
    delete require.cache[require.resolve('../data.js')]
    message.edit('``Done. If you have an offloading bot set inside credentials.json, please invite it to the server now.``')
    message.delete(10000)
  } catch (error) {
    message.edit(error.toString())
    message.delete(5000)
  }
}

exports.help = {
  info: 'Sets up the selfbot with all logging.'
}