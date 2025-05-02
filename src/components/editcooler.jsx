import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDoorsByCoolerId, updateDoor } from "../services/DoorServices/doors";
import { DoorForm } from "./doorform";
import { DeleteModal } from "./deletemodal";

export const EditCooler = ({ token, types }) => {
  const [doors, setDoors] = useState([]);
  const [doorId, setDoorId] = useState(0);
  const [doorToDelete, setDoorToDelete] = useState(null)
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { coolerId } = useParams();
  const shelves = useRef();
  const slots = useRef();
  const productChoice = useRef();

  useEffect(() => {
    handleGetCoolerDoors()
  }, [token]);
  
  const handleGetCoolerDoors = () => {
    if ("token" in token) {
      // Gets all doors associated with the user selected cooler, or new cooler
      getDoorsByCoolerId(coolerId, token).then((doorsArray) =>
        setDoors(doorsArray)
      );
    }
  }
  const handleUpdateCooler = () => {
    const updateCoolerDoorForm = {
      doorId: doorId,
      shelves: parseInt(shelves.current.value),
      slots: parseInt(slots.current.value),
      typeId: parseInt(productChoice.current.value),
      coolerId: parseInt(coolerId),
    };
    updateDoor(updateCoolerDoorForm, token);
  };

  const openDeleteModal = (door) => {
    // Sets the clicked door item as the one the user wishes to delete
    setDoorToDelete(door)
    // Opens the delete modal menu
    setShowModal(true)
  }

  const closeDeleteModal = (door) => {
    // Resets global state variable holding user-clicked door list item
    setDoorToDelete(null)
    // Closes the delete modal menu
    setShowModal(false)
  }

  return (
    <article className="cooler-page">
      <section className="doors">
        {/* I will map my cooler arrays here */}
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
                <button
                  className="door"
                  id="door-delete"
                  onClick={() => {
                    event.preventDefault();
                      openDeleteModal(door);
                  }}
                >
                  Delete Door
                </button>
                {/* When a door list item is clicked, a form to update that door will be rendered */}
                {door.id === doorId ? (
                  <form
                    className="door-form"
                    type="submit"
                    onSubmit={() => {
                      handleUpdateCooler(door.id);
                    }}
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
        {showModal 
        ? <DeleteModal door={doorToDelete} refetcher={handleGetCoolerDoors} showModal={setShowModal} onCancel={closeDeleteModal} token={token}/>
        : ""}
      </section>
    </article>
  );
};
