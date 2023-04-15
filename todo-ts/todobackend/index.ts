// Code hooks imports
// @ts-ignore
import {app, Datastore} from 'codehooks-js';
// @ts-ignore
import crudlify from 'codehooks-crudlify';
// @ts-ignore
import { object, string, number, date, InferType, bool } from 'yup';
// @ts-ignore
import jwtDecode from 'jwt-decode';

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
// Database schema
const options = {  // Schema options
  schema: "yup"
}
//////////////////////////////////////////////////////////////////////
// Database schema - To-do tasks
const taskSchemaYup = object( {
  id:           string(),
  categoryId:   string(),
  categoryName: string(),
  value:        string().required(),
  done:         bool().required(),
  starred:      bool().required(),
  createdOn:    date().default(() => new Date()),
})
//////////////////////////////////////////////////////////////////////
// Database schema - To-do tasks
const categorySchemaYup = object( {
  id:         string(),
  value:      string().required(),
  createdOn:  date().default(() => new Date()),
})
crudlify(app, {task: taskSchemaYup, category: categorySchemaYup}, options)
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
// Authorization
// Grabs the authorization token and parses it, stashing it on the request.
const userAuth = async (req: any, res: any, next: any) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const token = authorization.replace('Bearer ','');
      // NOTE this doesn't validate, but we don't need it to. codehooks is doing that for us.
      const token_parsed = jwtDecode(token);
      req.user_token = token_parsed;
    }
    next();
  } catch (error) {
    next(error);
  } 
}
app.use(userAuth)

//////////////////////////////////////////////////////////////////////
// 'task' route authentication
// Extra logic for GET / and POST / requests.
app.use('/task', (req: any, res: any, next: any) => {
  if (req.method === "POST") {
      // always save authenticating user Id token.
      // note -- were not enforcing uniqueness which isn't great.
      // we don't currently have a great way to do this -- one option would be to 
      // have a user collection track which collections have been filled
      // It's a limitation for sure, but I'll just make that a front-end problem...
      req.body.userId = req.user_token.sub
  } else if (req.method === "GET") {
      // on "index" -- always check for authentication.
      req.query.userId = req.user_token.sub
  }
  next();
})
// Extra logic for GET /id and PUT /id DELETE /id PATCH /id requests.
// side effect here will break patch patch by query, but that's OK for my purposes.
app.use('/task/:id', async (req: any, res: any, next: any) => {
  const id = req.params.ID;
  const userId = req.user_token.sub
  // let's check access rights for the document being read/updated/replaced/deleted
  const conn = await Datastore.open();
  try {
      console.log(id);
      const doc = await conn.getOne('task', id)
      if (doc.userId != userId) {
          // authenticate duser doesn't own this document.
          res.status(403).end(); // end is like "quit this request"
          return
      }
  } catch (e) {
      console.log(e);
      // the document doesn't exist.
      res.status(404).end(e);
      return;
  }
  // if we don't crash out -- call next and let crudlify deal with the details...
  next();
})

//////////////////////////////////////////////////////////////////////
// 'category' route authentication
// Extra logic for GET / and POST / requests.
app.use('/category', (req: any, res: any, next: any) => {
  if (req.method === "POST") {
      // always save authenticating user Id token.
      // note -- were not enforcing uniqueness which isn't great.
      // we don't currently have a great way to do this -- one option would be to 
      // have a user collection track which collections have been filled
      // It's a limitation for sure, but I'll just make that a front-end problem...
      req.body.userId = req.user_token.sub
  } else if (req.method === "GET") {
      // on "index" -- always check for authentication.
      req.query.userId = req.user_token.sub
  }
  next();
})
// Extra logic for GET /id and PUT /id DELETE /id PATCH /id requests.
// side effect here will break patch patch by query, but that's OK for my purposes.
app.use('/category/:id', async (req: any, res: any, next: any) => {
  const id = req.params.ID;
  const userId = req.user_token.sub
  // let's check access rights for the document being read/updated/replaced/deleted
  const conn = await Datastore.open();
  try {
      console.log(id);
      const doc = await conn.getOne('category', id)
      if (doc.userId != userId) {
          // authenticate duser doesn't own this document.
          res.status(403).end(); // end is like "quit this request"
          return
      }
  } catch (e) {
      console.log(e);
      // the document doesn't exist.
      res.status(404).end(e);
      return;
  }
  // if we don't crash out -- call next and let crudlify deal with the details...
  next();
})
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

export default app.init();