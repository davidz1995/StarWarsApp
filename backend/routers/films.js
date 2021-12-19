const express = require('express');
const router = express.Router();
const axios = require('axios')
const {allFilms} = require ('../utils/constants')
const {allCharacters} = require ('../utils/constants')

router.get('/',async(req, res) => {
    let films = await axios.get(allFilms)
    try{
        films? res.status(200).send(films.data) : res.send(500).send('Films not found.') 
    }catch(error){
        res.send(error)
    }
})

router.get('/:character',async(req, res) => {
    let id = req.params.character
    let character = await axios.get(`${allCharacters}/${id}`)
    try{
        character? res.status(200).send(character.data) : res.send(500).send('Character not found.') 
    }catch(error){
        res.send(error)
    }
})

module.exports = router