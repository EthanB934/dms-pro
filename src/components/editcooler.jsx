import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDoorsByCoolerId, updateDoor } from "../services/DoorServices/doors";
import { DoorForm } from "./doorform";

export const EditCooler = ({ token, types }) => {
  const [doors, setDoors] = useState([]);
  const [doorId, setDoorId] = useState(0);
  const navigate = useNavigate();
  const { coolerId } = useParams();
  const shelves = useRef();
  const slots = useRef();
  const productChoice = useRef();

  useEffect(() => {
    if ("token" in token) {
      // Gets all doors associated with the user selected cooler, or new cooler
      getDoorsByCoolerId(coolerId, token).then((doorsArray) =>
        setDoors(doorsArray)
      );
    }
  }, [token]);

  const handleUpdateCooler = () => {
    const updateCoolerDoorForm = {
      doorId: doorId,
      shelves: parseInt(shelves.current.value),
      slots: parseInt(slots.current.value),
      typeId: parseInt(productChoice.current.value),
      coolerId: parseInt(coolerId)
    }
    updateDoor(updateCoolerDoorForm, token)
  };

  return (
    <article className="cooler-page">
      <section className="doors">
        {/* I will map my cooler arrays here */}
        {doors.length !== 0 ? (
          <ul className="doors-list">
            {doors.map((door, index) => {
              return (
                <div className="door" key={door.id}>
                  <li key={door.id} onClick={() => setDoorId(door.id)}>
                    Door {index + 1} <br />
                    Total Shelves {door.shelves} <br />
                    Total Slots {door.slots} <br />
                    Door Type {door.type.name}
                  </li>
                  {/* When a door list item is clicked, a form to update that door will be rendered */}
                  {door.id === doorId ? (
                    <form
                      className="door-form"
                      type="submit"
                      onSubmit={() => {handleUpdateCooler(door.id)}}
                    >
                      <fieldset className="door-fields">
                        <h1>Door #{door.id}</h1>
                        <label>Shelves</label>{" "}
                        <input type="number" min="1" ref={shelves} /> <br />
                        <label>Slots</label>{" "}
                        <input type="number" min="1" ref={slots} /> <br />
                        <select ref={productChoice}>
                          <option>Select Product</option>
                          {types.map((type) => {
                            return (
                              <option key={type.id} value={type.id}>
                                {type.name}
                              </option>
                            );
                          })}
                        </select>
                        <br />
                        <button className="door" id="door-create">
                          Update Cooler Door
                        </button>
                      </fieldset>
                    </form>
                  ) : (
                    " "
                  )}
                </div>
              );
            })}
          </ul>
        ) : (
          " "
        )}
      </section>
    </article>
  );
};
