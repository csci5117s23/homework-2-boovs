// use npm package to convert URL query string to MongoDB query filter
const q2m = require('query-to-mongo');
import {Datastore} from 'codehooks-js'

export async function readManyFunc(req: any, res: any) {
    const {collection} = req.params;
    const conn = await Datastore.open();
    const options = {
        filter: q2m(req.query).criteria
    }
    conn.getMany(collection, options).json(res);  
}

export async function readOneFunc(req, res) {
    const {collection, ID} = req.params;
    const conn = await Datastore.open();
    try {
        const result = await conn.getOne(collection, ID);
        res.json(result);
    } catch (e) {
        res
        .status(404) // not found
        .end(e);
    }
}