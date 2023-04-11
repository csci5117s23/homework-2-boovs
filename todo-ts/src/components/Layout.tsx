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
import Header from './Header';
import Sidebar from './Sidebar';

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
        <Box sx={{ flexGrow: 1, p: 3 }}>

            <Toolbar />
            {/* Today's date */}
            <Card sx={{mt: -4}} >
            <CardContent>
                <Typography>
                <WbSunnyIcon/>
                <span> </span> Friday, April 6th
                </Typography>
            </CardContent>
            </Card>


        </Box>

    </Box>
  );
}
