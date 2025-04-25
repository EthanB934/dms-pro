import { Route, Routes } from "react-router-dom"
import { Register } from "../authentication/registration"
import { Authorized } from "../authentication/authorized"
import { Login } from "../authentication/login"

export const ApplicationViews = () => {
    return <Routes>
        {/* The authentication routes are available to not authenticated users */}
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route element={<Authorized />}>
        {/* If users authenticate, then they may view other site components */}
            <Route path="/" element={<>This is the first authorized component</>} />
        </Route>
    </Routes>
}