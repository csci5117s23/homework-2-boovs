// Imports
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

// MUI Icons
import ListItemIcon from '@mui/material/ListItemIcon';
import CancelIcon from '@mui/icons-material/Cancel';
import ChecklistRtlTwoToneIcon from '@mui/icons-material/ChecklistRtlTwoTone';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import StarIcon from '@mui/icons-material/Star';



// Next JS Imports
import Link from 'next/link'
import { useRouter } from 'next/navigation';

// Clerk Authorization imports
import { UserButton } from '@clerk/nextjs';

// -------------------------
// Main export function
// -------------------------
interface SideBarProps {
    drawerWidth: number;
}  
export default function Sidebar( {drawerWidth}: SideBarProps ) {

    // ----------------------------
    // Const variables
    // ----------------------------
    const theme = useTheme();

    // ----------------------------
    // Return statement
    // ----------------------------
    return (
        <>
        {/* Sidebar container */}
        <Drawer
            variant="permanent"
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
        >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
            <List>
                <ListItem key={"Account"} disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        <UserButton/>
                    </ListItemIcon>
                    <ListItemText primary="Account" />
                    </ListItemButton>
                </ListItem>

                <Divider /> 

                {/* Task categories */}
                <ListItem key={"Tasks"} disablePadding>
                    <Link href={{ pathname: './todos' }}>
                    <ListItemButton>
                        <ListItemIcon>
                        <ChecklistRtlTwoToneIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Tasks" />
                    </ListItemButton>
                    </Link>
                </ListItem>

                {/* Starred category */}
                <ListItem key={"Starred"} disablePadding>
                    <Link href={{ pathname: './starred' }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <StarIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Starred" />
                    </ListItemButton>
                    </Link>
                </ListItem>
                
                {/* Done category */}
                <ListItem key={"Done"} disablePadding>
                    <Link href={{ pathname: './done' }}>
                    <ListItemButton>
                        <ListItemIcon>
                        <CheckCircleTwoToneIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Done" />
                    </ListItemButton>
                    </Link>
                </ListItem>

                {/* 'Unfinished' category */}
                <ListItem key={"Unfinished"} disablePadding>
                    <Link href={{ pathname: './unfinished' }}>
                    <ListItemButton>
                        <ListItemIcon>
                        <CancelIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Unfinished" />
                    </ListItemButton>
                    </Link>
                </ListItem>
            </List>
            <Divider /> 

            {/* Categories */}
            <ListItem key={"Categories"} disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                    <CancelIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Categories" />
                </ListItemButton>
            </ListItem>

            
        </Box>
      </Drawer>
    </>
  );
}