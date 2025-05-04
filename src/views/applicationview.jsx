import { Route, Routes, useLocation } from "react-router-dom";
import { Register } from "../authentication/registration";
import { Authorized } from "../authentication/authorized";
import { Login } from "../authentication/login";
import { Home } from "../pages/Home";
import { CoolerForm } from "../components/coolerform";
import { DoorForm } from "../components/doorform";
import { useEffect, useState } from "react";
import { EditCooler } from "../components/editcooler";
import { LogOut } from "../authentication/logout";
import { BackToHome } from "../components/backtohome";
import { CoolerDoorList } from "../components/coolerdoorlist";

export const ApplicationViews = () => {
  const location = useLocation();
  const [token, setToken] = useState({});

  useEffect(() => {
    setToken({ token: localStorage.getItem("store_token") });
  }, []);

  return (
    <Routes>
      {/* The authentication routes are available to not authenticated users */}
      <Route path="/register" element={<Register setter={setToken} />} />
      <Route path="/login" element={<Login setter={setToken} />} />
      <Route
        element={
          <>
            <Authorized setter={setToken} />
            <LogOut setter={setToken} />
            {location.pathname !== "/" ? <BackToHome /> : ""}
          </>
        }
      >
        {/* If users authenticate, then they may view other site components */}
        <Route path="/" element={<Home token={token} />} />
        <Route path="cooler">
          <Route index element={<CoolerForm token={token} />} />
          <Route path=":coolerId" element={<CoolerDoorList token={token} />} />
          <Route path=":coolerId/door" element={<DoorForm token={token} />} />
          <Route path=":coolerId/edit" element={<EditCooler token={token} />} />
        </Route>
      </Route>
    </Routes>
  );
};
