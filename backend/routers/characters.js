const express = require('express');
const router = express.Router();
const axios = require('axios')
const {allCharacters} = require ('../utils/constants')
const {Character} = require('../models/characters')

router.get('/',async(req, res) => {
    let name = req.query.name;
    let id = req.query.id;
    
    if(name){
        let characters = await Character.find()
        try {
            let characterByName = characters[0].result.results.filter(character => character.name.toLowerCase() === name.toLowerCase())
            if(characterByName.length){
                let dataCharacter = await axios.get(characterByName[0].url)
                let planet = await axios.get(dataCharacter.data.result.properties.homeworld)
                let obj = {
                    id:dataCharacter.data.result.uid,
                    name: dataCharacter.data.result.properties.name,
                    planet: planet.data.result.properties.name,
                    description: dataCharacter.data.result.description,
                    birthYear:dataCharacter.data.result.properties.birth_year
                }
                dataCharacter.status == '200'? res.status(200).send(obj) : res.status(400).send('Personaje no encontrado.')
            } else {
                res.status(400).send('Personaje no encontrado.')
            }
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
    if(!name && !id){
        let characters = await axios.get('https://www.swapi.tech/api/people?page=1&limit=10000')
        try {
        let characterDB = await Character.find();
        if(characterDB) {
            characterDB? res.status(200).send(characterDB) : res.send(500).send('No hay personajes.')
        } else {
            let newCharacter = new Character ({
                result:characters.data
            })

            newCharacter = newCharacter.save()
            res.send('Base de datos de characters creada.')
        }
        }
        catch{ error => 
            res.send(error)
    }
    }
})

module.exports = router