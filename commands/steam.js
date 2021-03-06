const SteamTotp = require('steam-totp')

const credentials = require('../credentials.json')

exports.run = async function (Discord, client, message, args) {
  if (!credentials.sharedSecret) {
    message.edit('``Please provide a steam sharedSecret in your credentials file.``')
    message.delete(5000)
    return
  } else {
    if (message.author != client.user) {
      message.channel.send(`\`\`${SteamTotp.generateAuthCode(credentials.sharedSecret)}\`\``)
      message.delete(5000)
    } else {
      message.edit(`\`\`${SteamTotp.generateAuthCode(credentials.sharedSecret)}\`\``)
      message.delete(5000)
    }
  }
}

exports.help = {
  info: 'Generate a steam 2fa token. Requires your steam sharedSecret.'
}