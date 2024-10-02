import React, { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";
const CartItems = () => {
  const { all_product, cartItems, removeFromCart } = useContext(ShopContext);
  return (
    <div className="cart-items">
      <div className="cart-items-main">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      <div>
        {all_product.map((e) => {
          if (cartItems[e.id] > 0) {
            return (
              <div>
                <div className="cart-items-format cart-items-main">
                  <img src={e.image} alt="" className="cart-items-img" />
                  <p>{e.name}</p>
                  <p>${e.new_price}</p>
                  <button className="cart-items-btn">{cartItems[e.id]}</button>
                  <p>${e.new_price * cartItems[e.id]}</p>
                  <img
                    className="cart-items-remove"
                    src={remove_icon}
                    alt=""
                    onClick={() => removeFromCart(e.id)}
                  />
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
        <div className="cart-items-down">
          <div className="cart-items-total">
            <h1>Total</h1>
            <div>
              <div className="cart-items-totalitems">
                <p>Subtotal</p>
                <p>${0}</p>
              </div>
              <hr />
              <div className="cart-items-totalitems">
                <p>Shipping</p>
                <p>free</p>
              </div>
              <hr />
              <div className="cart-items-totalitems">
                <h3>Total</h3>
                <h3>${0}</h3>
              </div>
            </div>
            <button>Checkout</button>
          </div>
          <div className="cart-items-promo">
            <p>Have a promo code?</p>
            <div className="cart-items-promobox">
              <input type="text" placeholder="Enter your code" />
              <button>Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
