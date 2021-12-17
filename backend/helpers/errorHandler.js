function errorHandler(err, req, res, next){
    if (err.name === 'UnauthorizedError'){
        return res.status(401).json({
            message:'Usuario no autorizado'
        })
    }

    if(err.name === 'ValidationError'){
        return res.status(401).json({
            message:err
        })
    }

    if(err.name === 'No authorization token was found'){
        return res.status(400).son({
            message:'Token de autorizacion no encontrada'
        })
    }

    return res.status(500).json(err)
}

module.exports = errorHandler