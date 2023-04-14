// src/components/TagsInput.js
import { useState, useEffect } from 'react'
import { useAuth } from "@clerk/nextjs";
import { Container, Chip } from '@mui/material'

// DB Function imports
import { 
    getCategories, 
    postCategory, 
    updateCategory,
    deleteCategory
} from "../modules/categoryData";

interface CategoryType {
    _id: string; 
    value: string; 
    createdOn: Date;
  }

export default function CategoriesInput() {
    const JWT_TEMPLATE_NAME = "codehooks-todo";
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const [open, setOpen] = useState<boolean>(false);
    const [addCategoryText, setAddCategoryText] = useState<string>("");
    const [categories, setCategories] = useState<CategoryType[]>([]);

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


    const [tags, setTags] = useState<any>([])

    function handleKeyDown(e: any){
        if(e.key !== 'Enter') return
        const value = e.target.value
        if(!value.trim()) return
        setTags([...tags, value])
        e.target.value = ''
    }

    function removeTag(index: any) {
        setTags(tags.filter((el: any, i: any) => i !== index))
    }
    
    // If user categories loaded, add to display
    if (isLoaded) {
        return (
            <>
            <div className="tags-input-container">
                { tags.map((tag: any, index: any) => (
                    <Container className="tag-item" key={index}>
    
                        <Chip
                            variant="outlined"
                            label={tag}
                            onClick={handleKeyDown}
                            onDelete={removeTag}
                        />                
                    </Container>
                )) }
    
                {/* List of avaialble tags */}
                <input onKeyDown={handleKeyDown} type="text" className="tags-input" placeholder="Type something" />
            </div>
            
            <div className="tags-input-container">
                { categories.map((tag: any, index: any) => (
                    <Container className="tag-item" key={index}>
    
                        <Chip
                            variant="outlined"
                            label={tag}
                            onClick={handleKeyDown}
                            onDelete={removeTag}
                        />                
                    </Container>
                )) }
            </div>
            </>
        )
    }
}