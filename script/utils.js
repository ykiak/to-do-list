export const generateId = () => {
    return Math.random().toString(36).slice(2, 10)
}

//create a pseudo ID with 8 digits (numbers and letters)