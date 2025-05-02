import { Route, Routes } from "react-router-dom";
import { Register } from "../authentication/registration";
import { Authorized } from "../authentication/authorized";
import { Login } from "../authentication/login";
import { Home } from "../pages/Home";
import { CoolerForm } from "../components/coolerform";
import { DoorForm } from "../components/doorform";
import { useEffect, useState } from "react";
import { getAllTypes } from "../services/TypeServices/types";
import { EditCooler } from "../components/editcooler";
import { LogOut } from "../authentication/logout";

export const ApplicationViews = () => {
  const [token, setToken] = useState({});
  const [types, setTypes] = useState([]);

  useEffect(() => {
    setToken({ token: localStorage.getItem("store_token") });
  }, []);

  useEffect(() => {
    if ("token" in token) {
      // Responsible for fetching all cooler door types
      getAllTypes(token).then((typesArray) => setTypes(typesArray));
    }
  }, [token]);

  return (
    <Routes>
      {/* The authentication routes are available to not authenticated users */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        element={
          <>
            <Authorized setter={setToken} />
            <LogOut setter={setToken}/>
          </>
        }
      >
        {/* If users authenticate, then they may view other site components */}
        <Route path="/" element={<Home token={token} />} />
        <Route path="cooler/:coolerId">
          <Route index element={<CoolerForm token={token} />} />
          <Route
            path="door"
            element={<DoorForm token={token} types={types} />}
          />
          <Route
            path="edit"
            element={<EditCooler token={token} types={types} />}
          />
        </Route>
      </Route>
    </Routes>
  );
};
