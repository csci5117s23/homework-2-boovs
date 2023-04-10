// Code hooks imports
import {app, Datastore} from 'codehooks-js';
import crudlify from 'codehooks-crudlify';
import { object, string, number, date, InferType, bool } from 'yup';


// React backend API endpoint and API token
const API_ENDPOINT = "https://backend-j6ux.api.codehooks.io/dev";
const API_KEY = "51f2ffcf-9a41-4911-93d8-08c225d2b908";

///////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////
// REST API - "./dev/visitors"
//////////////////////////////////////////////////////////////////////
app.get('/visitors', async (req, res) => {
  const db = await Datastore.open();         // Open database
  const visits  = await db.incr('hits', 1);  // increment visit counter in key-value database
  res.json({ "message": "Hello!", "visits": visits });
});
/////////////////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////////////
// Database schema
const options = {  // Schema options
  schema: "yup"
}
// -------------------------------------------------------------------
// Database schema - Users
const userSchemaYup = object ({
  name: string(),
  email: string().email().required(),
  createdOn: date().default(() => new Date()),
});
crudlify(app, {user: userSchemaYup}, options)
// -------------------------------------------------------------------
// Database schema - To-do tasks
const taskSchemaYup = object( {
  userId:     string().required(),
  value:      string().required(),
  date:       date().required(),
  starred:    bool().required(),
  done:       bool().required(),
  createdOn:  date().default(() => new Date()),
})
crudlify(app, {task: taskSchemaYup}, options)
// -------------------------------------------------------------------








///////////////////////////////////////////////////////////////////////
// REST API - "./dev/user"
///////////////////////////////////////////////////////////////////////
// -------------------------------------------------------------------
// 1.) (GET) Retrieve to-do list tasks for logged-in user
// -------------------------------------------------------------------
app.get('/user', async (req, res) => {
  const db = await Datastore.open();         // Open database
  const visits  = await db.incr('hits', 1);  // increment visit counter in key-value database
  res.json({ "message": "Hello!", "visits": visits });
});

// -------------------------------------------------------------------
// 2.) (POST) Add to-do list tasks for logged-in user
// -------------------------------------------------------------------
app.post('/user', async (req, res) => {
  const db = await Datastore.open();         // Open database
  const visits  = await db.incr('hits', 1);  // increment visit counter in key-value database
  res.json({ "message": "Hello!", "visits": visits });
});
// -------------------------------------------------------------------
// 3.) (DELETE) Delete task for a logged-in user
// -------------------------------------------------------------------
// -------------------------------------------------------------------
// 4.) (PUT) Edit task for a logged-in user
// -------------------------------------------------------------------
///////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////
// REST API - "./Todos"
// -------------------------------------------------------------------
// 1.) (GET) Retrieve to-do list tasks for logged-in user
// -------------------------------------------------------------------
// async function getTasks(req, res) {
//   const myObj = {
//     "foo": "bar",
//     "price": 42
//   };  
//   const db = await Datastore.open();                  // Connect to the key-value store
//   await db.set('myjsonkey', JSON.stringify(myObj));   // Convert JSON to string
//   const result = await db.get('myjsonkey');           // Get value from key
//   console.log(JSON.parse(result));                    // Convert back to Object
// };
// -------------------------------------------------------------------
// 2.) (POST) Add to-do list tasks for logged-in user
// -------------------------------------------------------------------
// async function addTask(req, res) {

// };

// -------------------------------------------------------------------
// 3.) (DELETE) Delete task for a logged-in user
// -------------------------------------------------------------------

// -------------------------------------------------------------------
// 4.) (PUT) Edit task for a logged-in user
// -------------------------------------------------------------------
///////////////////////////////////////////////////////////////////////

// HTTP API routes and handlers
// -- Users -- 
// app.get('/users', getUsers);

// -- To-do Entries --
// app.get('/todos', getTasks);
// app.post('/todos', getTasks);
// app.get('/todos', getTasks);
// app.get('/todos', getTasks);


export default app.init();