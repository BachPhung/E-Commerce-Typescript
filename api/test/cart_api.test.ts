import bcrypt from 'bcrypt'
import User from '../src/models/User'
import Product from '../src/models/Product'
import helper from '../src/utils/test_helper'
import supertest from 'supertest'
import jwt from 'jsonwebtoken'
import app from '../src/app'
import mongoose from 'mongoose'
import config from '../src/middlewares/config'
import Cart from '../src/models/Cart'

const api = supertest(app)
let token: string;

beforeEach(async () => {
    if (config.SALTROUNDS && config.TOKENSECRET) {
        await User.deleteMany({})
        await Cart.deleteMany({})
        const password = await bcrypt.hash('123456789', Number(config.SALTROUNDS));
        const user = new User({
            username: 'rootuser',
            password,
            first_name: "Root",
            last_name: "User",
            isAdmin: true
        })
        const savedUser = await user.save()
        token = jwt.sign({
            id: savedUser._id,
            isAdmin: user.isAdmin
        }, config.TOKENSECRET)
        const newUser = new User({
            first_name: "Bach",
            last_name: "Phung",
            username: "quangbach2",
            password: "123456789"
        })
        const newUser2 = new User({
            first_name: "Bach",
            last_name: "Phung",
            username: "quangbach3",
            password: "123456789"
        })
        const res1 = api
            .post('/api/auth/register')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const res2 = api
            .post('/api/auth/register')
            .send(newUser2)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        await Promise.all([res1, res2]);
    }
})

test('HTTP GET carts are returned as json', async () => {
    const cartRes = await api.get('/api/carts')
        .expect(200)
        .set('authorization', `Bearer ${token}`)
    expect(cartRes.body).toHaveLength(2)
})

test('HTTP PUT add product to cart', async () => {
    const cartAtStart = await api.get('/api/carts')
        .expect(200)
        .set('authorization', `Bearer ${token}`)
    expect(cartAtStart.body).toHaveLength(2)

    const cartId = cartAtStart.body[0]._id
    const userInfo = {
        username: 'quangbach3',
        password: '123456789'
    }
    const user = await api.post('/api/auth/login')
        .send(userInfo)
        .expect(200)
    const addedProducts = {
        products: [
            {
                product: "623a7f4a289e69175812e21f",
                size: "S",
                color: "Beige",
                quantity: 5,
                price: 31.99
            }
        ]
    }
    const res = await api.put(`/api/carts/${cartId}`)
        .send(addedProducts)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .set('authorization', `Bearer ${user.body.accessToken}`)
    expect(res.body.products).toHaveLength(1)
})

test('HTTP PUT clean cart', async () => {
    const cartAtStart = await api.get('/api/carts')
        .expect(200)
        .set('authorization', `Bearer ${token}`)
    expect(cartAtStart.body).toHaveLength(2)

    const cartId = cartAtStart.body[0]._id
    const userInfo = {
        username: 'quangbach3',
        password: '123456789'
    }
    const user = await api.post('/api/auth/login')
        .send(userInfo)
        .expect(200)
    const addedProducts = {
        products: [
            {
                product: "623a7f4a289e69175812e21f",
                size: "S",
                color: "Beige",
                quantity: 5,
                price: 31.99
            }
        ]
    }
    const res = await api.put(`/api/carts/${cartId}`)
        .send(addedProducts)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .set('authorization', `Bearer ${user.body.accessToken}`)
    expect(res.body.products).toHaveLength(1)
    const res2 = await api.put(`/api/carts/clean/${cartId}`)
        .expect(200)
        .set('authorization', `Bearer ${user.body.accessToken}`)
    expect(res2.body.products).toHaveLength(0)
})



