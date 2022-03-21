import { Request, Response } from "express";

const unknowEndpoint = (req: Request, res: Response) => {
    res.status(404).json('unknown endpoint')
};

export default unknowEndpoint;