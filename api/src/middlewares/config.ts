import dotenv from 'dotenv'
dotenv.config()
let MONGODB_URI = process.env.NODE_ENV === 'test' 
    ? process.env.MONGODB_URI_TEST
    : process.env.MONGODB_URI
let PORT = process.env.PORT;
let TOKENSECRET = process.env.TOKENSECRET;
let SALTROUNDS = process.env.SALTROUNDS;
let STRIPE_KEY = process.env.STRIPE_KEY;

type Config = {
    MONGODB_URI?:string,
    PORT?: string,
    TOKENSECRET?: string,
    SALTROUNDS?: string,
    STRIPE_KEY?:string
}

const config:Config = {
    MONGODB_URI,
    PORT,
    TOKENSECRET,
    SALTROUNDS,
    STRIPE_KEY
};

export default config;