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

// ver un grupo con contatos
router.get('/:idGrupo', async (req, res)=>{
  const idGrupo = req.params.idGrupo

  try {
    const grupos = await Grupos.findById(idGrupo)
    let contatos = await Contatos.find({
      Grupo : grupos._id
    });

    res.json({error:false, grupos:{ ...grupos._doc, contatos}});
    // if (grupos){
    //   return res.json(grupos)
    // }
    // return res.status(404).json()
    
  } catch (e){
    console.error(e)
    return res.status(400).json()
  }
 
})

// Criar un grupo
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

// Editar un grupo
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
        // return res.json(contatos)
      }
      return res.status(200).json(grupos)
      
      
    } catch (e){
      console.error(e)
      return res.status(400).json()
    }
  })

// Deletar un grupo
router.delete ('/:idGrupo', async (req, res)=>{ 
    const idGrupo = req.params.idGrupo
  
    try {
      const grupos = await Grupos.findById(idGrupo)
      if (grupos){
        await grupos.delete()
        return res.json({ msg: "Grupo deletado com sucesso"})
      }
      return res.json()
      
    } catch (e){
      console.error(e)
      return res.status(400).json()
    }
  })



module.exports = router