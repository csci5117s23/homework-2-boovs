// React imports 
import React, { useState, useEffect } from "react";

// MUI Imports
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from "@mui/material/Paper";

// MUI Icon Imports
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

// Next JS Imports
import Link from 'next/link';
import { useRouter } from 'next/router';

// Clerk imports
import { useAuth } from "@clerk/nextjs";

// DB Function imports
import { 
  getTasks, 
  getIdTask,
  getDoneTasks, 
  getStarredTasks,
  postTask, 
  updateTask, 
  deleteTask 
} from "../modules/taskData";
import { 
  formatDate, 
  formatDate2 
} from '../modules/dateFormatter';

// Custom component imports
import ChipsArray from "./ChipsArray";

// Type for to-do tasks
interface TaskType {
  _id: string; 
  value: string; 
  done: boolean; 
  starred: boolean;
  createdOn: Date;
}

// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
export default function TaskEditor() {
  const { pathname, query } = useRouter();

  
  const JWT_TEMPLATE_NAME = "codehooks-todo";

  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [addTaskText, setAddTaskText] = useState<string>("");

  // -------------------------------------
  // Add a to-do task to the react DOM
  // -------------------------------------
  async function add() {
    const token = await getToken({ template: JWT_TEMPLATE_NAME });
    const newTask = await postTask(token, addTaskText);
    setAddTaskText("");
    setTasks(tasks.concat(newTask));
  }

  // -------------------------------------
  // Remove a to-do task to the react DOM
  // -------------------------------------
  async function del(taskId: any) {
    const token = await getToken({ template: JWT_TEMPLATE_NAME });
    try {
      await deleteTask(token, taskId);
    } catch (e) {
      console.log(e);
    }
    setTasks(await getTasks(token));
  }


  // -------------------------------------
  // Toggle done status of selected task
  // -------------------------------------
  async function markDone(task: any) {
    // Toggle 'done' status for this task
    const updatedTask = {...task, done: !task.done }
    const newList = tasks.map((item) => {
      if (item._id === updatedTask._id) {
        return updatedTask;  // Update checkmark for selected task
      }
      return item;           // For other tasks, put back into list
    });
    setTasks(newList);       // Apply new task list to DOM

    // Send PUT request to DB
    const token = await getToken({ template: JWT_TEMPLATE_NAME });
    const newTask = await updateTask(token, updatedTask);
  }


  // ---------------------------------------
  // Toggle starred status of selected task
  // ---------------------------------------
  async function markStarred(task: any) {
    // Toggle 'starred' status for this task
    const updatedTask = {...task, starred: !task.starred }
    const newList = tasks.map((item) => {
      if (item._id === updatedTask._id) {
        return updatedTask;  // Update starred button for selected task
      }
      return item;           // For other tasks, put back into list
    });
    setTasks(newList);       // Apply new task list to DOM

    // Send PUT request to DB
    const token = await getToken({ template: JWT_TEMPLATE_NAME });
    const newTask = await updateTask(token, updatedTask);
  }

  // -------------------------------------
  // Load in signed-in user
  // -------------------------------------
  useEffect(() => {
    async function process() {
      // Todo page
      if ((userId) && (pathname == "/todos")) {
        const token = await getToken({ template: JWT_TEMPLATE_NAME});
        setTasks(await getTasks(token));
        setLoading(false);
      }
      // Edit task page
      if ((userId) && (pathname == "/todos/[id]")) {
        console.log("We got it boys");
        const token = await getToken({ template: JWT_TEMPLATE_NAME});
        setTasks(await getIdTask(token, query.id));
        setLoading(false);
      }
      // Done page
      if ((userId) && (pathname == "/done")) {
        const token = await getToken({ template: JWT_TEMPLATE_NAME});
        setTasks(await getDoneTasks(token, true));
        setLoading(false);
      }
      // Unfinished page
      if ((userId) && (pathname == "/unfinished")) {
        const token = await getToken({ template: JWT_TEMPLATE_NAME});
        setTasks(await getDoneTasks(token, false));
        setLoading(false);
      }
      // Starred page
      if ((userId) && (pathname == "/starred")) {
        const token = await getToken({ template: JWT_TEMPLATE_NAME});
        setTasks(await getStarredTasks(token));
        setLoading(false);
      }
    }
    process();
  }, [isLoaded]);


  // ----------------------------------------------------
  // ----------------------------------------------------
  // Load to-do list into DOM
  // ----------------------------------------------------
  // ----------------------------------------------------
  if (loading) {
    return (
      <> 
        loading... <CircularProgress />
      </>
    );
  }
  else {

    return (
      <>
        {/* Add task feature only shows on 'todo' page */}
        {(pathname === "/todos") && 
          <Box sx={{ mt: 2 }}>
            <TextField 
                sx={{ minWidth: '100%', mt: 1}}
                id="standard-basic" 
                label="Add a task" 
                variant="standard"
                value={addTaskText}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setAddTaskText(event.target.value);
                }}
            />
            <Button 
                sx={{ mt: 1 }}
                variant="outlined" 
                onClick={ () => add() }
            >
                <AddRoundedIcon/> Add
            </Button>   
             
          </Box>
        }

        {/* List of items */}
        <List>
          {tasks.map(task => {
              return (
                  // Todo list entry
                  <ListItem key={task._id}> 
                      <Card variant="outlined" sx={{ minWidth: '100%' }}>
                          {/* Displayed content */}
                          <CardContent>
                              {/* Date made */}
                              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                  {formatDate2(new Date(task.createdOn))}
                              </Typography>
                              {/* Task title */}
                              <Typography  sx={{ mb: -2 }} variant="h6" component="div">
                                  {task.value}
                              </Typography>
                          </CardContent>
                          {/* Edit/delete buttons */}
                          <CardActions sx={{ display: 'flex' }}>
                              {/* Completion button */}
                              <Box sx={{ flexGrow: 1 }}>
                                  <Box sx={{ flexGrow: 1 }}/>
                                  {/* Done button */}
                                  <Button onClick={ () => markDone(task) }>
                                      <Checkbox
                                          color="success"
                                          checked={task.done}
                                      />
                                      { task.done ? 'Done' : 'Unfinished' }
                                  </Button>
                                  {/* Star button */}
                                  <Button onClick={ () => markStarred(task) }>
                                      { task.starred ? <><StarIcon/></> : <><StarBorderIcon/></> }
                                  </Button>
                              </Box>
                              {/* Edit button */}
                              <Link href={{ pathname: './todos/[id]', query: { id: task._id } }} as="/todos/[id]">
                                  <Button size="small">
                                      <EditTwoToneIcon/> Edit
                                  </Button>
                              </Link>
                              {/* Delete button */}
                              <Button size="small" onClick={ () => del(task._id) }>
                                  <CloseOutlinedIcon/> Delete
                              </Button>
                          </CardActions>
                      </Card>                                
                  </ListItem>
          )})}



          {/* Editor for current task */}
          <ListItem key="editor">
            <Card variant="outlined" sx={{ minWidth: '100%', minHeight: '50vh' }}>
              <CardContent>
                <Typography variant="h6"> Change Task </Typography>
              </CardContent>
              <CardActions>
                <TextField
                    id="outlined-multiline-static"
                    label="Type here..."
                    multiline
                    rows={2}
                    sx={{ width: '100%' }}
                  />
              </CardActions>

              <CardContent>
                <Typography variant="h6"> Change categories </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    '& > :not(style)': {
                      m: 1,
                      width: '50%',
                      height: 128,
                    },
                  }}
                >
                <Paper variant="outlined"> </Paper>
                <Paper variant="outlined" square />
              </Box>

              </CardContent>
              <CardActions>
                <ChipsArray/>
              </CardActions>
            </Card>

            
          </ListItem>
       
        </List>

        
      </>
    )
        
  }
}