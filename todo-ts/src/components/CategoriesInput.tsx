// src/components/TagsInput.js
import { useState, useEffect } from 'react'
import { Chip, Container, Typography } from '@mui/material'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useAuth } from "@clerk/nextjs";

// DB Function imports
import { 
    getCategories, 
    postCategory, 
    deleteCategory,
} from "../modules/categoryData";


// Type for to-do tasks
interface CategoryType {
    _id: string; 
    value: string; 
    createdOn: Date;
  }

interface CategoriesInputProps {
    taskCategory: string;
}
export default function CategoriesInput( {taskCategory} : CategoriesInputProps ) {
    const JWT_TEMPLATE_NAME = "codehooks-todo";
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const [open, setOpen] = useState<boolean>(false);
    const [addCategoryText, setAddCategoryText] = useState<string>("");
    const [categories, setCategories] = useState<CategoryType[]>([]);

    const [selectedTags, setSelectedTags] = useState<any>([])
    const [unselectedTags, setUnselectedTags] = useState<any>([])

    const [value, setValue] = useState('female');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

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
    

    // Select tag
    function selectTag(e: any) 
    {
        console.log("Select");
        setSelectedTags([...selectedTags])
        // e.target.value = ''
    }

    // Deselect tags
    function deselectTag(category: any) 
    {
        console.log(category)
        console.log("Deselect");
        // setCategories(categories.filter((category: any) => category._id !== categoryId))
    }

    
    // Selected tags
    return (
        <Container className="tags-input-container">
            <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">Your categories:</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={handleChange}
                >
                    {/* Show all categories/tags */}
                    { categories.map( category => (
                    <>
                        <FormControlLabel value={category._id} control={<Radio />} label={category.value} />
                    </>
                    ))
                    }
            </RadioGroup>
        </FormControl>
        </Container>
    )
}