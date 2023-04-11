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

// Custom component imports
import TaskEditor from './TaskEditor';

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Const variables
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
export default function Test() {
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState([])
    const { isLoaded, userId, sessionId, getToken } = useAuth();

    async function test() {
        const token = await getToken({template: 'codehooks'})   
    }

    return (
        <>
            {/* Task content controller */}
            <TaskEditor/>
        </>
    );
}