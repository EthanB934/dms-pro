import { Navigate, Outlet } from "react-router-dom"

export const Authorized = () => { 
    // This function component will be responsible for authorizing authenticated users
    // First, I need to make sure they have an authentication token
    if(localStorage.getItem("store_token")) {
        // If they have an authentication token, then let them see the other components
        return <Outlet />
    }
    // If they are not authenticated, then set the user to an authentication route
    return <Navigate to="/login" replace/>
}