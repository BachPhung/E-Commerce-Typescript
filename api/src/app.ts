import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './middlewares/config';
import authRouter from './routers/auth';
import userRouter from './routers/user';
import productRouter from './routers/product';
import cartRouter from './routers/cart';
import orderRouter from './routers/order';
import stripeRouter from './routers/stripe'
import unknowEndpoint  from './middlewares/unknownEndpoints';
import errorHandler from './middlewares/errorHandler';
import requestLogger from './middlewares/logger';

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(config.MONGODB_URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})
.then(()=>{
    console.log('Connect to database successfully');
    console.log(`Database: ${config.MONGODB_URI}`);
}).catch(err=>console.log(err))

// Routers
app.use(requestLogger);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/orders', orderRouter);
app.use('/api/checkout', stripeRouter);
app.use(unknowEndpoint);
app.use(errorHandler)

export default app;