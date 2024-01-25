if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const UserController = require('./controller/user')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.post('/customer/register',UserController.postRegister)
app.post('/customer/login', UserController.postLogin)

app.use((err,req,res,next)=>{
    console.log("error>>>>",err)
    let status = 500
    let message = "internal server error"
    if (err.name == "passNull"){
        status = 400
        message = "Password is null"
    } else if( err.name == "emailNull"){
        status = 400
        message = "Email is null"
    } else if(err.name == "SequelizeValidationError"){
        status = 401
        message = err.errors[0].message}
    else if(err.name == "SequelizeUniqueConstraintError"){
        status = 400
        message = err.errors[0].message
    }else if (err.name == "wrongPass"){
        status = 401
        message = "invalid email / password"
    } else if (err.name == "emailPasswordInvalid"){
        status = 401
        message = "invalid email / password"
    }

    res.status(status).json({code:status,message})
})
module.exports = app