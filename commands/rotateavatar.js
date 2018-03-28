const db = require('../data.js')
const fs = require('fs')

exports.run = async function (Discord, client, message, args) {
  if (db.data.rotateAvatar === undefined) db.data.rotateAvatar = true
    else db.data.rotateAvatar = !db.data.rotateAvatar
  db.saveDb()
  message.edit(`\`\`Avatar rotation is now ${db.data.rotateAvatar === true ? 'on' : 'off'}\`\``)
  message.delete(5000)
  this.rotateAvatar(client, 0)
  delete require.cache[require.resolve('../data.js')]
}

exports.help = {
  info: 'Pings to see if selfbot is online.'
}

exports.rotateAvatar = function (client, i) {
  let self = this
  fs.readdir(__dirname + '/../avatars', (err, files) => {
    if (files.length == 0) return
    if (i > files.length - 1) i = 0
    client.user.setAvatar(__dirname + `/../avatars/${files[i]}`)
  })
  setTimeout(() => {
    self.rotateAvatar(client, i + 1)
  }, 1000*60*15)
}