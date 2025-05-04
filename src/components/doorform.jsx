import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { createDoor } from "../services/DoorServices/doors";
import { Types } from "./types";
import { getCoolerById } from "../services/CoolerServices/coolers";
import { CoolerTypes } from "./coolertypes";
import { DoorType } from "./doortype";

export const DoorForm = ({ token }) => {
    const shelves = useRef();
    const slots = useRef();
    const productChoice = useRef();
    const [cooler, setCooler] = useState({})
    const { coolerId } = useParams();
    const navigate = useNavigate();

    const handleCreateDoor = async () => {
        event.preventDefault()
        // Builds a door object to add to a cooler
        const door = {
            shelves: parseInt(shelves.current.value), 
            slots: parseInt(slots.current.value),
            typeId: parseInt(productChoice.current.value),
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
        <form className="door-form" type="submit" onSubmit={handleCreateDoor}>
            <h1>Door Creation</h1>
            <fieldset className="door-fields">
                <label>Shelves</label>
                {" "}<input type="number" min="1" ref={shelves}/>{" "}
                <br />
                <label>Slots</label>
                {" "}<input type="number" min="1" ref={slots}/>{" "}
                <br />
                <DoorType setChoice={productChoice} coolerTypes={cooler.types} token={token}/>
                <br />
                <button className="door" id="door-create">Add Door to Cooler</button>
            </fieldset>
        </form>
    )
}