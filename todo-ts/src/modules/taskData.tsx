// CRUD Functions for user-created to-do list tasks

const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
const API_KEY_R = "2b2e8993-944c-491d-9081-ec3f2412fe50";
const route: string = "/task";


export async function getTasks(authToken: any) {
    const result = await fetch(backend_base+route,{
        'method':'GET',
        'headers': {
            'Authorization': 'Bearer ' + authToken,
        }
    })
    return await result.json();
}


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
        }
        )
    })
    return await result.json();
}


export async function updateTask(authToken: any, task: any) {
    const result = await fetch(backend_base+route+"/"+task._id, {
        'method':'PUT',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify(task)
    });
    return await result.json();
}


export async function deleteTask(authToken: any, taskId: any) {
    const result = await fetch(backend_base+route+"/"+taskId,{
        'method':'DELETE',
        'headers': {'Authorization': 'Bearer ' + authToken},
    })
    return await result.json();
}