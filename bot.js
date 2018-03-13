const Discord = require('discord.js')
const client = new Discord.Client()

const credentials = require('./credentials.js')
const db = require('./data.js')

const prefix = ';'

client.on('ready', () => {
  console.log('I am ready!')
})

client.on('message', message => {
  //ignore all message that isn't from our account or doesnt start with prefix.
  if (message.author != client.user || !message.content.startsWith(prefix)) return

  //trimming first character of command to find the command name ie ;test -> test .
  let command = message.content.split()[0]
  command = command.substring(1)

  //running exports.run from the commands. if command doesnt exist, the catch block will handle it.
  try {
    //arguments would be terms after the command. Passed into loadCommand.run() as an array.
    let args = message.content.split(' ')
    args.unshift()

    let loadCommand = require(`./commands/${command}`)
    loadCommand.run(Discord, client, message, args)

    //deleting the require so if the command file changes, we can immediately use the new code.
    delete require.cache[require.resolve(`./commands/${command}`)]
  } catch (error) {
    //let it fail silently when command cannot be found.
    console.log(error)
    return
  }
})

client.on('channelCreate', channel => {
  if (!db.data.logs.guilds) return
  require('./events/channelCreate.js').run(Discord, client, channel)
  delete require.cache[require.resolve('./events/channelCreate.js')]
})

client.on('channelDelete', channel => {
  if (!db.data.logs.guilds) return
  require('./events/channelDelete.js').run(Discord, client, channel)
  delete require.cache[require.resolve('./events/channelDelete.js')]
})

client.on('channelUpdate', (oldChannel, newChannel) => {
  if (!db.data.logs.guilds) return
  require('./events/channelUpdate.js').run(Discord, client, oldChannel, newChannel)
  delete require.cache[require.resolve('./events/channelUpdate.js')]
})

client.on('guildBanAdd', (guild, user) => {
  if (!db.data.logs.guilds) return
  require('./events/guildBanAdd.js').run(Discord, client, guild, user)
  delete require.cache[require.resolve('./events/guildBanAdd.js')]
})

client.on('guildBanRemove', (guild, user) => {
  if (!db.data.logs.guilds) return
  require('./events/guildBanRemove.js').run(Discord, client, guild, user)
  delete require.cache[require.resolve('./events/guildBanRemove.js')]
})

client.login(credentials.token)