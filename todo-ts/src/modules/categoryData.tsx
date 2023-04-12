// CRUD Functions for user-created to-do list category types

const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
const route: string = "/category";


// ------------------------------------------------
// GET Functions 
// ------------------------------------------------
export async function getCategories(authToken: any) {
    const result = await fetch(backend_base+route,{
        'method':'GET',
        'headers': {
            'Authorization': 'Bearer ' + authToken,
        }
    })
    return await result.json();
}


// ------------------------------------------------
// POST Functions
// ------------------------------------------------
export async function postCategory(authToken: any, categoryText: any) {
    const result = await fetch(backend_base+route,{
        'method':'POST',
        'headers': {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
            value: categoryText,
        })
    })
    return await result.json();
}


// ------------------------------------------------
// PUT Functions 
// ------------------------------------------------
export async function updateCategory(authToken: any, category: any) {
    const result = await fetch(backend_base+route+"/"+category._id, {
        'method':'PUT',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify(category)
    });
    return await result.json();
}


// ------------------------------------------------
// DELETE Functions 
// ------------------------------------------------
export async function deleteCategory(authToken: any, categoryId: any) {
    const result = await fetch(backend_base+route+"/"+categoryId,{
        'method':'DELETE',
        'headers': {'Authorization': 'Bearer ' + authToken},
    })
    return await result.json();
}