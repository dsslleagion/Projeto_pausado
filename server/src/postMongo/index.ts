import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";


dotenv.config();

const info = async ():Promise< Response | any> => {
    const client = new MongoClient(`${process.env.mongo}`);
    await client.connect();
    return client.db('seguranca').collection('info');    
}

const warm = async ():Promise< Response | any> => {
    const client = new MongoClient(`${process.env.mongo}`);
    await client.connect();
    return client.db('seguranca').collection('warm')     
}

const error = async ():Promise< Response | any> => {
    const client = new MongoClient(`${process.env.mongo}`);
    await client.connect();
    return client.db('seguranca').collection('error');   
}

export {
    info,
    warm,
    error
}