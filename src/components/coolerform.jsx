import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDoorsByCoolerId } from "../services/DoorServices/doors";

export const CoolerForm = ({ token }) => {
  const [doors, setDoors] = useState([]);
  const navigate = useNavigate();
  const { coolerId } = useParams();

  useEffect(() => {
    if("token" in token) {
      // Gets all doors associated with the user selected cooler, or new cooler
      getDoorsByCoolerId(coolerId, token).then((doorsArray) =>
        setDoors(doorsArray)
    );
  }
  }, [token]);

  const handleCoolerCreation = () => {
    // This is where the logic to save a cooler to the database will be
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
                  <li key={door.id}>
                    Door {index + 1} <br />
                    Total Shelves {door.shelves} <br />
                    Total Slots {door.slots} <br />
                    Door Type {door.type.name}
                  </li>
                </div>
              );
            })}
          </ul>
        ) : (
          " "
        )}
        {/* Cooler button will navigate user to the cooler creation form */}
        <button className="new-door" id="door" onClick={() => navigate("door")}>
        New Door
        </button>
      </section>
    </article>
  );
};
