import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Types } from "./types";
import { createCooler } from "../services/CoolerServices/coolers";
import { CoolerTypes } from "./coolertypes";

export const CoolerForm = ({ token }) => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const navigate = useNavigate();

  const handleCoolerType = (event) => {
    const typeId = parseInt(event.target.value)
    setSelectedTypes([...selectedTypes, typeId]);
  }

  const handleCoolerCreation = () => {
    // I will create a new cooler in the API before the user navigates
    // And store it in state in this module
    const cooler = {
      types: selectedTypes
    }
    createCooler(cooler, token).then((coolerObj) => navigate(`${coolerObj.id}/door`));
  };
          
  return (
    <article className="cooler-page">
      <section className="doors">
      <Types choices={selectedTypes} setChoices={handleCoolerType} token={token}/>
        <br />
        <h2>Selected Types</h2>
        <CoolerTypes selectedTypes={selectedTypes} token={token}/>
        <br /> 
        {/* Cooler button will navigate user to the cooler creation form */}
        <button className="new-door" id="door" onClick={handleCoolerCreation}>
        Create Cooler
        </button>
      </section>
    </article>
  );
};
