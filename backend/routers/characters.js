const express = require('express');
const router = express.Router();
const axios = require('axios')
const {allCharacters} = require ('../utils/constants')

router.get('/',async(req, res) => {
    let name = req.query.name;
    let id = req.query.id;
    if(name){
        let characters = await axios.get(allCharacters)
        let data = await characters.data
        try {
            let characterByName = data.results.filter(character => character.name.toLowerCase() === name.toLowerCase())
            characterByName.length? res.status(200).send(characterByName) : res.status(400).send('Personaje no encontrado.')
        }
        catch{ error => 
            res.send(error)
        }
    }
    if(id){
        let characterById = await axios.get(`${allCharacters}/${id}`)
        try {
            characterById? res.status(200).send(characterById.data) : res.send(500).send('Character not found.')
        }
        catch{ error => 
            res.send(error)
        }
    }
    let characters = await axios.get(allCharacters)
    try {
        characters? res.status(200).send(characters.data) : res.send(500).send('Characters not found.')
    }
    catch{ error => 
        res.send(error)
    }
})

module.exports = router