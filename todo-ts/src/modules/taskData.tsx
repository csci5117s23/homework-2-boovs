// CRUD Functions for user-created to-do list tasks
import { dateSort } from '@/modules/dateFormatter';

const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
const route: string = "/task";

import { getCategoryId, getCategoryIdData } from '@/modules/categoryData';

// ------------------------------------------------
// GET Functions 
// ------------------------------------------------
export async function getTasks(authToken: any) {
    const result = await fetch(backend_base+route,{
        'method':'GET',
        'headers': {
            'Authorization': 'Bearer ' + authToken,
        }
    })
    const results = await result.json();
    const sortedResults = results.sort(dateSort);
    return sortedResults;
}

export async function getDoneTasks(authToken: any, done: boolean) {
    const result = await fetch(backend_base+route,{
        'method':'GET',
        'headers': {
            'Authorization': 'Bearer ' + authToken,
        }
    })
    const tasks = await result.json();
    const filteredTasks = tasks.filter((task: any) => (task.done === done))
    const sortedResults = filteredTasks.sort(dateSort);
    return sortedResults;
}

export async function getDoneCategoryTasks(authToken: any, done: boolean, categoryId: any) {
    const result = await fetch(backend_base+route,{
        'method':'GET',
        'headers': {
            'Authorization': 'Bearer ' + authToken,
        }
    })
    const tasks = await result.json();
    const filteredTasks = tasks.filter((task: any) => (task.done === done && task.categoryId === categoryId))
    const sortedResults = filteredTasks.sort(dateSort);
    return sortedResults;
}

export async function getStarredTasks(authToken: any) {
    const result = await fetch(backend_base+route,{
        'method':'GET',
        'headers': {
            'Authorization': 'Bearer ' + authToken,
        }
    })
    const tasks = await result.json();
    const filteredTasks = tasks.filter((task: any) => (task.starred === true))
    const sortedResults = filteredTasks.sort(dateSort);
    return sortedResults;
}

export async function getIdTask(authToken: any, taskId: any) {
    const result = await fetch(backend_base+route+"/",{
        'method':'GET',
        'headers': {
            'Authorization': 'Bearer ' + authToken,
        }
    })
    const tasks = await result.json();
    return tasks.filter((task: any) => (task._id === taskId))
}



// Gets a category from the given ID
export async function getTasksForCategoryId(authToken: any, categoryId: any) {
    const result = await fetch(backend_base+route,{
        'method':'GET',
        'headers': {
            'Authorization': 'Bearer ' + authToken,
        }
    })
    const tasks = await result.json();
    return tasks.filter((task: any) => (task.categoryId === categoryId))
}

// ------------------------------------------------
// POST Functions
// ------------------------------------------------
export async function postTask(authToken: any, taskText: string) {
    const result = await fetch(backend_base+route,{
        'method':'POST',
        'headers': {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
            value:      taskText,
            done:       false,
            starred:    false,
        })
    })
    return await result.json();
}

export async function postTaskCategory(authToken: any, taskText: string, categoryId: any) {
    // Get category name
    const categoryQuery = await getCategoryIdData(authToken, categoryId);
    const categoryName = categoryQuery.value;

    const result = await fetch(backend_base+route,{
        'method':'POST',
        'headers': {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
            value:          taskText,
            done:           false,
            starred:        false,
            categoryId:     categoryId,
            categoryName:   categoryName
        })
    })
    return await result.json();
}

// ------------------------------------------------
// PUT Functions 
// ------------------------------------------------
export async function updateTask(authToken: any, task: any) {
    // Get category name
    const categoryQuery = await getCategoryIdData(authToken, task.categoryId);
    task.categoryName = categoryQuery.value;
    
    const result = await fetch(backend_base+route+"/"+task._id, {
        'method':'PUT',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify(task)
    });
    return await result.json();

}


// ------------------------------------------------
// DELETE Functions 
// ------------------------------------------------
export async function deleteTask(authToken: any, taskId: any) {
    const result = await fetch(backend_base+route+"/"+taskId,{
        'method':'DELETE',
        'headers': {'Authorization': 'Bearer ' + authToken},
    })
    return await result.json();
}