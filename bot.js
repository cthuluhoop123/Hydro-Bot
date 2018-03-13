const Discord = require('discord.js')
const client = new Discord.Client()

const credentials = require('./credentials.js')

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

client.login(credentials.token)