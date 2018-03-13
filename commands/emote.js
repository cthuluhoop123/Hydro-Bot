const emoteList = {
  lenny: '( ͡° ͜ʖ ͡°)'
}

exports.run = async function (Discord, client, message, args) {
  if (!emoteList[args[0]]) {
    message.delete()
    return
  }
  message.edit(emoteList[args[0]])
}

exports.help = {
  info: 'Takes 1 emote argument ie \`\`emote lenny\`\`.'
}