import { createContext, useEffect, useState } from "react";

export const ShopContext = createContext();
const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i < 300 + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};
const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [all_product, setAll_Product] = useState([]);

useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/products");
        const data = await res.json();
        setAll_Product(data);
      } catch (err) {
        console.error("Error fetching new collection:", err);
      }
    };

    fetchData();
  }, []);


  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        total += cartItems[item] * itemInfo.new_price;
      }
    }
    return total;
  };

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item];
      }
    }
    return totalItems;
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
