import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getStoreCoolers } from "../services/CoolerServices/coolers";
import "./Home.css";
import { CoolerTypes } from "../components/coolertypes";
export const Home = ({ token }) => {
  const [coolers, setCoolers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if ("token" in token) {
      // This useEffect will be responsible for GETting a store's set of coolers
      getStoreCoolers(token).then((coolersArray) => setCoolers(coolersArray));
    }
  }, [token]);

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
                  onClick={() => navigate(`/cooler/${cooler.id}/edit`, {state: {cooler: cooler}})}
                >
                  Edit Cooler
                </button>
                <br />
                <p>Product Types Stocked in Cooler #{index + 1}</p>
                <CoolerTypes selectedTypes={cooler.types} token={token}/>
              </li>
            );
          })}
        </ul>
        {/* Cooler button will navigate user to the cooler creation form */}
        <button
          className="new-cooler"
          id="cooler"
          onClick={() => navigate("cooler")}
        >
          New Cooler
        </button>
      </section>
    </article>
  );
};
