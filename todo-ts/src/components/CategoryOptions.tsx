// React imports 
import React, { useState, useEffect } from "react";

// MUI Imports
import { styled, useTheme } from '@mui/material/styles';
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
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Tooltip from '@mui/material/Tooltip'
import Chip from '@mui/material/Chip'

// MUI Icons
import ListItemIcon from '@mui/material/ListItemIcon';
import CancelIcon from '@mui/icons-material/Cancel';
import ChecklistRtlTwoToneIcon from '@mui/icons-material/ChecklistRtlTwoTone';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import StarIcon from '@mui/icons-material/Star';
import CategoryIcon from '@mui/icons-material/Category';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';


// Next JS Imports
import Link from 'next/link'
import { useAuth } from "@clerk/nextjs";

// DB Function imports
import { 
    getCategories, 
    postCategory, 
    deleteCategory,
} from "../modules/categoryData";

// Custom imports
import FormDialog from "./FormDialog";

// Type for to-do tasks
interface CategoryType {
  _id: string; 
  value: string; 
  createdOn: Date;
}

// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
export default function CategoryEditor( {page}: any ) {
    
    // Styling
    const theme = useTheme();
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const JWT_TEMPLATE_NAME = "codehooks-todo";
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const [open, setOpen] = useState<boolean>(false);
    const [addCategoryText, setAddCategoryText] = useState<string>("");
    const [categories, setCategories] = useState<CategoryType[]>([]);
    
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

  // -------------------------------------
  // Add a category to the react DOM
  // -------------------------------------
  async function add() {
    // Ensure empty inputs are not added (invalid)
    if (!addCategoryText)
    {
        alert("Enter a task.");
        return;
    }
    const token = await getToken({ template: JWT_TEMPLATE_NAME });
    const newCategory = await postCategory(token, addCategoryText);
    setAddCategoryText("");
    setCategories(categories.concat(newCategory));
  }

  // -------------------------------------
  // Remove a category to the react DOM
  // -------------------------------------
  async function del(taskId: any) {
    const token = await getToken({ template: JWT_TEMPLATE_NAME });
    try {
      await deleteCategory(token, taskId);
    } catch (e) {
      console.log(e);
    }
    setCategories(await getCategories(token));
  }


  // --------------------------------------------------------
  // Load in signed-in user and their custom-made categories
  // --------------------------------------------------------
  useEffect(() => {
    async function process() {
      // Todo page
      if ((userId)) {
        const token = await getToken({ template: JWT_TEMPLATE_NAME});
        setCategories(await getCategories(token));
        setLoading(false);
      }
    }
    process();
  }, [isLoaded]);


  // ----------------------------------------------------
  // ----------------------------------------------------
  // Load to-do list into DOM
  // ----------------------------------------------------
  // ----------------------------------------------------
  if (loading) {
    return (
      <><CircularProgress /></>
    );
  }
  else {
    return (
      <>
        {/* Add category popup */}
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 0, margin: 1.5}}>
            <Box>
                <Button variant="outlined" startIcon={<AddBoxIcon/>} onClick={handleClickOpen}>
                    Add category
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add a category</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Enter a category name."
                        type="email"
                        fullWidth
                        variant="standard"
                        value={addCategoryText}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setAddCategoryText(event.target.value);
                    }}
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={ () => {handleClose(); add(); }}>Add</Button>
                    </DialogActions>
                </Dialog>
            </Box>
            {/* List of items */}
            <List>
                {categories.map(category => {
                    return (
                        <ListItem key={category._id}>
                          <Card sx={{ display: 'flex', justifyContent: 'space-between', minWidth: '20vh', backgroundColor: 'darkgrey', padding: 0}}>
                            <Link href={{ pathname: '/categories/' + category._id }}>
                              <CardContent>
                                <Typography>{category.value}</Typography>
                              </CardContent>
                            </Link>
                              <IconButton aria-label="delete" onClick={ () => del(category._id) }>
                                <DeleteIcon fontSize="inherit" />
                              </IconButton>
                            </Card>
                        </ListItem>
                        )
                    })}
            </List>
        </Box>
      </>
    )
        
  }
}