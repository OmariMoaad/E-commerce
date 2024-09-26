import React from 'react'
import './DescriptionBox.css'
const DescriptionBox = () => {
  return (
    <div className="descriptionBox">
      <div className="descriptionBox-nav">
        <div className="descriptionBox-nav-box">Description</div>
        <div className="descriptionBox-nav-box fade">Review (122)</div>
      </div>
      <div className="descriptionBox-description">
        <p>
          An ecommerce website is an online platform where businesses sell
          products or services to customers over the internet. It acts as a
          digital storefront, offering a user-friendly interface for easy
          browsing, a well-organized product catalog with descriptions, images,
          and prices, and a secure payment gateway for safe transactions.
          Additionally, it includes an order management system to handle
          processing and shipping, along with customer service features like
          contact forms or live chat to assist customers.
        </p>
        <p>
          One of the key benefits of an ecommerce website is its ability to
          provide customers with a seamless shopping experience. Customers can
          browse through a wide range of products, including clothing, shoes.
        </p>
      </div>
    </div>
  );
}

export default DescriptionBox