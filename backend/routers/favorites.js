const express = require('express');
const router = express.Router();
const {Favorite} = require('../models/favorites')

router.post('/',async(req, res) => {
    let favorite = new Favorite({
        id:req.body.id,
        name: req.body.name,
        description: req.body.description,
        properties: req.body.properties,
    })
    favorite = await favorite.save();

    !favorite?
        res.status(404).send('Favorites cant be created'): res.status(201).send(favorite);
})

router.delete('/:id',(req,res) => {
    Favorite.findByIdAndRemove(req.params.id).then(favorite => {
        favorite? res.status(200).json({
            success: true,
            message: 'Category deleted'
        }) :
        res.status(404).json({
            succes:false,
            message:'Category not found'
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