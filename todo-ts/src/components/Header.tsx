// React imports
import * as React from 'react';

// MUI Imports
import { styled, useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import BadgeIcon from '@mui/icons-material/Badge';
import HomeIcon from '@mui/icons-material/Home';

// Next JS Imports
import Link from 'next/link'
import { useRouter } from 'next/navigation';

// Clerk Authorization imports
import { UserButton } from '@clerk/nextjs';


// -------------------------
// Main export function
// -------------------------
export default function Header( ) {

    // ----------------------------
    // Const variables
    // ----------------------------
    const theme = useTheme();

  
    // ----------------------------
    // Return statement
    // ----------------------------
    return (
        <>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>

                    {/* Interactive menu icon */}
                    <Link href={{ pathname: './todos' }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            sx={{ mr: 2 }}
                        >
                            <HomeIcon/>
                        </IconButton>
                    </Link>

                    {/* Header title text */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        Josh&#39;s To-Do List
                    </Typography>

                    {/* Use account button  */}
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <UserButton/>
                    </Box>

                </Toolbar>
            </AppBar>
        </>
    );
}
