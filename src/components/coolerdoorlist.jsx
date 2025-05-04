import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDoorsByCoolerId } from "../services/DoorServices/doors";

export const CoolerDoorList = ({ token }) => {
  const [doors, setDoors] = useState([]);
  const { coolerId } = useParams();

  useEffect(() => {
    if ("token" in token) {
      // Gets all doors associated with the user selected cooler, or new cooler
      getDoorsByCoolerId(coolerId, token).then((doorsArray) =>
        setDoors(doorsArray)
      );
    }
  }, [token]);

  return (
    <article>
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
    </article>
  );
};
