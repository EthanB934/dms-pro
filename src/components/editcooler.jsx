import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getDoorsByCoolerId, updateDoor } from "../services/DoorServices/doors";
import { DeleteModal } from "./deletemodal";
import { DoorType } from "./doortype";

export const EditCooler = ({ token }) => {
  const [cooler, setCooler] = useState({});
  const [doors, setDoors] = useState([]);
  const [doorId, setDoorId] = useState(0);
  const [doorToDelete, setDoorToDelete] = useState(null)
  const [showModal, setShowModal] = useState(false);
  const [typeId, setTypeId] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const shelves = useRef();
  const slots = useRef();
  

  useEffect(() => {
    if(location.state) {
      setCooler(location.state.cooler)
    }
  }, [location])

  useEffect(() => {
    if("id" in cooler)
    handleGetCoolerDoors()
  }, [token, cooler]);
  
  const handleGetCoolerDoors = () => {
    if ("token" in token) {
      // Gets all doors associated with the user selected cooler, or new cooler
      getDoorsByCoolerId(cooler.id, token).then((doorsArray) =>
        setDoors(doorsArray)
      );
    }
  }
  const handleUpdateCooler = () => {
    event.preventDefault()
    const updateCoolerDoorForm = {
      doorId: doorId,
      shelves: parseInt(shelves.current.value),
      slots: parseInt(slots.current.value),
      typeId: parseInt(typeId),
      coolerId: parseInt(cooler.id),
    };
    updateDoor(updateCoolerDoorForm, token).then(handleGetCoolerDoors);
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
                      <label>Shelves</label>{" "}
                      <input type="number" min="1" ref={shelves} /> <br />
                      <label>Slots</label>{" "}
                      <input type="number" min="1" ref={slots} /> <br />
                      <DoorType setChoice={setTypeId} coolerTypes={cooler.types} token={token}/>
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
