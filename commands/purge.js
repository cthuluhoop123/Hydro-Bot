exports.run = async function (Discord, client, message, args = ['1']) {
  let fetchMessages = await message.channel.fetchMessages({
    limit: 100
  })
  let myMessage = fetchMessages.array().filter(message => message.author == client.user)
  if(parseInt(args[0]) + 1 < myMessage.length) {
    myMessage.length = parseInt(args[0]) + 1
  }
  myMessage.forEach(message => {
    message.delete()
  })
}

exports.help = {
  info: 'Deletes a given amound of messages. 1 by default.'
}
