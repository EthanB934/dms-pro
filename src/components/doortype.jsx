import { useEffect, useState } from "react";
import { getAllTypes } from "../services/TypeServices/types";


export const DoorType = ({ coolerTypes, setChoice, token }) => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    if ("token" in token) {
      // Responsible for fetching all cooler door types
      getAllTypes(token).then((typesArray) => setTypes(typesArray));
    }
  }, [token]);

  return (
    <>
      <h3>Choose this door's type</h3>
      <ul>
        {types.map((type) => {
          if (coolerTypes?.includes(type.id)) {
            return (
              <li className="door-type-choice" key={type.id}>
                <input type="checkbox" value={type.id} onChange={() => setChoice(type.id)} />
                {type.name} <br />
              </li>
            );
          }
        })}
      </ul>
    </>
  );
};
