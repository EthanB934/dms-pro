import { useNavigate } from "react-router-dom"

export const LogOut = ({ setter }) => {
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem("store_token")
        setter({})
        navigate("/login")    
    }

    return (
        <button className="log-out" id="log-out" onClick={handleLogOut}>Log Out</button>
    )
}