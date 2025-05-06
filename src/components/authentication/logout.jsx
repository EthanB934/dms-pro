import { useNavigate } from "react-router-dom"
import "./auth.css"

export const LogOut = ({ setter }) => {
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem("store_token")
        setter({})
        navigate("/login")    
    }

    return (
        <button id="log-out" onClick={handleLogOut}>Log Out</button>
    )
}