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
  try {
    let products = await productSchema.find();
    let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

    if (!req.body.image) {
      return res
        .status(400)
        .json({ success: false, message: "Missing image field" });
    }

    const product = new productSchema({
      id: id,
      name: req.body.name,
      image: req.body.image,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
      category: req.body.category,
    });

    await product.save();
    console.log("Added:", product);
    res.json({ success: true, message: "Product added successfully" });
  } catch (err) {
    console.error("Add product error:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
});

// deleting product
app.post("/deleteproduct", async (req, res) => {
  await productSchema.findOneAndDelete({ id: req.body.id });
  res.json({ message: "Product deleted successfully" });
});

//getting products
app.get("/products", async (req, res) => {
  const products = await productSchema.find();
  console.log("fetched");
  res.json(products);
});

// shema creating for users
const userSchema = mongoose.model("user", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
    default: {},
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// creat endpoint for signup
app.post("/signup", async (req, res) => {
  let check = await userSchema.findOne({ email: req.body.email });
  if (check) {
    res.status(400).json({ success: false, message: "User already exists" });
  } else {
    let cart = {};

    const user = new userSchema({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      cartData: cart,
    });
    await user.save();
    const data = {
      user: {
        id: user.id,
      },
    };
    const token = jwt.sign(data, "secret_ecom");
    res.json({ success: true, message: "User created successfully", token });
  }
});

//creating endpoint for user login
app.post("/login", async (req, res) => {
  let check = await userSchema.findOne({ email: req.body.email });
  if (!check) {
    res.status(400).json({ success: false, message: "user not found" });
  } else {
    if (check.password === req.body.password) {
      const data = {
        user: {
          id: check.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({
        success: true,
        message: "User logged in successfully",
        token,
      });
    } else {
      res.status(400).json({ success: false, message: "wrong password" });
    }
  }
});

app.listen(port, (error) => {
  if (error) {
    console.log("Error:" + error);
  } else {
    console.log("Backend server is running on port " + port);
  }
});
