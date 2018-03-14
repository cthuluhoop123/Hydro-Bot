exports.run = async function (Discord, client, message, args = ['2']) {
  if (!parseInt(args[0])) {
    message.edit("``Please provide a number to purge.``")
    return
  }
  console.log("Purging...")
  let fetchMessages = await message.channel.fetchMessages({
    limit: 100
  })
  let myMessage = fetchMessages.array().filter(message => message.author == client.user)
  if(parseInt(args[0] + 1) < myMessage.length) {
    myMessage.length = parseInt(args[0]) + 1
  }
  myMessage.forEach(message => {
    console.log(message.author.id)
    message.delete()
  })
}

exports.help = {
  info: 'Deletes a given amound of messages. 1 by default.'
}
