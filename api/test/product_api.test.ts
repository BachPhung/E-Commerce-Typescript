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

const api = supertest(app);
let token: string;
beforeEach(async () => {
    if (config.SALTROUNDS && config.TOKENSECRET) {
        await Product.deleteMany({})
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
        await Product.insertMany(helper.initialProducts)
    }
})


test('HTTP GET products are returned as json', async () => {
    const res = await api
        .get('/api/products')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    expect(res.body).toHaveLength(helper.initialProducts.length)
})

test('HTTP POST request', async () => {
    const newProduct = {
        title: "Timberland Core Tree Logo hoodie in dark blue",
        desc: "Act casual, Drawstring hood, Large logo print to chest, Pouch pocket, Regular fit",
        img: [
            "https://images.asos-media.com/products/timberland-core-tree-logo-hoodie-in-dark-blue/200615178-1-midblue?$n_640w$&wid=513&fit=constrain",
            "https://images.asos-media.com/products/timberland-core-tree-logo-hoodie-in-dark-blue/200615178-2?$n_640w$&wid=513&fit=constrain"
        ],
        categories: ["Hoodie", "Men"],
        size: ["XS", "S", "M", "L", "XL", "XXL"],
        color: ["darkblue"],
        price: 79.90
    }
    await api
        .post('/api/products')
        .send(newProduct)
        .expect(200)
        .set('authorization', `Bearer ${token}`)
        .expect('Content-Type', /application\/json/)
    const res = await api.get('/api/products')
    expect(res.body.length).toBe(helper.initialProducts.length + 1)
})

test('HTTP POST request with non token provided', async () => {
    const newProduct = {
        title: "Timberland Core Tree Logo hoodie in dark blue",
        desc: "Act casual, Drawstring hood, Large logo print to chest, Pouch pocket, Regular fit",
        img: [
            "https://images.asos-media.com/products/timberland-core-tree-logo-hoodie-in-dark-blue/200615178-1-midblue?$n_640w$&wid=513&fit=constrain",
            "https://images.asos-media.com/products/timberland-core-tree-logo-hoodie-in-dark-blue/200615178-2?$n_640w$&wid=513&fit=constrain"
        ],
        categories: ["Hoodie", "Men"],
        size: ["XS", "S", "M", "L", "XL", "XXL"],
        color: ["darkblue"],
        price: 79.90
    }
    await api
        .post('/api/products')
        .send(newProduct)
        .expect(401)
        .expect('Content-Type', /application\/json/)
    const res = await api.get('/api/products')
    expect(res.body.length).toBe(helper.initialProducts.length)
})

test('HTTP DELETE product', async () => {
    const res = await api.get('/api/products');
    const id = res.body[0]._id;

    await api
        .delete(`/api/products/${id}`)
        .expect(200)
        .set('authorization', `Bearer ${token}`)
        .expect('Content-Type', /application\/json/)
    const productsAtEnd = await api.get('/api/products');
    expect(productsAtEnd.body).toHaveLength(1)
})

test('HTTP PUT update product', async () => {
    const res = await api.get('/api/products');
    const id = res.body[0]._id;
    const updatedInfo = {
        price: 10000
    }
    const res2 = await api
                    .put(`/api/products/${id}`)
                    .send(updatedInfo)
                    .expect(200)
                    .set('authorization', `Bearer ${token}`)
                    .expect('Content-Type', /application\/json/)
    expect(res2.body.price).toBe(10000)
})

afterAll(() => {
    mongoose.connection.close()
})