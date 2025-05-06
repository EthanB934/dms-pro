import { Authorized } from "../components/authentication/authorized";
import { BackToHome } from "../components/backtohome";
import { CoolerDoorList } from "../components/door/coolerdoorlist";
import { CoolerForm } from "../components/cooler/coolerform";
import { DoorForm } from "../components/door/doorform";
import { EditCooler } from "../components/cooler/editcooler";
import { Home } from "../pages/Home";
import { Login } from "../components/authentication/login";
import { LogOut } from "../components/authentication/logout";
import { Register } from "../components/authentication/registration";
import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

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
            <LogOut setter={setToken} />
            {location.pathname !== "/" ? <BackToHome /> : ""}
            <Authorized setter={setToken} />
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
