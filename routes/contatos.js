const express = require('express')

const Contatos =require('../models/contatos')

const router= express.Router()

router.use(express.json())

// listar contatos
router.get('/', async (req, res)=>{
  const contatos = await Contatos.find()
  return res.json (contatos)
})

// Ver um contato
router.get('/:idContato', async (req, res)=>{
  const idContato = req.params.idContato

  try {
    const contatos = await Contatos.findById(idContato)
    if (contatos){
      return res.json(contatos)
    }
    return res.status(404).json()
    
  } catch (e){
    console.error(e)
    return res.status(400).json()
  }
 
})

// Criar um contato

router.post('/', async (req, res) =>{
  const Nome = req.body.Nome
  const Sobrenome = req.body.Sobrenome
  const Telefone = req.body.Telefone
  const Email = req.body.Email
  const Grupo = req.body.Grupo

  if (!Nome || !Sobrenome || !Telefone || !Email || !Grupo){
    return res.status(400).json({error: "Necessário preencher todos os dados"})
  }
  const contatos = new Contatos ({
    Nome, Sobrenome, Telefone, Email, Grupo
  })
  await contatos. save()
  return res.status(201).json()

})

// Atualizar dados (editar)
router.put('/:idContato', async (req, res)=>{
  const idContato = req.params.idContato

  const Nome = req.body.Nome
  const Sobrenome = req.body.Sobrenome
  const Telefone = req.body.Telefone
  const Email = req.body.Email
  const Grupo = req.body.Grupo

  try {
    const contatos = await Contatos.findById(idContato)
    if (contatos){
      await contatos.updateOne({
        Nome, Sobrenome, Telefone, Email, Grupo
      })
      await contatos. save()
    
    }
    return res.status(200).json(contatos)
    
    
  } catch (e){
    console.error(e)
    return res.status(400).json()
  }
})



// Deletar um contato
router.delete ('/:idContato', async (req, res)=>{ 
  const idContato = req.params.idContato

  try {
    const contatos = await Contatos.findById(idContato)
    if (contatos){
      await contatos.delete()
      return res.json({ msg: "Contato deletado com sucesso"})
    }
    return res.json()
    
  } catch (e){
    console.error(e)
    return res.status(400).json()
  }
})





module.exports = router