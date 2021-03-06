import UserServ from "../services/users"
import bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express';
import { UserDocument } from "../models/User";
import config from "../middlewares/config";

//PUT /users/:id
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updateInfo = req.body;
        if(req.body.password){
            updateInfo.password = await bcrypt.hash(req.body.password, Number(config.SALTROUNDS))
        }
        const userId = req.params.id
        const updatedUser = await UserServ.update(userId, updateInfo);
        res.status(200).json(updatedUser)
    }
    catch (err) {
        next(err)
    }
}

// DELETE /users/:id

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await UserServ.deleteUser(req.params.id)
        res.status(200).json("Deleted user success")
    }
    catch (err) {
        next(err)
    }
}

//GET /users/:id

export const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const foundUser = await UserServ.findById(req.params.id)
        res.status(200).json(foundUser)
    }
    catch (err) {
        next(err)
    }
}

//GET /users

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const foundUsers: Array<UserDocument> = await UserServ.findAll()
        res.status(200).json(foundUsers)
    }
    catch (err) {
        next(err)
    }
}

//PUT /users/banned/:id
export const bannedUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const foundUser = await UserServ.bannedUser(req.params.id);
        res.status(200).json(foundUser);
    }
    catch(err){
        next(err)
    }
}



