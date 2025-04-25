import { Route, Routes } from "react-router-dom"
import { Register } from "../authentication/registration"
import { Authorized } from "../authentication/authorized"
import { Login } from "../authentication/login"
import { Home } from "../pages/Home"
import { CoolerForm } from "../components/coolerform"
import { DoorForm } from "../components/doorform"

export const ApplicationViews = () => {
    return <Routes>
        {/* The authentication routes are available to not authenticated users */}
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route element={<Authorized />}>
        {/* If users authenticate, then they may view other site components */}
            <Route path="/" element={<Home />} />
            <Route path="create">
                <Route index element={<CoolerForm />}/>
                <Route path="door" element={<DoorForm />} />
            </Route> 
        </Route>
    </Routes>
}