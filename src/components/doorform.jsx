import { useRef } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { createDoor } from "../services/DoorServices/doors";
import { Types } from "./types";

export const DoorForm = ({ token }) => {
    const shelves = useRef();
    const slots = useRef();
    const productChoice = useRef();
    const { coolerId } = useParams();
    const navigate = useNavigate();

    const handleCreateDoor = async () => {
        event.preventDefault()
        // Builds a door object to add to a cooler
        const door = {
            shelves: shelves.current.value,
            slots: slots.current.value,
            typeId: productChoice.current.value,
            coolerId: coolerId
        }
        createDoor(door, token).then(() => navigate(`/cooler/${coolerId}`))
    }

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
                <Types  choice={productChoice} token={token}/>
                <br />
                <button className="door" id="door-create">Add Door to Cooler</button>
            </fieldset>
        </form>
    )
}