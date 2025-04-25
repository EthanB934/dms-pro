import { useRef } from "react"
import { useNavigate } from "react-router-dom"

export const Register = () => {
    const address = useRef()
    const email = useRef()
    const password = useRef()
    const storeName = useRef()
    const storeNumber = useRef()
    const navigate = useNavigate()

    const registerStore = async (event) => {
        event.preventDefault()
        const registrationFormObject = {
            address: address.current.value,
            email: email.current.value,
            password: password.current.value,
            storeName: storeName.current.value,
            storeNumber: storeNumber.current.value
        }
        
        const response = await fetch("http://localhost:8000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(registrationFormObject)
        })

        const storeAsUser = await response.json()
        if (!response.ok) {
            throw new Error("There was an issue registering your account")
        }
        localStorage.setItem("store_token", storeAsUser.token)
        navigate("/")
    }

    return <form className="registration-form" type="submit" onSubmit={registerStore}>
        <h1>Register Store</h1>
        <fieldset className="registration-fields">
            <h3>All fields are required</h3>
            <label>E-mail</label>
            {" "}<input type="text" placeholder="youremail@example.com" ref={email}/>{" "}
            <br />
            <label>Password</label>
            {" "}<input type="password" ref={password}/> {" "}
            <br />
            <label>Store Name</label>
            {" "}<input type="text" ref={storeName}/> {" "}
            <br />
            <label>Store Number</label>
            {" "}<input type="number" min="1" max="9999" ref={storeNumber}/> {" "}
            <br />
            <label>Address</label>
            {" "}<input type="text" ref={address}/> {" "}
            <br/>
            <button className="registration-button" id="register" >Register</button>
        </fieldset>
    </form>
}