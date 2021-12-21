const supertest = require('supertest')
const app = require('../app')
const request = require('supertest')

describe('POST /users', () => {
    describe('Log In de usuario registrado', ()=>{
        test('Si credenciales son correctas, debe responder con un status 200', async () => {
            const response = await request(app).post('/v1/users/login').send({
                email:"dzdzdzdzdz@gmail.com",
                password:"holada"
            })
            expect(response.statusCode).toBe(200)
        })
        jest.setTimeout(30000)
    })

    describe('Si contraseña es incorrecta', ()=>{
        test('Debe responder con un status 400 si contraseña es incorrecta', async () => {
            const response = await request(app).post('/v1/users/login').send({
                email:"dzdzdzdzdz@gmail.com",
                password:"12345"
            })
            expect(response.statusCode).toBe(400);
        })
        test('Debe enviar mensaje de contraseña incorrecta.', async () => {
            const response = await request(app).post('/v1/users/login').send({
                email:"dzdzdzdzdz@gmail.com",
                password:"12345"
            })
            expect(response.body.message).toBe('Contraseña incorrecta.');
        })
        jest.setTimeout(30000)
    })

    describe('Si email no está registrado', ()=>{
        test('Debe responder con un status 400 si email es incorrecto.', async () => {
            const response = await request(app).post('/v1/users/login').send({
                email:"hola@gmail.com",
                password:"12345"
            })
            expect(response.statusCode).toBe(400);
        })
        test('Debe enviar mensaje de email no registrado.', async () => {
            const response = await request(app).post('/v1/users/login').send({
                email:"hola@gmail.com",
                password:"12345"
            })
            expect(response.body.message).toBe('Usuario no encontrado');
        })
        jest.setTimeout(30000)
    })
    describe('Si email no está registrado', ()=>{
        test('Debe responder con un status 400 si email es incorrecto.', async () => {
            const response = await request(app).post('/v1/users/login').send({
                email:"hola@gmail.com",
                password:"12345"
            })
            expect(response.statusCode).toBe(400);
        })
        jest.setTimeout(30000)
    })
})