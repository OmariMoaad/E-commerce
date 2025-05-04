import React, { useState } from "react";
import "./LoginSignup.css";
const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

const changeHandler = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
}

const login = async () => {
  console.log("login",formData);
  let responseData;
  await fetch("http://localhost:8000/login", {
    method: "POST",
    headers: {
      Accept: "application/form-data",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      responseData = data;
    });
  if (responseData.success) {
    localStorage.setItem("aut-token", responseData.token);
    window.location.replace("http://localhost:3000/");
  } else {
    alert(responseData.message);
  }
}
const signup = async () => {
  console.log("signup",formData);
  let responseData;
  await fetch("http://localhost:8000/signup", {
    method: "POST",
    headers: {
      Accept:"application/form-data",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }).then((response) => response.json()).then((data) => {
    responseData = data;
  })
  if(responseData.success){
    localStorage.setItem("aut-token",responseData.token);
    window.location.replace("http://localhost:3000/");
  }
  else{
    alert(responseData.message);
  }
}



  return (
    <div className="login-signup">
      <div className="loginSignUp-container">
        <h1>{state}</h1>
        <div className="loginSingUp-fields">
          {state === "Sign Up" ? (
            <input name="name" value={formData.username} onChange={changeHandler} type="text" placeholder="Your Name" />
          ) : null}
          <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder="Your Email" />
          <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder="Password" />
        </div>
        <button onClick={state === "Login" ? login : signup}>Submit</button>
        {state === "Login" ? (
          <p className="loginSignUp-login">
            Don't have an account?{" "}
            <span onClick={() => setState("Sign Up")}>Sign Up</span>
          </p>
        ) : (
          <p className="loginSignUp-login">
            Already have an account?{" "}
            <span onClick={() => setState("Login")}>Login</span>
          </p>
        )}

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
