import {Datastore} from 'codehooks-js'

// Update
export async function updateFunc(req: any, res: any) {
      const {collection, ID} = req.params;
      const document = req.body;
      const conn = await Datastore.open();  
      const result = await conn.updateOne(collection, ID, document, {}); 
      res.json(result);   
}