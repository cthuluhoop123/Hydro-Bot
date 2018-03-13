const fs = require('fs')

const database = module.exports = {
  data: require('./db.json')
}

database.saveDb = function () {
  fs.writeFile('./db.json', JSON.stringify(database.data), err => {
    if (err) {
      throw (err)
    }
  })
}
