const { createToken } = require('../helper/jwt')
const { Customer } = require('../models')

class UserController{
    static async postRegister(req,res,next){
        try {
            const {name, username, email,password, phoneNumber, address} = req.body
            if (!email){
                throw {name:"emailNull"}
            }
            if (!password){
                throw {name:"passNull"}
            }

            const newUser = await Customer.create({name,username,email,password,phoneNumber,address})
            // console.log("get it",newUser)
            res.status(201).json({id:newUser.id, email:newUser.email})

        } catch (err) {
            next(err)
        }
    }

    static async postLogin(req,res,next){
        try {
            const {email,password} = req.body
            
            const getUser =await Customer.findOne({where:{email}})
            // console.log(getUser, password)
            if (!getUser){
                throw {name:"emailPasswordInvalid"}
            }
            if (password != getUser.password){
                throw {name:"wrongPass"}
            }

            const access_token = createToken(getUser.id)

            res.status(200).json({access_token})

        } catch (err) {
            next(err)
        }
    }
}



module.exports = UserController