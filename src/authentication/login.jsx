import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const loginUser = async (event) => {
    // Prevent refresh on form submission
    event.preventDefault()

    // Create object to send to server
    const loginFormObject = {
        email: email.current.value,
        password: password.current.value
    }

    // Makes POST request to API to retrieve user data
    const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginFormObject)
    })

    // Serialize response into JavaScript usable data
    const storeAsUser = await response.json()
    
    if (!response.ok) {
        throw new Error("There was an issue registering your account")
    }
    localStorage.setItem("store_token", storeAsUser.token)
    navigate("/")
}

  return (
    <form className="login-form" type="submit" onSubmit={loginUser}>
      <h1>Login</h1>
      <fieldset className="login-fields">
        <h3>All fields are required</h3>
        <label>E-mail</label>{" "}  
        <input type="text" placeholder="youremail@example.com" ref={email} />{" "}
        <br />
        <label>Password</label> <input type="password" ref={password} />{" "}
        <br />
        New Member? <Link to="/register">Register here!</Link>
        <br/>
        <button className="login-button" id="login">Login</button>
      </fieldset>
    </form>
  );
};
