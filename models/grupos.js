const mongoose = require ('mongoose')

const gruposSchema = new mongoose.Schema ({
    Grupo: String
  })

module.exports = mongoose.model('Grupos', gruposSchema)