const express = require('express');
const router = express.Router();
const axios = require('axios')
const {allCharacters} = require ('../utils/constants');
const { Planet } = require ('../models/planets')
const { Character } = require ('../models/characters')

router.get('/',async(req, res) => {
    let planetsDB = await Planet.find();
    if(planetsDB) {
        let planets = planetsDB[0].result.results
        res.send(planets)
    } else {
        let planets = await axios.get('https://www.swapi.tech/api/planets?page=1&limit=10000')
        try{
            let planetsTable = new Planet({
                result:planets.data,
            })
            planetsTable = await planetsTable.save();

            !planetsTable? res.status(404).send('No se pudo crear colección films'): res.status(201).send('Se creo base de datos'); 
        }catch(error){
            res.send(error)
        }
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