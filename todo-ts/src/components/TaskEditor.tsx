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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Container } from "@mui/material";

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
  deleteTask ,
  getTasksForCategoryId,
  getDoneCategoryTasks,
  postTaskCategory

} from "../modules/taskData";
import { 
  getCategories,
  getCategoryId,
  postCategory, 
  deleteCategory,
} from "../modules/categoryData";
import { 
  formatDate, 
  formatDate2 
} from '../modules/dateFormatter';

// Custom component imports
import CategoryEditor from "@/components/CategoryEditor";
import CategoriesInput from "@/components/CategoriesInput";

// Type for to-do tasks
interface TaskType {
  _id: string; 
  categoryId: string;
  categoryName: string;
  value: string; 
  done: boolean; 
  starred: boolean;
  createdOn: Date;
}

interface CategoryType {
  _id: string; 
  value: string; 
  createdOn: Date;
}

// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
export default function TaskEditor() {
  // React state hooks
  const { pathname, query } = useRouter();
  
  const JWT_TEMPLATE_NAME = "codehooks-todo";

  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [addTaskText, setAddTaskText] = useState<string>("");
  const [editTaskText, setEditTaskText] = useState<string>("");

  const [categories, setCategories] = useState<CategoryType[]>([]);

  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [onCategoryPage, setOnCategoryPage] = useState(false);

  const handleSelectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategoryId((event.target as HTMLInputElement).value);
  };


  // -------------------------------------
  // Add a to-do task to the react DOM
  // -------------------------------------
  async function add() {
    // Ensure empty inputs are not added (invalid)
    if (!addTaskText)
    {
        alert("Enter a task.");
        return;
    }
    const token = await getToken({ template: JWT_TEMPLATE_NAME });
    if (onCategoryPage === true) {
      const newTask = await postTaskCategory(token, addTaskText, query.id);
      setAddTaskText("");
      setTasks([newTask].concat(tasks));
    } else {
      const newTask = await postTask(token, addTaskText);
      setAddTaskText("");
      setTasks([newTask].concat(tasks));
    }
  }

  // -------------------------------------
  // Edit a to-do task to the react DOM
  // -------------------------------------
  async function edit(task: any) {
    // Set new task to have user-inputted text
    const updatedTask = {...task, categoryId: selectedCategoryId, value: editTaskText }
    const token = await getToken({ template: JWT_TEMPLATE_NAME });
    const newTask = await updateTask(token, updatedTask);
    setEditTaskText("");
    setTasks([newTask]);
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
    setTasks(await getTasks(token))
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
      // Unifinished page
      if ((userId) && (pathname == "/todos")) {
        const token = await getToken({ template: JWT_TEMPLATE_NAME});
        setTasks(await getDoneTasks(token, false));
        setLoading(false);
      }
      // Unifinished page with category
      if ((userId) && (pathname == "/todos/category/[id]")) {
        const token = await getToken({ template: JWT_TEMPLATE_NAME});
        setTasks(await getDoneCategoryTasks(token, false, query.id));
        setLoading(false);
        setOnCategoryPage(true);
      }


      // Done page
      if ((userId) && (pathname == "/done")) {
        const token = await getToken({ template: JWT_TEMPLATE_NAME});
        setTasks(await getDoneTasks(token, true));
        setLoading(false);
      }
      // Done page with category 
      if ((userId) && (pathname == "/done/category/[id]")) {
        const token = await getToken({ template: JWT_TEMPLATE_NAME});
        setTasks(await getDoneCategoryTasks(token, true, query.id));
        setLoading(false);
        setOnCategoryPage(true);
      }

      // Edit task page
      if ((userId) && (pathname == "/todos/[id]")) {
        const token = await getToken({ template: JWT_TEMPLATE_NAME});
        setTasks(await getIdTask(token, query.id));
        setLoading(false);
      }

      // All page with category
      if ((userId) && (pathname == "/all")) {
        const token = await getToken({ template: JWT_TEMPLATE_NAME});
        setTasks(await getTasks(token));
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

    async function processCategories() {
      // Get user categories
      if (userId) {
        const token = await getToken({ template: JWT_TEMPLATE_NAME});
        setCategories(await getCategories(token));
        setLoading(false);
      }
    }
    processCategories();
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
        {(pathname === "/todos" || pathname === "/todos/category/[id]") && 
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


        {/* Content */}
        <List>
          {tasks.map(task => {
              return (
                  <ListItem key={task._id} sx={{display: 'flex', flexDirection: 'column', p: 1}}> 

                    {/* -------------------------------------------------------------------------------- */}
                    {/* To do list */}
                    <Card variant="outlined" sx={{ minWidth: '100%' }}>
                      {/* Displayed content */}
                      <CardContent>
                          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                            {/* Date text */}
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {formatDate2(new Date(task.createdOn))}
                            </Typography>
                            {/* Category text */}
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Category: { (task.categoryName) ? task.categoryName : "None"}
                            </Typography>

                          </Box>
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
                          { pathname != "/todos/[id]" && 
                          <>
                            <Link href={{ pathname: '/todos/' + task._id }}>
                                <Button size="small">
                                    <EditTwoToneIcon/> Edit
                                </Button>
                            </Link>

                            {/* Delete button */}
                          <Button size="small" onClick={ () => del(task._id) }>
                              <CloseOutlinedIcon/> Delete
                          </Button>
                          </>
                          }
                      </CardActions>
                  </Card>
                  
                  {/* -------------------------------------------------------------------------------- */}
                  {/* Task editor */}
                  { pathname == "/todos/[id]" && 
                    <Card variant="outlined" sx={{ minWidth: '100%', mt: 2, minHeight: '100%'}}>
                      <CardContent sx={{ display: 'flex', justifyContent: 'space-between'}}>
                        <Typography variant="h6"> Enter a new task description </Typography>
                      </CardContent>
                      <CardActions>
                        <TextField
                            id="outlined-multiline-static"
                            label={task.value}
                            multiline
                            rows={2}
                            sx={{ width: '100%' }}
                            value={editTaskText}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                              setEditTaskText(event.target.value);
                            }}
                        />
                      </CardActions>
                      <CardContent>
                        <Typography variant="h6"> Edit task category </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            '& > :not(style)': {
                              m: 1,
                              width: '100%',
                              height: '100%',
                            },
                          }}
                        >
                          {/* Category selection */}
                          <Paper variant="outlined">  
                            {/* <CategoriesInput taskCategory={selectedCategory}  updateSelectedCategory={updateSelectedCategory}/> */}
                            <Container className="tags-input-container">

                                  <FormControl>
                                    <FormLabel id="demo-controlled-radio-buttons-group">Your categories:</FormLabel>
                                    <RadioGroup
                                      aria-labelledby="demo-controlled-radio-buttons-group"
                                      name="controlled-radio-buttons-group"
                                      value={selectedCategoryId}
                                      id="help"
                                      onChange={ (event) => handleSelectionChange(event) }
                                    >
                                      
                                        {/* Show all categories/tags */}
                                        { categories.map( category => (
                                          <FormControlLabel 
                                              key={category._id} 
                                              id={category._id}
                                              value={category._id} 
                                              label={category.value} 
                                              control={<Radio required={false} />}
                                          />
                                        ))}
                                    </RadioGroup>
                                  </FormControl>

                          </Container>


                          </Paper>
                        </Box>
                      </CardContent>
                  
                        <CardActions sx={{display: "flex", justifyContent: "flex-end" }}>
                        <Button 
                            sx={{ mt: 5 }}
                            variant="outlined" 
                            onClick={ () => edit( task ) }
                        >
                            <AddRoundedIcon/> Edit
                        </Button>  
                      </CardActions>
                    </Card>
                  }
              </ListItem>
          )})}       
        </List>
      </>
    )
        
  }
}