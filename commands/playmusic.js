const ytdl = require("ytdl-core")

exports.run = async function (Discord, client, message, args = []) {
  await message.edit('``Loading audio...``')
  if (args.length != 2) {
    message.edit('``Please include a voice channel ID and a youtube URL!``')
    message.delete(5000)
    return
  }
  if (!args[0].match(/[0-9]+/)) {
    message.edit('``Please include a valid voice channel ID!``')
    message.delete(5000)
    return
  }
  if (!args[1].match(/(https?:\/\/)?(www.)?youtube\.com\/watch\?v=[a-zA-Z0-9]+/)) {
    message.edit('``Please include a valid youtube URL!``')
    message.delete(5000)
    return
  }
  let voiceChannel = client.channels.get(args[0])
  if (!voiceChannel.joinable) {
    message.edit('``You don\'t have sufficient permission to join that voice channel!``')
    message.delete(5000)
    return
  }
  const streamOptions = { seek: 0, volume: 1 }
  try {
    let connection = await voiceChannel.join()
    const stream = ytdl(args[1], { filter : 'audioonly' })
    const dispatcher = connection.playStream(stream, streamOptions)
    dispatcher.once('end', () => {
      connection.disconnect()
    })
    message.delete(5000)
  } catch (error) {
    message.edit('``An unknown error has occured...please raise an issue on Hydro-Bot\'s Github.``')
    message.delete(5000)
    return
  }
}

exports.help = {
  info: 'Joins a given voice channel and plays audio from a youtube video.'
}