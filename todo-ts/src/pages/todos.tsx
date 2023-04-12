// React imports
import * as React from 'react';

// Mui imports
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

// Next JS Imports
import Link from 'next/link'
import { useRouter } from 'next/navigation';

// Clerk Authorization imports
import { UserButton } from '@clerk/nextjs';

// Custom component imports
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import TodoListAll from '@/components/AllPage';
import TaskEditor from '@/components/TaskEditor';
import { formatDate, formatDate2 } from '@/modules/dateFormatter';

// ------------------
// Const variables
// ------------------
const drawerWidth = 240;

// --------------------------------
// Main component export function
// --------------------------------
export default function TodosPageLayout() {

    // State hooks
    const theme = useTheme();

    // ----------------------------
    // Return statement
    // ----------------------------
    return (
    <Box sx={{ display: "flex"}}>
        <CssBaseline />

        {/* Page header at top */}
        <Header/>
        
        {/* Sidebar on left */}
        <Sidebar
            drawerWidth={drawerWidth}  
        />

        {/* Content */}
        <Box sx={{ flexGrow: 1, p: 3, minHeight: '95.8vh', backgroundColor: 'theme.primary' }}>
            <Toolbar />

            {/* Today's date */}
            <Card sx={{mt: -4}} >
                <Typography sx={{ padding: 1 }}>
                  <WbSunnyIcon/> {formatDate(new Date())}
                </Typography>
            </Card>

            {/* Task content controller */}
            <TaskEditor/>

        </Box>
    </Box>
  );
}
