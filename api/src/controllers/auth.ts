import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt'
import User from "../models/User";
import UserServ from "../services/users"
import jwt from 'jsonwebtoken'
import config from '../middlewares/config'
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
        if(user.isBanned){
            res.status(401).json({
                error: 'Your account is banned'
            })
        }
        if (tokenSecret) {
            const accessToken = jwt.sign({
                id: user._id,
                isAdmin: user.isAdmin
            }, tokenSecret, { expiresIn: '2d' });
            const { first_name, last_name, username, isAdmin } = user;
            res.status(200).json({
                accessToken,
                first_name,
                last_name,
                username,
                isAdmin: isAdmin
            })
        }
    }
    catch (err) {
        res.status(400).json('eoor')
        next(err)
    }
}