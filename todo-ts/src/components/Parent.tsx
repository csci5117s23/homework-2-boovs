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
const Parent:React.FC = () => {

    const [parentName, setParentName] = useState<string>('John Obi')
    
    return (
         <div>
    
           <FirstChild name={parentName} />
           <SecondChild name={parentName} />
    
         </div>
    
      )
    }