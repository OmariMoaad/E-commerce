import { React, useState, useEffect } from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png";
const ListProduct = () => {
  const [allproduct, setallproduct] = useState([]);
  const fetchinfo = async () => {
    await fetch("http://localhost:8000/products")
      .then((res) => res.json())
      .then((data) => {
        setallproduct(data);
      });
  };

  useEffect(() => {
    fetchinfo();
  }, []);



const remove_product= async (id) => {
  await fetch('http://localhost:8000/deleteproduct', {
    method: "POST",
    headers: {
      accept: "application/json",
      'content-type': 'application/json'
    },
    body: JSON.stringify({id:id})
  });
    await fetchinfo();
}

  return (
    <div className="list-product">
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproduct.map((product, index) => {
          return (
            <div key={index}>
              <div
                className="listproduct-format-main listproduct-format"
              >
                <img src={product.image} alt="" className="listproduct-img" />
                <p>{product.name}</p>
                <p>${product.old_price}</p>
                <p>${product.new_price}</p>
                <p>{product.category}</p>
                <img
                  onClick={() => remove_product(product.id)}
                  src={cross_icon}
                  alt=""
                  className="listproduct-remove-icon"
                />
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
