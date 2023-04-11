// CRUD Functions for user-created to-do list category types

const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
const route: string = "/category";

export async function getCategories(authToken: any) {
    const result = await fetch(backend_base+route,{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json();
}


export async function postCategory(authToken: any, category: any) {
    const result = await fetch(backend_base+route,{
        'method':'POST',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify(category)
    })
    return await result.json();
}


export async function updateCategory(authToken: any, category: any) {
    const result = await fetch(backend_base+route+"/"+category._id, {
        'method':'PUT',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify(category)
    });
    return await result.json();
}


export async function deleteCategory(authToken: any, category: any) {
    const result = await fetch(backend_base+route+"/"+category._id,{
        'method':'DELETE',
        'headers': {'Authorization': 'Bearer ' + authToken},
    })
    return await result.json();
}