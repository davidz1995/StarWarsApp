const express = require('express');
const router = express.Router();
const axios = require('axios')
const {allFilms} = require ('../utils/constants')
const {allCharacters} = require ('../utils/constants')
const { Film } = require ('../models/films')

router.get('/',async(req, res) => {
    let filmsDB = await Film.find();
    if(filmsDB) {
        let film = filmsDB[0].result.result
        res.send(film)
    } else {
        let films = await axios.get(allFilms)
        try{
            let filmsTable = new Film({
                result:films.data,
            })
            filmsTable = await filmsTable.save();

            !filmsTable? res.status(404).send('No se pudo crear colección films'): res.status(201).send(film); 
        }catch(error){
            res.send(error)
        }
    }
})

router.get('/:character',async(req, res) => {
    let id = req.params.character
    let films = await Film.find();
    if(!films) {
        res.send('No existe la coleccion films.')
    } else {
            let film = films[0].result.result
            try{
                let dataCharacters = []
                let selected = film.filter(e => e.uid === id)
                let characters = selected[0].properties.characters
                for ( let url of characters ) {
                    let result = await axios.get(url);
                    dataCharacters.push(result.data);
                }
                dataCharacters.length? res.status(200).send(dataCharacters) : res.send(500).send('Characters not found.') 
            }catch(error){
                res.send(error)
            }   
    }
})

module.exports = router