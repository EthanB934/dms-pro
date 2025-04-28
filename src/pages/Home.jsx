import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createCooler } from "../services/CoolerServices/coolers"

export const Home = ({ token }) => {
    const [cooler, setCooler] = useState({})
    const navigate = useNavigate();

    const handleCoolerCreation = () => {
        // I will create a new cooler in the API before the user navigates
        // And store it in state in this module
        createCooler(token).then((coolerObject) => setCooler(coolerObject))
    }
    
    useEffect(() => {
        // Observes cooler state, will be the cooler that the user selected
        if("id" in cooler) {
            // If user is creating a new cooler, they are navigated to it's form
            navigate(`/${cooler.id}`)
        }
    }, [cooler])

    return (
        <article className="home-page">
            <section className="coolers">
                {/* I will map my cooler arrays here */}
                {/* Cooler button will navigate user to the cooler creation form */}
                <button className="new-cooler" id="cooler" onClick={handleCoolerCreation}>New Cooler</button>
            </section>
        </article>
    )
}   