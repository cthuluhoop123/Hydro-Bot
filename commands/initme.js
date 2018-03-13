const db = require('../data.js')

exports.run = async function (Discord, client, message, args) {
  if (db.data.logs.guilds) {
    message.edit('Already setup!')
    message.delete(5000)
    return
  }
  try {
    message.edit('Setting up selfbot: Creating log guild...')
    let guild = await client.user.createGuild('Hydro-Logs', null, __dirname + '/../misc/logGuildIcon.jpg')
    message.edit('Setting up selfbot: Setting up guild...')
    let channels = await Promise.all([guild.createChannel('Messages'), guild.createChannel('Guilds')]) 
    db.data = {}
    db.data['logs'] = {
      messages: channels[0].id,
      guilds: channels[1].id
    }
    message.edit('Setting up selfbot: Saving data...')
    db.saveDb()
    message.edit('Done.')
    message.delete(5000)
  } catch (error) {
    message.edit(error.toString())
    message.delete(5000)
  }
}

exports.help = {
  info: 'Sets up the selfbot with all logging.'
}