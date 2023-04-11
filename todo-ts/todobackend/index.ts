// Code hooks imports
import {app, Datastore} from 'codehooks-js';
import crudlify from 'codehooks-crudlify';
import { object, string, number, date, InferType, bool } from 'yup';


//////////////////////////////////////////////////////////////////////
// REST API - "./dev/visitors"
//////////////////////////////////////////////////////////////////////
app.get('/visitors', async (req, res) => {
  const db = await Datastore.open();         // Open database
  const visits  = await db.incr('hits', 1);  // increment visit counter in key-value database
  res.json({ "message": "Hello!", "visits": visits });
});
//////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////
// Database schema
const options = {  // Schema options
  schema: "yup"
}
// Database schema - To-do tasks
const taskSchemaYup = object( {
  value:      string().required(),
  done:       bool().required(),
  starred:    bool().required(),
  createdOn:  date().default(() => new Date()),
})
crudlify(app, {task: taskSchemaYup}, options)
//////////////////////////////////////////////////////////////////////

export default app.init();