/////////////////////////////////////////////////////////////////////////
// IMPORTS
/////////////////////////////////////////////////////////////////////////
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';

// Next JS Imports
import Link from 'next/link'

// Clerk Authorization imports
import { useAuth } from '@clerk/nextjs';

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

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Const variables
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

// React backend API endpoint and API token
const API_ENDPOINT            = "https://todobackend-fm9y.api.codehooks.io/dev";
const API_ENDPOINT_TODOS      = API_ENDPOINT + "/task";

const API_KEY_RW = "3b7c5db3-2f5c-4ed0-a2cb-da5a79ef809e";
const API_KEY_R = "2b2e8993-944c-491d-9081-ec3f2412fe50";
/////////////////////////////////////////////////////////////////////////////////////////////////////


// Date functions
// Format date code reference: https://www.freecodecamp.org/news/how-to-format-dates-in-javascript/
export function formatDate(inputDate: Date) : string
{
    return inputDate.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"long", day:"numeric"}) 
}

// ----------------------------------------------------------------
// DEFAULT EXPORT 
// ----------------------------------------------------------------
export default function TodoListAll() {
    
    // Get user Id
    const { userId } = useAuth();

    // -------------------------------
    // --- State hook - 'useState' ---
    // -------------------------------
    const [newItem, setNewItem] = React.useState<string>("");
    const [items, setItems] = React.useState <{ userId: string; id: string; value: string; date: Date; done: boolean; starred: boolean }[]> ([]);

    // -----------------------
    // --- CRUD functions ---
    // -----------------------

    
    // Function to add an item to to-do list
    //////////////////////////////////////////////
    async function addItem() 
    {
        // Ensure empty inputs are not added (invalid)
        if (!newItem)
        {
            alert("Enter a task.");
            return;
        }

        // Send post request to POST/create a new todo task
        const response = await fetch(API_ENDPOINT_TODOS, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'x-apikey': API_KEY_RW 
            },
            body: JSON.stringify(
            { 
                userId:     userId,
                value:      newItem,
                date:       new Date(),
                done:       false,
                starred:    false,
            })
        });
        const data = await response.json();

        // Generate a random ID for the item and use the passed in text as the to-do entry value
        const item = {
            userId:     data[`userId`],
            id:         data[`_id`],
            value:      data[`value`],
            date:       new Date(data[`date`]),
            done:       data[`done`],
            starred:    data[`starred`],
        };
        // Add new task to DOM dynamically
        setItems([item].concat(items));  // * Add item to beginning of list (since ordered by most recent)
        setNewItem("");                  // * Change text input back to empty string
    }    


    //////////////////////////////////////////////
    // Function to remove an item from to-do list
    //////////////////////////////////////////////
    async function removeItem(id: string) 
    {
        // Remove task from DOM dynamically
        const newArray = items.filter(item => item.id !== id);
        setItems(newArray);
        
        // Send request to DELETE specified todo task
        const API_ENDPOINT_ID_DELETE = API_ENDPOINT_TODOS + "/" + id;
        const response = await fetch(API_ENDPOINT_ID_DELETE, {
            method: "DELETE",
            headers: { "x-apikey": API_KEY_RW }
        });
        const data = await response.json();
    }

    
    ////////////////////////////////////////////////
    // Function to 'star' / mark a task as important
    ////////////////////////////////////////////////
    async function starItem(id: string, starred: boolean)
    {
        // Toggle 'done' status for this task
        const newList = items.map((item) => {
            if (item.id === id) {
                // Update state checkmark for selected task
                const updatedItem = {
                    ...item,
                    starred: !starred,
                    };
                return updatedItem;
            }
            return item;
          });
        setItems(newList);

        // Send GET request to store old values
        const API_ENDPOINT_ID = API_ENDPOINT_TODOS + "/" + id;
        const getResponse = await fetch(API_ENDPOINT_ID, {
            method: "GET",
            headers: { "x-apikey": API_KEY_R }
        });
        const getData = await getResponse.json();


        // Send PUT request to edit an existing task
        const putResponse = await fetch(API_ENDPOINT_ID, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'x-apikey': API_KEY_RW 
            },
            body: JSON.stringify(
            { 
                userId:     String(getData['userId']),
                id:         String(getData['_id']),
                value:      String(getData['value']),
                date:       new Date(getData['date']),
                done:       Boolean(getData['done']),
                starred:    Boolean(!starred),
            })
        });
        const putData = await putResponse.json();
    }


    /////////////////////////////////////////////////////////////////////
    // Function to register to-do entry as 'done'
    // Reference: https://www.robinwieruch.de/react-update-item-in-list/
    /////////////////////////////////////////////////////////////////////
    async function checkItem(id: string, checked: boolean)
    {
        // Toggle 'done' status for this task
        const newList = items.map((item) => {
            if (item.id === id) {
                // Update state checkmark for selected task
                const updatedItem = {
                    ...item,
                    done: !checked,
                    };
                return updatedItem;
            }
            return item;
          });
        setItems(newList);

        // Send GET request to store old values
        const API_ENDPOINT_ID = API_ENDPOINT_TODOS + "/" + id;
        const getResponse = await fetch(API_ENDPOINT_ID, {
            method: "GET",
            headers: { "x-apikey": API_KEY_R }
        });
        const getData = await getResponse.json();


        // Send PUT request to edit an existing task
        const putResponse = await fetch(API_ENDPOINT_ID, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'x-apikey': API_KEY_RW 
            },
            body: JSON.stringify(
            { 
                userId:     String(getData['userId']),
                id:         String(getData['_id']),
                value:      String(getData['value']),
                date:       new Date(getData['date']),
                done:       Boolean(!checked),
                starred:    Boolean(getData['starred']),
            })
        });
        const putData = await putResponse.json();
    }



    // ----------------------------------------------------------
    // Get user todo list
    React.useEffect( ()=> {
        // Call Codehooks backend API   
        const fetchData = async () => {
            const response = await fetch(API_ENDPOINT_TODOS, {
                method: "GET",
                headers: { "x-apikey": API_KEY_R }
            });
            const data = await response.json();

            // Change application state to show the logged-in user's tasks 
            const newList = data.filter((task: any) => (task['userId'] === userId)).map((userTask: any) => {
                const updatedItem = {
                    ...userTask,
                    userId:     String(userTask['userId']),
                    id:         String(userTask['_id']),
                    value:      String(userTask['value']),
                    date:       new Date(userTask['date']),
                    done:       Boolean(userTask['done']),
                    starred:    Boolean(userTask['starred']),

                };
                return updatedItem;
            });
            // Sort list by date (most recent first)
            const sortedNewList = newList.sort((a: any, b: any) => b.date - a.date);
            setItems(sortedNewList);
        }
        fetchData();
    }, [userId]);
    // ----------------------------------------------------------


    // ------------------
    // --- Return JSX ---
    // ------------------
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
                    value={newItem}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setNewItem(event.target.value);
                      }}
                />

                {/* Add task button */}
                <Button 
                    sx={{ mt: 1 }}
                    variant="outlined" 
                    onClick={ () => addItem() }
                >
                    <AddRoundedIcon/> Add
                </Button>
                
            </Box>
            
            {/* List of items */}
            <List>
                {items.map(item => {
                    return (
                        
                        // -------------------------------------------------------------------------------------------------
                        // Todo list entry
                        <ListItem key={item.id}> 
                            <Card variant="outlined" sx={{ minWidth: '100%' }}>
                                {/* Displayed content */}
                                <CardContent>

                                    {/* Date made */}
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        {/* {userId}  */}
                                         {formatDate(item.date)}
                                    </Typography>

                                    {/* Task title */}
                                    <Typography  sx={{ mb: -2}}  variant="h6" component="div">
                                        {item.value}
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
                                                checked={item.done}
                                                onChange={ () => checkItem( item.id, item.done )}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                            {item.done ? 'Done' : 'Incomplete'}
                                        </Button>

                                        {/* Star button */}
                                        <Button onClick={ () => starItem( item.id, item.starred ) }>
                                            <StarBorderIcon/>
                                            {item.starred ? 'Starred' : 'Not starred'}
                                        </Button>
                                    </Box>

                                    {/* Edit button */}
                                    <Link href={{ pathname: './todos/[id]', query: { id: item.id } }} as="/todos/[id]">
                                        <Button size="small">
                                            <EditTwoToneIcon/> Edit
                                        </Button>
                                    </Link>

                                    {/* Delete button */}
                                    <Button size="small" onClick={ () => removeItem(item.id) }>
                                        <CloseOutlinedIcon/> Delete
                                    </Button>
                                    
                                </CardActions>

                            </Card>                                
                        </ListItem>
                        // -------------------------------------------------------------------------------------------------
                )
                })}
            </List>
        </>
    );
}