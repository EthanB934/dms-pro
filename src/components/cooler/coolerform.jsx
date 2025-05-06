import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Types } from "../type/types";
import { createCooler } from "../../services/CoolerServices/coolers";
import { CoolerTypes } from "../type/coolertypes";
import "./cooler.css"

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
    <article className="cooler-page-create">
      <section className="cooler-create">
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
