import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { createDoor } from "../../services/DoorServices/doors";
import { getCoolerById } from "../../services/CoolerServices/coolers";
import { DoorType } from "../type/doortype";
import "./door.css"
export const DoorForm = ({ token }) => {
    const shelves = useRef();
    const slots = useRef();
    const [typeId, setTypeId] = useState(0)
    const [cooler, setCooler] = useState({})
    const { coolerId } = useParams();
    const navigate = useNavigate();

    const handleCreateDoor = async () => {
        event.preventDefault()
        // Builds a door object to add to a cooler
        const door = {
            shelves: parseInt(shelves.current.value), 
            slots: parseInt(slots.current.value),
            typeId: parseInt(typeId),
            coolerId: parseInt(coolerId)
        }
        createDoor(door, token).then(() => navigate(`/cooler/${coolerId}`))
    }

    useEffect(() => {
        if("token" in token) {
            getCoolerById(coolerId, token).then((coolerObject) => setCooler(coolerObject))
        }
    }, [token])     
    return (
        <article className="door-article">
        <form className="door-form" type="submit" onSubmit={handleCreateDoor}>
            <h1>Door Creation</h1>
            <fieldset className="door-fields">
                <label>Shelves</label>
                {" "}<input type="number" min="1" ref={shelves}/>{" "}
                <br />
                <label>Slots</label>
                {" "}<input type="number" min="1" ref={slots}/>{" "}
                <br />
                <DoorType setChoice={setTypeId} coolerTypes={cooler.types} token={token}/>
                <br />
                <button className="door-create">Add Door to Cooler</button>
            </fieldset>
        </form>
        </article>
    )
}