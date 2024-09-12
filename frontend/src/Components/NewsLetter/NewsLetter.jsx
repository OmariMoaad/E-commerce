import React from "react";
import "./NewsLetter.css";
function NewsLetter() {
  return (
    <div className="newsLetter">
      <h1>NEWSLETTER</h1>
      <p>Subscribe to our newsletter</p>
      <div>
        <input type="text" placeholder="Enter your email" />
        <button>SUBSCRIBE</button>
      </div>
    </div>
  );
}

export default NewsLetter;
