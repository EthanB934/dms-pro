import { useNavigate } from "react-router-dom"

export const CoolerForm = () => {
    const navigate = useNavigate();
    return (
        <article className="cooler-page">
            <section className="doors">
                {/* I will map my cooler arrays here */}
                {/* Cooler button will navigate user to the cooler creation form */}
                <button className="new-door" id="door" onClick={() => navigate("/create/door")}>New Door</button>
            </section>
        </article>
    )
}