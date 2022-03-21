import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt'
import User from "../models/User";
import UserServ from "../services/users"
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import config from '../middlewares/config'
dotenv.config()
const saltRound = Number(process.env.SALTROUNDS)
const tokenSecret = config.TOKENSECRET;
export const userRegister = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { first_name, last_name, username, password, email } = req.body
        if (saltRound) {
            const savedUser = new User({
                first_name,
                last_name,
                username,
                password: await bcrypt.hash(password, saltRound),
                email
            });
            console.log("savedUser", savedUser);

            await UserServ.create(savedUser);
            return res.status(200).json(savedUser)
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
        const user = await UserServ.findByCredential({ username: req.body.username })
        const passwordCorrect = user === null
            ? false
            : await bcrypt.compare(req.body.password, user.password);
        if (!(user && passwordCorrect)) {
            res.status(401).json({
                error: 'invalid username or password'
            })
        }
        if (tokenSecret) {
            const accessToken = jwt.sign({
                id: user._id,
                isAdmin: user.isAdmin
            }, tokenSecret, { expiresIn: '2d' });
            const { first_name, last_name, username } = user;
            res.status(200).json({
                accessToken,
                first_name,
                last_name,
                username
            })
        }
    }
    catch (err) {
        res.status(400).json(err)
        //next(err)
    }
}