export const createDoor = async (door, token) => {
    // Sends user's door data to API to save in the database
    const doorPromise = await fetch("http://localhost:8000/doors", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token.token}`,
            "Accept": "application/json"
        },
        body: JSON.stringify(door)
    })

    // Converts the fulfilled promise into JavaScript
    const createdDoor = doorPromise.json()

    return createdDoor
}