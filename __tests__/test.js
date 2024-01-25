const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')


const userData = {
    name:"Test",
    username:"test",
    email:"test333@aaa.com",
    password:"password123",
    phoneNumber:"0813345345",
    address:""
}

beforeAll(async()=>{
    let data = require('../data/customer.json')
    const customerData = data.map(el=>{
        el.createdAt = new Date()
        el.updatedAt = new Date()

        return el
    })

    await sequelize.queryInterface.bulkInsert('Customers', customerData)

})

afterAll(async ()=>{
    await sequelize.queryInterface.bulkDelete('Customers',{})

})


describe('Customer routes test',()=>{
    describe('POST /register - register new user', ()=>{
        it('respond with 201 when success', async()=>{
            const data = {
                name:"Test1",
                username:"test1",
                email:"test111@aaa.com",
                password:"password123",
                phoneNumber:"0813345345",
                address:""
            }
            const response = await request(app).post('/customer/register').send(data)
            expect(response.status).toBe(201)
            expect(response.body).toBeInstanceOf(Object)
        })

        it('400 if no password', async()=>{
            const data = {
                name:"Test1",
                username:"test1",
                email:"test111@aaa.com",
                phoneNumber:"0813345345",
                address:""
            }
            const response = await request(app).post('/customer/register').send(data)
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty('message','Password is null')

        })

        it('400 if no email', async()=>{
            const data = {
                name:"Test1",
                username:"test1",
                phoneNumber:"0813345345",
                password:"password123",
                address:""
            }
            const response = await request(app).post('/customer/register').send(data)
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty('message','Email is null')

        })


        it('400 if email not unique', async()=>{
            const data = {
                name:"Test",
                username:"test",
                email:"test333@aaa.com",
                password:"password123",
                phoneNumber:"0813345345",
                address:""
            }
            const response = await request(app).post('/customer/register').send(data)
            
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty('message','email must be unique')

        })
    })

    describe('POST /login', ()=>{
        it('respond with 200 when success', async()=>{
            const data = {
                email:"test333@aaa.com",
                password:"password123",
            }
            const response = await request(app).post('/customer/login').send(data)
            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('access_token',expect.any(String))
        })

        it('respond with 401 when password is wrong', async()=>{
            const data = {
                email:"test333@aaa.com",
                password:"password",
            }
            const response = await request(app).post('/customer/login').send(data)
            expect(response.status).toBe(401)
            expect(response.body).toHaveProperty('message','invalid email / password')
        })

        it('respond with 401 when email is not email', async()=>{
            const data = {
                email:"test333_sfgsf",
                password:"password",
            }
            const response = await request(app).post('/customer/login').send(data)
            console.log("RESPONSE", response)
            expect(response.status).toBe(401)
            expect(response.body).toHaveProperty('message','invalid email / password')
        })
    })
})