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
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

// MUI Icons
import ListItemIcon from '@mui/material/ListItemIcon';
import CancelIcon from '@mui/icons-material/Cancel';
import ChecklistRtlTwoToneIcon from '@mui/icons-material/ChecklistRtlTwoTone';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import StarIcon from '@mui/icons-material/Star';
import CategoryIcon from '@mui/icons-material/Category';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddBoxIcon from '@mui/icons-material/AddBox';

// Next JS Imports
import Link from 'next/link'
import { useRouter } from 'next/navigation';

// Clerk Authorization imports
import { UserButton } from '@clerk/nextjs';

// Custom component imports
import FormDialog from './FormDialog';
import CategoryOptions from '@/components/CategoryOptions';
import CategoryEditor from './CategoryEditor';

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

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    // Each category user adds is displayed as one of these days
    const CategoryCard = () => {
        return (
            <>
            <Button 
                variant="outlined" 
                // onClick={ () => addCategory()} 
                startIcon={<DeleteForeverIcon />}>

            </Button>
            </>
        )
    }

    // -----------------------------------------------------
    // Function to handle on clicks for handle click button
    // -----------------------------------------------------
    async function addCategory() {
        console.log("clicked");

    }

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
                <Link href={{ pathname: '/todos' }}>
                    <ListItem key={"Tasks"} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <ChecklistRtlTwoToneIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Tasks" />
                        </ListItemButton>
                    </ListItem>
                </Link>

                {/* Starred category */}
                <Link href={{ pathname: '/starred' }}>
                    <ListItem key={"Starred"} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <StarIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Starred" />
                        </ListItemButton>
                    </ListItem>
                </Link>
                
                {/* Done category */}
                <Link href={{ pathname: '/done' }}>
                    <ListItem key={"Done"} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                            <CheckCircleTwoToneIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Done" />
                        </ListItemButton>
                    </ListItem>
                </Link>

                {/* 'Unfinished' category */}
                <Link href={{ pathname: '/unfinished' }}>
                    <ListItem key={"Unfinished"} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                            <CancelIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Unfinished" />
                        </ListItemButton>
                    </ListItem>
                </Link>
            </List>
            <Divider /> 

            {/* Categories */}
            <ListItem key={"Categories"} disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <CategoryIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Categories" />
                </ListItemButton>
            </ListItem>

            <Divider/>
            
            {/* Add category button */}
            <ListItem key={"AddCategories"} disablePadding>
                <CategoryEditor/>
            </ListItem>
            
        </Box>
      </Drawer>
    </>
  );

}