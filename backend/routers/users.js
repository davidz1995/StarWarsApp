const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {User} = require('../models/users');

router.get(`/`,async (req, res) =>{
    const usersList = await User.find().select('-password');
    !usersList? res.status(500).send('Usuario no encontrado'):res.status(200).send(usersList)
})

router.get('/:id',async(req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    !user? res.status(500).send('Usuario no encontrado'):res.status(200).send(user);
})

router.post(`/`, async (req, res) =>{
    let users = await User.findOne({email:req.body.mail});
    if(users) {
        res.send({message:'Usuario ya existe.'})
    } else {
    let user = new User({
        email: req.body.mail,
        password: bcrypt.hashSync(req.body.password, 10),
    })
    user = await user.save();
    
    !user? res.status(400).send({message:'Usuario no creado.'}): res.status(200).send({message:`Usuario creado.`})
    }
    })

router.post('/login', async (req, res) => {
    const logged = await User.findOne({email:req.body.email})
    const secret = process.env.secret
    if(!logged){
        res.status(400).send({message:'Usuario no encontrado'})
    } else {
        if(logged && bcrypt.compareSync(req.body.password, logged.password)
        ){
        const token = jwt.sign({
            userId:logged.id,
        },secret,{
            expiresIn:'1d'
        })
        res.status(200).send({token});
        } else {
            res.status(400).send({message:'Contraseña incorrecta.'});
        }
    }
})

module.exports = router