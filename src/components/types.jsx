import { useEffect, useState } from "react";
import { getAllTypes } from "../services/TypeServices/types";

export const Types = ({ token, choice, setChoices, choices }) => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    if ("token" in token) {
      // Responsible for fetching all cooler door types
      getAllTypes(token).then((typesArray) => setTypes(typesArray));
    }
  }, [token]);

  return (
    <select ref={choice} onChange={setChoices}>
      <option>Select Product</option>
      {types.map((type) => {
        if(choices?.includes(type.id)) {
          return;
        }
        return (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        );
      })}
    </select>
  );
};
