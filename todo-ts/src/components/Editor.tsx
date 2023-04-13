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


interface EditorProps {
    
}
export default function Editor({props}: EditorProps) {
  return (
    <>
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
            value={addTaskText}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setAddTaskText(event.target.value);
            }}
        />
      <Button 
          sx={{ mt: 1 }}
          variant="outlined" 
          onClick={ () => edit() }
      >
          <AddRoundedIcon/> Add
      </Button>  
      
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
      </CardActions>
    </Card>
    </>
  )
}