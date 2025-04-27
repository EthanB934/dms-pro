import { useRef } from "react"

export const DoorForm = ({ types }) => {
    const shelves = useRef();
    const slots = useRef();
    const productChoice = useRef();

    const handleCreateDoor = async () => {
        event.preventDefault()
        // This is where the logic to send a request to the API will be built
    }

    return (
        <form className="door-form" type="submit" onClick={handleCreateDoor}>
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