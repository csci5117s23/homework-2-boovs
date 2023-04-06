///////////////////
// Imports
///////////////////
// import React, { useState } from 'react';
// import Box from '@mui/material/Box';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Divider from '@mui/material/Divider';
// import InboxIcon from '@mui/icons-material/Inbox';
// import DraftsIcon from '@mui/icons-material/Drafts';
import Button from '@mui/material/Button';

import React, { useState, useEffect } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function TodoList() {
  // -------------------------------
  // --- State hook - 'useState' ---
  // -------------------------------
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);
  

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
      id: Math.floor(Math.random() * 1000),
      value: newItem
    };
    setItems(oldList => [...oldList, item]);  // * Add item to list
    setNewItem("");                           // * Change text input back to empty string
  }

  //////////////////////////////////////////////
  // Function to remove an item from to-do list
  //////////////////////////////////////////////
  function removeItem(id)
  {
    const newArray = items.filter(item => item.id !== id);
    setItems(newArray);
  }

  
  ////////////////////////////////////////////
  // Function to edit an existing to-do entry
  ////////////////////////////////////////////
  function editItem(id)
  {
    // Bring user to /todo/id
    console.log("Edit button clicked");
    console.log("ID of edit");

    // Route to

  }

  //////////////////////////////////////////////
  // Function to register to-do entry as 'done'
  //////////////////////////////////////////////
  function checkItem(id, checkValue)
  {
    // Send ID of list entry checked & notify database
    console.log("Checked clicked");
    console.log(checkValue);
  }

  
  ///////////////////////////////////////////////////////////
  // --- Return statement ---
  ///////////////////////////////////////////////////////////
  return (
    <div className="App">
      {/* 1. Header */}
      <h1>To-do List</h1>

      {/* 2. Input */}
      <input
        type="text"
        placeholder="Add an item..."
        value={ newItem }
        onChange={e => setNewItem(e.target.value)}
      />

      <Button variant="contained" onClick={ () => addItem()}>Add</Button>

      {/* 3. List of items */}
      <ul>
        {items.map(item => {
          return (
            
            //////////////////////////////////////////////////////////////
            // Todo list entry
            <li key={item.id}> 
              
              {/* Todo-text */}
              <span> {item.value} </span>
              
              {/* Edit button */}
              <button onClick={ () => editItem(item.id) }> Edit </button>

              {/* Done checkbox */}
              <input type="checkbox" onChange={ e => checkItem(item.id, e.target.checked) } />


              {/* Delete button */}
              <button onClick={ () => removeItem(item.id) }> ❌ </button>
              
            </li>
            //////////////////////////////////////////////////////////////

          )
        })}
      </ul>
    </div>
  )  
}