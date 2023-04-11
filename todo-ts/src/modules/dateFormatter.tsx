// --------------------------------------------------------------------------
// Date functions
// Code reference: https://www.freecodecamp.org/news/how-to-format-dates-in-javascript/
export function formatDate(inputDate: Date) : string
{
    return inputDate.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"long", day:"numeric"}) 
}

export function formatDate2(inputDate: Date) : string
{
    return inputDate.toLocaleDateString('en-us', { year:"numeric", month:"long", day:"numeric"}) 
}