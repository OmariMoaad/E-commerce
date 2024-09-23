import React from "react";
import "./LoginSignup.css";
const LoginSignup = () => {
  return (
    <div className="login-signup">
      <div className="loginSignUp-container">
        <h1>Sign Up</h1>
        <div className="loginSingUp-fields">
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <input type="password" placeholder="Password" />
        </div>
        <button>Submit</button>
        <p className="loginSignUp-login">
          Already have an account? <span>Login</span>
        </p>
        <div className="loginSignUp-agree">
          <input type="checkbox" name="" id="" />
          <p>
            By continuing, I agree to the <span>Terms of Service</span> & <span>Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
