import { useRef } from "react";
import { Link } from "react-router-dom";

export const Login = () => {
  const email = useRef();
  const password = useRef();

  return (
    <form className="login-form">
      <h1>Login</h1>
      <fieldset className="login-fields">
        <h3>All fields are required</h3>
        <label>E-mail</label>{" "}  
        <input type="text" placeholder="youremail@example.com" ref={email} />{" "}
        <br />
        <label>Password</label> <input type="password" ref={password} />{" "}
        <br />
        New Member? <Link to="/register">Register here!</Link>
      </fieldset>
    </form>
  );
};
