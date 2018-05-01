const db = require('../data.js')
const fs = require('fs')

let rotateTimeout = null

exports.run = async function (Discord, client, message, args) {
  if (db.data.rotateAvatar === undefined) db.data.rotateAvatar = true
    else db.data.rotateAvatar = !db.data.rotateAvatar
  if (db.data.rotateAvatar) {
    this.rotateAvatar(client, 0)
  } else {
    clearTimeout(rotateTimeout)
  }
  db.saveDb()
  message.edit(`\`\`Avatar rotation is now ${db.data.rotateAvatar === true ? 'on' : 'off'}\`\``)
  message.delete(5000)
  delete require.cache[require.resolve('../data.js')]
}

exports.help = {
  info: 'Rotates avatar from avatars folder.'
}

exports.rotateAvatar = function (client, i) {
  let self = this
  fs.readdir(__dirname + '/../avatars', (err, files) => {
    if (files.length == 0) return
    if (i > files.length - 1) i = 0
    try {
      client.user.setAvatar(__dirname + `/../avatars/${files[i]}`)
    } catch (e) {
      console.log("Failed avatar rotation. Most likely ratelimited. Trying again later.")
    }
  })
  rotateTimeout = setTimeout(() => {
    self.rotateAvatar(client, i + 1)
  }, 1000*60*45)
}