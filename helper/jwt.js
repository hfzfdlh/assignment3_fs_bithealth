const jwt = require('jsonwebtoken')
const key = process.env.SECRET_KEY

const createToken = (id)=>{
    return jwt.sign({id:id},key)
}

module.exports = {createToken}