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

    const handleDoorTypeSelection = (event) => {
    // Selects all checkboxes it document. We will iterate through modifying their properties
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    if (event.target.checked) {
      // Retrieves the id of the selected checkbox
      const checkBoxId = parseInt(event.target.id);
      // Stores the checkBox's unique id in state
      setTypeId(checkBoxId);
      // Disables all other checkboxes that were not chosen
      checkboxes.forEach((checkbox) => {
        if (checkbox.id !== event.target.id) {
          checkbox.disabled = true;
        }
      });
    } else {
      // If the chosen checkbox is unchecked
      // Resets the chosen type to default value
      setTypeId(0);
      // Reenables all checkboxes again.
      checkboxes.forEach((checkbox) => {
        checkbox.disabled = false;
      });
    }
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
                <DoorType setChoice={handleDoorTypeSelection} choice={typeId} coolerTypes={cooler.types} token={token}/>
                <br />
                <button className="door-create">Add Door to Cooler</button>
            </fieldset>
        </form>
        </article>
    )
}