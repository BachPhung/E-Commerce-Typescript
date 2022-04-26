import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt'
import User from "../models/User";
import UserServ from "../services/users"
import CartServ from '../services/carts'
import jwt from 'jsonwebtoken'
import config from '../middlewares/config'
import Cart from "../models/Cart";
const saltRound = Number(config.SALTROUNDS)
const tokenSecret = config.TOKENSECRET;
export const userRegister = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { first_name, last_name, username, password} = req.body
        if(username.length < 8 || password.length < 8 ) {
            return res.status(401).json({
                error: 'Username or Password must be at least 8 chars long'
            })
        }
        if (saltRound) {
            const savedUser = new User({
                first_name,
                last_name,
                username,
                password: await bcrypt.hash(password, saltRound)
            });
            console.log("savedUser", savedUser);
            await UserServ.create(savedUser);
            const savedCart = new Cart({
                userId: savedUser.id
            })
            await CartServ.create(savedCart);
            const updatedUser = await UserServ.update(savedUser.id,{cart: savedCart.id});
            return res.status(200).json(updatedUser)
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({error: error.message})
        } else {
            next(error)
        }
    }
}

export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!req.body.username || !req.body.password){
            return res.status(400).json('username or password is missing')
        }
        const user = await UserServ.findByCredential({ username: req.body.username })
        const passwordCorrect = user === null
            ? false
            : await bcrypt.compare(req.body.password, user.password);
        if (!(user && passwordCorrect)) {
            return res.status(401).json({
                error: 'invalid username or password'
            })
        }
        if(user.isBanned){
            return res.status(401).json({
                error: 'Your account is banned'
            })
        }
        if (tokenSecret) {
            const accessToken = jwt.sign({
                id: user._id,
                isAdmin: user.isAdmin
            }, tokenSecret, { expiresIn: '2d' });
            const { first_name, last_name, username, isAdmin, cart } = user;
            return res.status(200).json({
                accessToken,
                first_name,
                last_name,
                username,
                isAdmin,
                cart
            })
        }
    }
    catch (err) {
        //res.status(400).json('eoor')
        next(err)
    }
}