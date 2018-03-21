const credentials = require('./credentials.json')
const db = require('./data.js')

const Discord = require('discord.js')
const client = new Discord.Client()

let offLoadBot = undefined

if (credentials.offLoadBotToken) {
  offLoadBot = new Discord.Client()
  offLoadBot.login(credentials.offLoadBotToken)
} else {
  console.log("Offload Bot not set. Becareful as you may hit a rate limit with logging.")
}


const prefix = ';'

if (!db.data.logs) {
  console.log("Please use the init command to set up logging server.")
}

client.on('ready', () => {
  client.user.setAFK(true)
  console.log('I am ready!')
})

client.on('message', message => {
  //ignore all message that isn't from our account or doesnt start with prefix.
  if (message.author != client.user || !message.content.startsWith(prefix)) return

  //trimming first character of command to find the command name ie ;test -> test .
  let command = message.content.split(' ')[0]
  command = command.substring(1)
  //running exports.run from the commands. if command doesnt exist, the catch block will handle it.
  try {
    //arguments would be terms after the command. Passed into loadCommand.run() as an array.
    let args = message.content.split(' ')
    args.shift()

    let loadCommand = require(`./commands/${command}`)
    loadCommand.run(Discord, client, message, args)

    //deleting the require so if the command file changes, we can immediately use the new code.
    delete require.cache[require.resolve(`./commands/${command}`)]
  } catch (error) {
    //let it fail silently when command cannot be found.
    return
  }
})

client.on('channelCreate', channel => {
  if (!db.data.logs) return
  if (offLoadBot) {
    require('./events/channelCreate.js').run(Discord, offLoadBot, channel)
  } else {
    require('./events/channelCreate.js').run(Discord, client, channel)
  }
  delete require.cache[require.resolve('./events/channelCreate.js')]
})

client.on('channelDelete', channel => {
  if (!db.data.logs) return
  if (offLoadBot) {
    require('./events/channelDelete.js').run(Discord, offLoadBot, channel)
  } else {
    require('./events/channelDelete.js').run(Discord, client, channel)
  }
  delete require.cache[require.resolve('./events/channelDelete.js')]
})

client.on('channelUpdate', (oldChannel, newChannel) => {
  if (!db.data.logs) return
  if (offLoadBot) {
    require('./events/channelUpdate.js').run(Discord, offLoadBot, oldChannel, newChannel)
  } else {
    require('./events/channelUpdate.js').run(Discord, client, oldChannel, newChannel)
  }
  delete require.cache[require.resolve('./events/channelUpdate.js')]
})

client.on('guildBanAdd', (guild, user) => {
  if (!db.data.logs) return
  if (offLoadBot) {
    require('./events/guildBanAdd.js').run(Discord, offLoadBot, guild, user)
  } else {
    require('./events/guildBanAdd.js').run(Discord, client, guild, user)
  }
  delete require.cache[require.resolve('./events/guildBanAdd.js')]
})

client.on('guildBanRemove', (guild, user) => {
  if (!db.data.logs) return
  if (offLoadBot) {
    require('./events/guildBanRemove.js').run(Discord, offLoadBot, guild, user)
  } else {
    require('./events/guildBanRemove.js').run(Discord, client, guild, user)
  }
  delete require.cache[require.resolve('./events/guildBanRemove.js')]
})

client.on('messageDelete', message => {
  if (!db.data.logs) return
  if (offLoadBot) {
    require('./events/messageDelete.js').run(Discord, offLoadBot, message)
  } else {
    require('./events/messageDelete.js').run(Discord, client, message)
  }
  delete require.cache[require.resolve('./events/messageDelete.js')]
})

client.on('messageDeleteBulk', messages => {
  if (!db.data.logs) return
  if (offLoadBot) {
    require('./events/messageDeleteBulk.js').run(Discord, offLoadBot, messages)
  } else {
    require('./events/messageDeleteBulk.js').run(Discord, client, messages)
  }
  delete require.cache[require.resolve('./events/messageDeleteBulk.js')]
})

client.on('messageUpdate', (oldMessage, newMessage) => {
  if (!db.data.logs) return
  if (offLoadBot) {
    require('./events/messageUpdate.js').run(Discord, offLoadBot, oldMessage, newMessage)
  } else {
    require('./events/messageUpdate.js').run(Discord, client, oldMessage, newMessage)
  }
  delete require.cache[require.resolve('./events/messageUpdate.js')]
})

client.on('guildMemberUpdate', (oldMember, newMember) => {
  if (!db.data.logs) return
  if (offLoadBot) {
    require('./events/guildMemberUpdate.js').run(Discord, offLoadBot, oldMember, newMember)
  } else {
    require('./events/guildMemberUpdate.js').run(Discord, client, oldMember, newMember)
  }
  delete require.cache[require.resolve('./events/guildMemberUpdate.js')]
})

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
})

client.login(credentials.token)