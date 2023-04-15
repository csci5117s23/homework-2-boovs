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

// Gets a category from the given ID
export async function getCategoryId(authToken: any, categoryId: any) {
    const result = await fetch(backend_base+route,{
        'method':'GET',
        'headers': {
            'Authorization': 'Bearer ' + authToken,
        }
    })
    const categories = await result.json();
    return categories.filter((category: any) => (category._id === categoryId))
}

// Gets a category data from the given ID
export async function getCategoryIdData(authToken: any, categoryId: any) {
    return await fetch(backend_base+route+"/"+categoryId,{
        'method':'GET',
        'headers': {
            'Authorization': 'Bearer ' + authToken,
        }
        })
        .then((response) => { 
            return response.json().then((data) => {
                console.log(data);
                return data;
            }).catch((err) => {
                console.log(err);
            }) 
        });
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
// DELETE Functions 
// ------------------------------------------------
export async function deleteCategory(authToken: any, categoryId: any) {
    const result = await fetch(backend_base+route+"/"+categoryId,{
        'method':'DELETE',
        'headers': {'Authorization': 'Bearer ' + authToken},
    })
    return await result.json();
}