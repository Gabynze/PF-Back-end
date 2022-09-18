const mongoose = require ('mongoose')

const contatosSchema = new mongoose.Schema ({
    Nome: String,
    Sobrenome: String,
    Telefone: Number,
    Email: String,
    Grupo: String,
  })

module.exports = mongoose.model('Contatos', contatosSchema)