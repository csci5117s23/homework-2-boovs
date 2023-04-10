/////////////////////////////////////////////////////////////////////////
// IMPORTS
/////////////////////////////////////////////////////////////////////////
import * as React from 'react';
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
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

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

// Next JS Imports
import Link from 'next/link'
import { useRouter } from 'next/navigation';

// Clerk Authorization imports
import { UserButton } from '@clerk/nextjs';

// Custom component imports
import Searchbar from './Searchbar';
import TodoList from "./Todolist";


/////////////////////////////////////////////////////////////////////////
// CONST VARIABLES
/////////////////////////////////////////////////////////////////////////
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));



////////////////////////////////////
// Export function 
////////////////////////////////////
export default function TodosPageLayout() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  ///////////////////////////////////
  // RETURN JSX
  ///////////////////////////////////
  return (
    <Box sx={{ display: "flex"}}>
      <CssBaseline />
      
      {/* Top header tool bar */}
      <AppBar position="fixed" open={open}>
        <Toolbar>

          {/* Interactive menu icon */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>

          {/* Header text */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            To Do
          </Typography>

          {/* Search bar */}
          {/* <Searchbar/> */}
          
          {/* Account button (right-aligned) */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <UserButton/>
          </Box>

        </Toolbar>
      </AppBar>


      {/* Sidebar */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        {/* Header */}
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <MenuIcon/>
          </IconButton>

          {/* Page title text */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block', color: 'orange'} }}
            >
              Todo/Tasks Page
          </Typography>

        </DrawerHeader>

        <Divider /> 
        {/* Options/buttons */}
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
      </Drawer>
  

      {/* Main content */}
      <Main open={open}>
        <DrawerHeader />
        

        {/* Today's date */}
        <Card sx={{mt: -4}} >
          <CardContent>
            <Typography>
              <WbSunnyIcon/>
              <span> </span> Friday, April 6th
            </Typography>
          </CardContent>
        </Card>
        
        {/* Todo list add & entries */}
        <TodoList/>



      </Main>
    </Box>
  );
}
