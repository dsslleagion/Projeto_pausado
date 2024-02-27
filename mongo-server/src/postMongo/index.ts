import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";

// import { Response } from 'express';



dotenv.config();

const info = async ():Promise<any> => {
    const client = new MongoClient(`${process.env.mongo}`);
    
    await client.connect();

    
    return client.db('seguranca').collection('info');    
}

const warm = async ():Promise<any> => {
    const client = new MongoClient(`${process.env.mongo}`);
    await client.connect();
    return client.db('seguranca').collection('warm')     
}

const error = async ():Promise< any> => {
    const client = new MongoClient(`${process.env.mongo}`);
    await client.connect();
    return client.db('seguranca').collection('error');   
}

export {
    info,
    warm,
    error
}