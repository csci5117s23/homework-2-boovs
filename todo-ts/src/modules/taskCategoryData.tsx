// CRUD Functions for user-created to-do list tasks

const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
const API_KEY_R = "2b2e8993-944c-491d-9081-ec3f2412fe50";
const route: string = "/task";


// ------------------------------------------------
// GET Functions 
// ------------------------------------------------
export async function getTasksCategory(authToken: any) {
    const result = await fetch(backend_base+route,{
        'method':'GET',
        'headers': {
            'Authorization': 'Bearer ' + authToken,
        }
    })
    return await result.json();
}

export async function getDoneTasksCategory(authToken: any, done: boolean) {
    const result = await fetch(backend_base+route,{
        'method':'GET',
        'headers': {
            'Authorization': 'Bearer ' + authToken,
        }
    })
    const tasks = await result.json();
    return tasks.filter((task: any) => (task.done === done))
}

