import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createCooler,
  getStoreCoolers,
} from "../services/CoolerServices/coolers";
import "./Home.css";
export const Home = ({ token }) => {
  const [coolers, setCoolers] = useState([]);
  const [cooler, setCooler] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if ("token" in token) {
      // This useEffect will be responsible for GETting a store's set of coolers
      getStoreCoolers(token).then((coolersArray) => setCoolers(coolersArray));
    }
  }, [token]);

  const handleCoolerCreation = () => {
    // I will create a new cooler in the API before the user navigates
    // And store it in state in this module
    createCooler(token).then((coolerObject) => setCooler(coolerObject));
  };

  const handleCoolerEdit = (event) => {
    // Handles navigating the user to the cooler's door list.
    // The event captures the id of each cooler list item
    const selectedCoolerId = parseInt(event.target.id);
    // navigates the user to the cooler door list view to edit each door
    navigate(`cooler/${selectedCoolerId}/edit`);
  };

  useEffect(() => {
    // Observes cooler state, will be the cooler that the user selected
    if ("id" in cooler) {
      // If user is creating a new cooler, they are navigated to it's form
      navigate(`cooler/${cooler.id}`);
    }
  }, [cooler]);

  return (
    <article className="home-page">
      <section className="coolers">
        {/* I will map my cooler arrays here */}
        <ul>
          {coolers.map((cooler, index) => {
            return (
              <li key={cooler.id}>
                <Link to={`cooler/${cooler.id}`}>Cooler #{index + 1}</Link> |{" "}
                Total Capacity {cooler.total_capacity.toLocaleString("en")}{" "}
                units
                <button
                  className="cooler-edit"
                  id={cooler.id}
                  onClick={handleCoolerEdit}
                >
                  Edit Cooler
                </button>
                <br />
                <ul className="types-list">
                  {cooler.cooler_types.map((type) => {
                    return (
                      <li className="type" key={type.id}>
                        {" "}
                        {type.name}{" "}
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
        {/* Cooler button will navigate user to the cooler creation form */}
        <button
          className="new-cooler"
          id="cooler"
          onClick={handleCoolerCreation}
        >
          New Cooler
        </button>
      </section>
    </article>
  );
};
