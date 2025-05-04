import { useEffect, useState } from "react";
import { getAllTypes } from "../services/TypeServices/types";

export const CoolerTypes = ({selectedTypes, token }) => {
  const [allTypes, setAllTypes] = useState();

  useEffect(() => {
    if ("token" in token) {
      getAllTypes(token).then((typesArray) => setAllTypes(typesArray));
    }
  }, [token]);

  return (
    <>
      {allTypes
        ? allTypes.map((type) => {
            if (selectedTypes.includes(type.id)) {
              return <li key={type.id}>{type.name}</li>;
            }
          })
        : " "}
    </>
  );
};
