const fs = require('fs')

exports.run = async function (Discord, client, message, args) {
  let helpBody = ''
  //read all the files in the commands directory
  fs.readdir(__dirname, async (err, files) => {
    files.forEach(file => {
      //ignore the file itself
      if (file == 'help.js') return
      //loads it and gets it's help.info
      let loadCommand = require(`./${file}`)
      helpBody = helpBody + `**${file.substring(0, file.length - 3)}**: ${loadCommand.help.info}\n`

      //deletes the require so it doesnt cache for next use incase we make changes.
      delete require.cache[require.resolve(`./${file}`)]
    })

    //sends the embed
    let embed = new Discord.RichEmbed()
      .setColor(0xaaaaaa)
      .setDescription(helpBody)
      .setFooter('Hydro-Bot')
      .setTimestamp()
    let embedMsg = await message.channel.send({ embed })
    message.delete()
    embedMsg.delete(5000)
  })
}