import { useNavigate } from "react-router-dom"

export const Home = () => {
    const navigate = useNavigate();
    return (
        <article className="home-page">
            <section className="coolers">
                {/* I will map my cooler arrays here */}
                {/* Cooler button will navigate user to the cooler creation form */}
                <button className="new-cooler" id="cooler" onClick={() => navigate("/create")}>New Cooler</button>
            </section>
        </article>
    )
}   