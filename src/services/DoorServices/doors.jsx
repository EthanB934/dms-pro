export const createDoor = async (door, token) => {
    // Sends user's door data to API to save in the database
    const doorPromise = await fetch("http://localhost:8000/doors", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token.token}`,
            "Accept": "application/json",
        },
        body: JSON.stringify(door)
    })

    // Converts the fulfilled promise into JavaScript
    const createdDoor = doorPromise.json()

    return createdDoor
}

export const getDoorsByCoolerId = async (coolerId, token) => {
    const doorsPromise = await fetch(`http://localhost:8000/doors/${coolerId}`, {
        method: "GET",
        headers: {
            "Authorization": `Token ${token.token}`,
            "Accept": "application/json",
        },
    })

    const doorsArray = await doorsPromise.json()

    return doorsArray
}

export const updateDoor = async (updateDoorForm, token) => {
    const promise = await fetch(`http://localhost:8000/doors/${updateDoorForm.doorId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token.token}`,
        },
        body: JSON.stringify(updateDoorForm)
    })

    const fulfilledPromise = await promise.json()

    return fulfilledPromise
}

export const deleteDoor = async (doorId, token) => {
    await fetch(`http://localhost:8000/doors/${doorId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${token.token}`
        }
    })
}