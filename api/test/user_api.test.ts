import bcrypt from 'bcrypt'
import User from '../src/models/User'
import helper from '../src/utils/test_helper'
import supertest from 'supertest'
import app from '../src/app'
import mongoose from 'mongoose'
import config from '../src/middlewares/config'
import Cart from '../src/models/Cart'

const api = supertest(app);

describe('when there is initial one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({});
        await Cart.deleteMany({})
        if (config.SALTROUNDS) {
            const password = await bcrypt.hash('123456789', Number(config.SALTROUNDS));
            const user = new User({
                username: 'rootuser',
                password,
                first_name: "Root",
                last_name: "User"
            })
            await user.save()
        }
    })
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = new User({
            first_name: "Bach",
            last_name: "Phung",
            username: "quangbach2",
            password: "123456789"
        })
        const res = await api
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
            password: "123456789"
        }
        const res = await api
            .post('/api/auth/register')
            .send(newUser)
            .expect(401)
            .expect('Content-Type', /application\/json/)
        expect(res.body.error).toContain('Username or Password must be at least 8 chars long')
    })
    afterAll(() => {
        mongoose.connection.close()
    })
})
