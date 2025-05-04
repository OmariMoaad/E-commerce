import React, { useState } from "react";
import "./LoginSignup.css";
const LoginSignup = () => {


const [state, setState] = useState("Login");
 





  return (
    <div className="login-signup">
      <div className="loginSignUp-container">
        <h1>{state}</h1>
        <div className="loginSingUp-fields">
          {state === "Sign Up" ? (
            <input type="text" placeholder="Your Name" />
          ) : null}
          <input type="email" placeholder="Your Email" />
          <input type="password" placeholder="Password" />
        </div>
        <button>Submit</button>
        <p className="loginSignUp-login">
          Already have an account? <span>Login here</span>
        </p>
        <p className="loginSignUp-login">
          Creat an account? <span>Click here</span>
        </p>
        <div className="loginSignUp-agree">
          <input type="checkbox" name="" id="" />
          <p>
            By continuing, I agree to the <span>Terms of Service</span> &{" "}
            <span>Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
