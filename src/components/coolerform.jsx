import { useNavigate, useParams } from "react-router-dom"

export const CoolerForm = ({ token }) => {
    const navigate = useNavigate();

    const handleCoolerCreation = () => {
        // This is where the logic to save a cooler to the database will be
    }
    return (
        <article className="cooler-page">
            <section className="doors">
                {/* I will map my cooler arrays here */}
                {/* Cooler button will navigate user to the cooler creation form */}
                <button className="new-door" id="door" onClick={() => navigate("door")}>New Door</button>
            </section>
        </article>
    )
}