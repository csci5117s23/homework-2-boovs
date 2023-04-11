// React imports 
import React, { useState, useEffect } from "react";

// MUI Imports
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';

// MUI Icon Imports
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DoneOutlineTwoToneIcon from '@mui/icons-material/DoneOutlineTwoTone';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

// Next JS Imports
import Link from 'next/link'
import { useAuth } from "@clerk/nextjs";

// DB Function imports
import { getTasks, postTask, updateTask, deleteTask } from "../modules/taskData";

// Checkbox color
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


// Type for to-do tasks
interface ItemType {
  userId: string; 
  _id: string; 
  value: string; 
  date: Date; 
  done: boolean; 
  starred: boolean;
}


export default function TaskEditor() {
  const JWT_TEMPLATE_NAME = "codehooks-todo";

  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  
  const [tasks, setTasks] = useState<ItemType[]>([]);
  const [addTaskText, setAddTaskText] = useState<string>("");
  

  // Load in signed-in user
  useEffect(() => {
    async function process() {
      if (userId) {
        const token = await getToken({ template: JWT_TEMPLATE_NAME});
        setTasks(await getTasks(token));
        setLoading(false);
      }
    }
    process();
  }, [isLoaded]);


  // Add a to-do task to the react DOM
  async function add() {
    const token = await getToken({ template: JWT_TEMPLATE_NAME });
    const newTask = await postTask(token, addTaskText);
    setAddTaskText("");
    setTasks(tasks.concat(newTask));
  }


  // Remove a to-do task to the react DOM
  async function del(taskId: any) {
    const token = await getToken({ template: JWT_TEMPLATE_NAME });
    try {
      await deleteTask(token, taskId);
    } catch (e) {
      console.log(e);
    }
    setTasks(await getTasks(token));
  }


  // // Mark a to-do task to the react DOM
  // async function markDone(task: any) {
  //   // Toggle 'done' status for this task
  //   const newList = tasks.map((item) => {
  //     if (item._id === task._id) {
  //       // Update state checkmark for selected task
  //       const updatedItem = {
  //           ...item, done: !task.done,
  //       }; return updatedItem;
  //     } return item;
  //   });
  //   setTasks(newList);

  //   // Send PUT request to modify
  //   const token = await getToken({ template: JWT_TEMPLATE_NAME });
  //   const newTask = await updateTask(token, task);
  // }


  // Add a to-do task to the react DOM
  // async function add() {
  //   const token = await getToken({ template: JWT_TEMPLATE_NAME });
  //   const newTask = await postTask(token, textInput);
  //   setTextInput("");
  //   setTasks(tasks.concat(newTask));
  // }


  // Check if loading
  if (loading) {
    return <span> loading... </span>;
  }   
  else {
    return (
      <>
        {/* Add task container*/}
        <Box sx={{ mt: 2}}>
          
          {/* Task add text input*/}
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

          {/* Add task button */}
          <Button 
              sx={{ mt: 1 }}
              variant="outlined" 
              onClick={ () => add() }
          >
              <AddRoundedIcon/> Add
          </Button>
          
      </Box>

        {/* List of items */}
        <List>
          {tasks.map(task => {
              return (
                  // -------------------------------------------------------------------------------------------------
                  // Todo list entry
                  <ListItem key={task._id}> 
                      <Card variant="outlined" sx={{ minWidth: '100%' }}>
                          {/* Displayed content */}
                          <CardContent>

                              {/* Date made */}
                              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                  {/* {userId}  */}
                                    {/* {formatDate(item.date)} */}
                              </Typography>

                              {/* Task title */}
                              <Typography  sx={{ mb: -2}}  variant="h6" component="div">
                                  {task.value}
                              </Typography>
                              
                          </CardContent>
                          
                          {/* Edit/delete buttons */}
                          <CardActions sx={{ display: 'flex' }}>
                              
                              {/* Completion button */}
                              <Box sx={{ flexGrow: 1 }}>
                                  <Box sx={{ flexGrow: 1 }}/>

                                  {/* Done button */}
                                  <Button>
                                      <Checkbox {...label}
                                          color="success"
                                          checked={task.done}
                                          onChange={ () => markDone(task) }
                                          inputProps={{ 'aria-label': 'controlled' }}
                                      />
                                      {task.done ? 'Done' : 'Incomplete'}
                                  </Button>

                                  {/* Star button */}
                                  <Button onClick={ () => starItem( task._id, task.starred ) }>
                                      <StarBorderIcon/>
                                      {task.starred ? 'Starred' : 'Not starred'}
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
                  // -------------------------------------------------------------------------------------------------
          )})}
        </List>
      </>
    )
        
  }
}