import bcrypt from 'bcrypt'
import User from '../models/User'
import helper from '../utils/test_helper'
import supertest from 'supertest'
import app from '../app'
import mongoose from 'mongoose'
import config from '../middlewares/config'

const api = supertest(app);

describe('when there is initial one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({});
        if (config.SALTROUNDS) {
            const password = await bcrypt.hash('123456789', Number(config.SALTROUNDS));
            const user = new User({
                username: 'rootuser',
                password,
                first_name: "Root",
                last_name: "User",
                email: "root@gmail.com"
            })
            await user.save()
        }
    })
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = new User({
            first_name: "Bach",
            last_name: "Phung",
            username: "quangbach4",
            password: "123456789",
            email: "quangbach4@gmail.com"
        })
        await api
            .post('/api/auth/register')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    })
    test('creation fail with existed username', async () => {
        const newUser = {
            first_name: "Bach",
            last_name: "Phung",
            username: "rootuser",
            password: "123456789",
            email: "quangbach4@gmail.com"
        }
        const res = await api
            .post('/api/auth/register')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(res.body.error).toContain('username or email has already existed')
    })
    test('creation fail with length of username < 8', async () => {
        const newUser = {
            first_name: "Bach",
            last_name: "Phung",
            username: "root",
            password: "123456789",
            email: "quangbach4@gmail.com"
        }
        const res = await api
            .post('/api/auth/register')
            .send(newUser)
            .expect(401)
            .expect('Content-Type', /application\/json/)
        expect(res.body.error).toContain('Username or Password must be at least 8 chars long')
    })
    afterAll(()=>{
        mongoose.connection.close()
    })
})