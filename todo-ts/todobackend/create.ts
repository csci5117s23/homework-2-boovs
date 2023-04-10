import {Datastore} from 'codehooks-js'

// Create function
export async function createFunc(req: any, res: any) {
    const {collection} = req.params;
    const document = req.body;
    const conn = await Datastore.open();
    const result = await conn.insertOne(collection, document);  
    res.json(result);
}