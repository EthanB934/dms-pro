import { useNavigate } from "react-router-dom"

export const BackToHome = () => {
    const navigate = useNavigate();

    return (
        <button className="return-home" id="home" onClick={() => navigate("/")}>Return to Home</button>
    )
}