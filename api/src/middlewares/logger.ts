import { NextFunction, Request, Response } from "express";

const requestLogger = (req: Request, res:Response, next: NextFunction) => {
    console.log('Method:',req.method);
    console.log('Path',req.path);
    console.log('Body:',req.body);
    console.log('Time:', new Date());
    console.log('------')
    next();
}

export default requestLogger;