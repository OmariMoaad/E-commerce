import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";
import { React, useState } from "react";

const AddProduct = () => {
  const [file, setFile] = useState(null);
  const [product, setProduct] = useState({
    name: "",
    old_price: "",
    new_price: "",
    category: "men",
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log(product);
  }
  return (
    <div className="addproduct">
      <div className="addproduct-field">
        <p>Product Name</p>
        <input
          onChange={handleChange}
          value={product.name}
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
            value={product.old_price}
            type="text"
            name="old_price"
            placeholder="type here"
          />
        </div>
        <div className="addproduct-field">
          <p>New Price</p>
          <input
            onChange={handleChange}
            value={product.new_price}
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
          value={product.category}
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
      <button onClick={handleSubmit} className="addproduct-btn">Add Product</button>
    </div>
  );
};

export default AddProduct;
