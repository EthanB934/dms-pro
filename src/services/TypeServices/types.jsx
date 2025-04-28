export const getAllTypes = async (token) => {

    // Makes request to API to query database for all types
    const promise = await fetch("http://localhost:8000/types", {
        method: "GET",
        headers: {
            "Authorization": `Token ${token.token}`
        }
    })

    // Converts the JSON data received into JavaScript
    const types = await promise.json()

    // Returns an array of objects: types
    return types
}