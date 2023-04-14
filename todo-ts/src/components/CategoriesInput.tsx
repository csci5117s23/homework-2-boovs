// src/components/TagsInput.js
import { useState, useEffect } from 'react'
import { Card, Chip, Container, Typography } from '@mui/material'
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
    updateSelectedCategory: (arg: string) => void;
}
export default function CategoriesInput( {taskCategory, updateSelectedCategory} : CategoriesInputProps ) {
    // console.log({taskCategory})

    const JWT_TEMPLATE_NAME = "codehooks-todo";
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const [categories, setCategories] = useState<CategoryType[]>([]);

    const [value, setValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
        updateSelectedCategory(value);
    };

    // --------------------------------------------------------
    // Load in signed-in user and their custom-made categories
    // --------------------------------------------------------
    useEffect(() => {
        async function process() {
            // Load in categories page
            if ((userId)) {
                const token = await getToken({ template: JWT_TEMPLATE_NAME});
                setCategories(await getCategories(token));
                setLoading(false);
                console.log(categories);
            }
        }
        process();
    }, [isLoaded]);

    if (loading) {
        console.log("Loading...");
    }
    else {
        // console.log("Done loading");
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
                            <FormControlLabel 
                                key={category._id} 
                                value={category._id} 
                                label={category.value} 
                                control={<Radio required={true} />}
                            />
                        ))}
                </RadioGroup>
            </FormControl>
            </Container>
        )
    }
}