import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../middlewares/config'
import { CustomRequest, decodedUser} from '../../types/express';
import { UserJwtPayload } from 'jsonwebtoken';

const userFromJWT = (jwtToken:string, next:NextFunction): decodedUser | undefined => {
    try {
        const {user} = <UserJwtPayload>jwt.verify(jwtToken, config.TOKENSECRET || 'MISSING_SECRET')
        return user;
    }
    catch(err){
        next(err)
    }
}

const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const authHeader: string | undefined  = req.headers.authorization;
    if(authHeader) {
        const token:string = authHeader.split(" ")[1];
        req.user = userFromJWT(token,next);
    }
    else {
        res.status(401).json("You are not authenticated !");
    }
};

const verifyTokenAndAuthorization = (req: CustomRequest, res: Response, next: NextFunction) => {
    verifyToken(req,res, ()=>{
        if(req.user?.id === req.params.id) {
            next();
        }
        else {
            res.status(403).json("You are not allow to do that !");
        }
    });
};

const verifyTokenAndAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
    verifyToken(req,res, () =>{
        if (req.user?.isAdmin) {
            next();
        }
        else {
            res.status(403).json(req.user);
        }
    });
};

export default {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
}

