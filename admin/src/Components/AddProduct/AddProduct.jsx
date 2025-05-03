import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";
import { React, useState } from "react";

const AddProduct = () => {
  const [file, setFile] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    old_price: "",
    new_price: "",
    category: "men",
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleChange = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_Product = async () => {
    let responseData;
    let product = productDetails;
    let formData = new FormData();
    formData.append("product", file);

    await fetch("http://localhost:8000/upload", {
      method: "POST",
      headers: {
        accept: "application/json",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData) {
      product.image = responseData.image_url;
      console.log(product);
    }
    await fetch("http://localhost:8000/addproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((resp) => resp.json())
      .then((data) => {
        data.success ? alert("Product Added") : alert("Product Not Added");
      });
  };
  return (
    <div className="addproduct">
      <div className="addproduct-field">
        <p>Product Name</p>
        <input
          onChange={handleChange}
          value={productDetails.name}
          type="text"
          name="name"
          placeholder="type here"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-field">
          <p>Old Price</p>
          <input
            onChange={handleChange}
            value={productDetails.old_price}
            type="text"
            name="old_price"
            placeholder="type here"
          />
        </div>
        <div className="addproduct-field">
          <p>New Price</p>
          <input
            onChange={handleChange}
            value={productDetails.new_price}
            type="text"
            name="new_price"
            placeholder="type here"
          />
        </div>
      </div>
      <div className="addproduct-field">
        <p>Product Category</p>
        <select
          onChange={handleChange}
          value={productDetails.category}
          name="category"
          className="addproduct-select"
        >
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-field">
        <label htmlFor="file_input">
          <img
            src={file ? URL.createObjectURL(file) : upload_area}
            className="addproduct-upload"
            alt=""
          />
        </label>
        <input
          onChange={handleFileChange}
          type="file"
          name="image"
          id="file_input"
          hidden
        />
      </div>
      <button onClick={Add_Product} className="addproduct-btn">Add Product</button>
    </div>
  );
};

export default AddProduct;
