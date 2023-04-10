/////////////////////////////////////////////////////////////////////////
// IMPORTS
/////////////////////////////////////////////////////////////////////////
import * as React from 'react';
// import React, { useState, useEffect } from 'react';

import { styled, useTheme } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

// MUI Icon Imports
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import CancelIcon from '@mui/icons-material/Cancel';
import StarIcon from '@mui/icons-material/Star';
import ChecklistRtlTwoToneIcon from '@mui/icons-material/ChecklistRtlTwoTone';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

// Custom component imports
import TodoCard from './Todocard';

export function handler(req: any, res: any) {
    if (req.method !== 'POST') {
      res.status(405).send({ message: 'Only POST requests allowed' })
      return
    }

}

/////////////////////////////////////////////////////////////////////////
// DEFAULT EXPORT 
/////////////////////////////////////////////////////////////////////////
export default function Addtask() {
    // -------------------------------
    // --- State hook - 'useState' ---
    // -------------------------------
    const [newItem, setNewItem] = React.useState<string>("");
    const [items, setItems] = React.useState <{ id: number; value: string }[]> ([]);

    // ------------------------
    // --- Helper functions ---
    // ------------------------

    /////////////////////////////////////////
    // Function to add an item to to-do list
    /////////////////////////////////////////
    function addItem() 
    {
        // Ensure empty inputs are not added (invalid)
        if (!newItem)
        {
            alert("Enter a task.");
            return;
        }
        // Generate a random ID for the item and use the passed
        // in text as the to-do entry value
        const item = {
            id: Math.floor(Math.random() * 10000),  // FIXME: Find better way to generate key
            value: newItem
        };
        setItems(items.concat(item));  // * Add item to list
        setNewItem("");                   // * Change text input back to empty string
    }


    //////////////////////////////////////////////
    // Function to remove an item from to-do list
    //////////////////////////////////////////////
    function removeItem(id: number)
    {
        const newArray = items.filter(item => item.id !== id);
        setItems(newArray);
    }

    
    ////////////////////////////////////////////
    // Function to edit an existing to-do entry
    ////////////////////////////////////////////
    function editItem(id: number)
    {
        // Bring user to /todo/id
        console.log("Edit button clicked");
        console.log("ID of edit");

        // Route to

    }

    //////////////////////////////////////////////
    // Function to register to-do entry as 'done'
    //////////////////////////////////////////////
    function checkItem(id: number, checkValue: boolean)
    {
        // Send ID of list entry checked & notify database
        console.log("Checked clicked");
        console.log(checkValue);
    }
    



    // ------------------
    // --- Return JSX ---
    // ------------------
    return (
        <>
            {/* Add task container*/}
            <Box>
                {/* Task add text input*/}
                <TextField 
                    id="standard-basic" 
                    label="Add a task" 
                    variant="standard"
                    value={newItem}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setNewItem(event.target.value);
                      }}
                />

                {/* Add task button */}
                <Button variant="outlined" onClick={ () => addItem() }>
                    <AddRoundedIcon/> Add
                </Button>
            </Box>

            {/* List of items */}
            <List>
                {items.map(item => {
                return (
                    
                    //////////////////////////////////////////////////////////////
                    // Todo list entry
                    <ListItem key={item.id}> 
                        
                        {/* Todo-text */}
                        <span> {item.value} </span>
                        
                        {/* Edit button */}
                        <button onClick={ () => editItem(item.id) }> Edit </button>

                        {/* Done checkbox */}
                        <input type="checkbox" onChange={ e => checkItem(item.id, e.target.checked) } />


                        {/* Delete button */}
                        <Button onClick={ () => removeItem(item.id) }>
                            <CloseOutlinedIcon/>
                        </Button>
                    
                    </ListItem>
                    //////////////////////////////////////////////////////////////

                )
                })}
            </List>
        </>
    );
}