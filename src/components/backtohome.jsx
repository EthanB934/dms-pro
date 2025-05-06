import { useNavigate } from "react-router-dom"
import "./authentication/auth.css"
export const BackToHome = () => {
    const navigate = useNavigate();

    return (
        <button id="home" onClick={() => navigate("/")}>Return to Home</button>
    )
}