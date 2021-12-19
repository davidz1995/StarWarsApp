const express = require('express');
const router = express.Router();
const {Favorite} = require('../models/favorites')

router.get('/',async(req, res) => {
    let favorites = await Favorite.find();
    if(!favorites) {
        res.send('No hay favoritos.')
    } else {
        try {
            favorites? res.status(200).send(favorites) : res.send(500).send('No hay favoritos.')
        }
        catch{ error => 
            res.send(error)
        }
    }
})

router.post('/',async(req, res) => {
    let favorites = await Favorite.findOne({id:req.body.id});
    if(favorites) {
        res.send('Ya existe en favoritos.')
    } else {
        let favorite = new Favorite({
            id:req.body.id,
            name: req.body.name,
        })
        favorite = await favorite.save();

        !favorite?
            res.status(404).send('No se pudo agregar a favoritos'): res.status(201).send('Agregado a favoritos.');
    }
})

router.delete('/:id',(req,res) => {
    Favorite.findByIdAndRemove(req.params.id)
    .then(favorite => {
        favorite? res.status(200).json({
            success: true,
            message: 'Favorito eliminado'
        }) :
        res.status(404).json({
            succes:false,
            message:'Favorito no encontrado'
        })
    })
    .catch(err => {
        return res.status(400).json({
            success:false,
            error:err
        })
    })
})


module.exports = router