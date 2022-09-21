const express = require('express')

const Grupos = require ('../models/grupos')
const Contatos =require('../models/contatos')

const router= express.Router()

router.use(express.json())

// Listar grupos
router.get('/', async (req, res)=>{
    const grupos = await Grupos.find()
    return res.json (grupos)
  })

// ver um grupo con contatos
router.get('/:idGrupo', async (req, res)=>{
  const idGrupo = req.params.idGrupo

  try {
    const grupos = await Grupos.findById(idGrupo)
    let contatos = await Contatos.find({
      Grupo : grupos._id
    });

   res.json (contatos);
    
  } catch (e){
    console.error(e)
    return res.status(400).json()
  }
})

// Criar um grupo
router.post('/', async (req, res) =>{
    const Grupo = req.body.Grupo
    
    if (!Grupo ){
      return res.status(400).json({error: "Necessário preencher o nome do grupo"})
    }
  
    const grupos = new Grupos ({
      Grupo
    })
  
    await grupos. save()
  
    return res.status(201).json()
  })

// Editar um grupo
router.put('/:idGrupo', async (req, res)=>{
    const idGrupo = req.params.idGrupo

    const Grupo = req.body.Grupo
  
    try {
      const grupos = await Grupos.findById(idGrupo)
      if (grupos){
        await grupos.updateOne({
           Grupo
        })
        await grupos. save()
      }
      return res.status(200).json(grupos)    
      
    } catch (e){
      console.error(e)
      return res.status(400).json()
    }
  })

// Deletar um grupo e contatos do grupo
router.delete ('/:idGrupo', async (req, res)=>{ 
    const idGrupo = req.params.idGrupo
  
    try {
      const grupos = await Grupos.findById(idGrupo)
      let contatos = await Contatos.find({
          Grupo : grupos._id
      });
        if (grupos){
            await grupos.delete()
        }
        contatos.forEach(async(contato)=>{
            await contato.delete();
        })
        return res.json()
             
    } catch (e){
      console.error(e)
      return res.status(400).json()
    }
  })



module.exports = router
