import { useRef } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { createDoor } from "../services/DoorServices/doors";

export const DoorForm = ({ types, token }) => {
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
        createDoor(door, token).then(() => navigate(`/${coolerId}`))
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
                <select ref={productChoice}>
                    <option>Select Product</option>
                    {types.map((type) => {
                        return <option key={type.id} value={type.id}>{type.name}</option>
                    })}
                </select>
                <br />
                <button className="door" id="door-create">Add Door to Cooler</button>
            </fieldset>
        </form>
    )
}