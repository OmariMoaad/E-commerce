const port = 8000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

//mongodb connection
mongoose.connect(
  "mongodb+srv://omari999moaad:mpViyKETcOkK9kLB@cluster0.4aue3.mongodb.net/e-commerce"
);
//API creation

app.get("/", (req, res) => {
  res.send("Backend server is running");
});

//image storage configuration

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
});
// create upload end for images
app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    message: "File uploaded successfully",
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

//schema for products
const productSchema = mongoose.model("product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

app.post("/addproduct", async (req, res) => {
  let products = await productSchema.find();
  let id;
  if (products.length > 0) {
    let lastProduct = products[products.length - 1];
    id = lastProduct.id + 1;
  } else {
    id = 1;
  }

  const product = new productSchema({
    id: id,
    name: req.body.name,
    image: req.body.image,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
    category: req.body.category,
  });
  console.log(product);
  await product.save();
  console.log("Added");
  res.json({ message: "Product added successfully", name: req.body.name });
});

// deleting product
app.delete("/deleteproduct", async (req, res) => {
  await productSchema.findOneAndDelete({ id: req.body.id });
  res.json({ message: "Product deleted successfully", name: req.body.name });
});

//getting products
app.get("/products", async (req, res) => {
  const products = await productSchema.find();
  console.log("fetched");
  res.json(products);
});

app.listen(port, (error) => {
  if (error) {
    console.log("Error:" + error);
  } else {
    console.log("Backend server is running on port " + port);
  }
});
