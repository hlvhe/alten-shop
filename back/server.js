const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const Product = require("./Product");

const app = express();
app.use(cors());
const port = 3000;

mongoose.connect(
	"mongodb+srv://user-cluster-0:UySwpfgkzdCjfrkb@cluster0.e0eoema.mongodb.net/alten-shop-products?retryWrites=true&w=majority",
	{}
);

app.use(bodyParser.json());

const productSchema = new mongoose.Schema(
	{
		code: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
		inventoryStatus: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		image: {
			type: String,
		},
		rating: {
			type: Number,
		},
		rating: Number,
	},
	{
		toJSON: {
			transform: function (doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.__v;
			},
		},
	}
);

const ProductModel = mongoose.model("Product", productSchema);

// Get all products
app.get("/api/products", async (req, res) => {
	try {
		const products = await ProductModel.find();
		res.json({ data: products });
	} catch (error) {
		console.error("Error fetching products:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

// Update an existing product
app.patch("/api/products/:id", async (req, res) => {
	try {
		const updatedProduct = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		res.json(updatedProduct);
	} catch (error) {
		console.error("Error updating product:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

// Delete a product
app.delete("/api/products/:id", async (req, res) => {
	try {
		await ProductModel.findByIdAndDelete(req.params.id);
		res.json({ message: "Product deleted successfully" });
	} catch (error) {
		console.error("Error deleting product:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

// Add a new product
app.post("/api/products", async (req, res) => {
	try {
		let newProduct = new Product();
		newProduct = { ...newProduct, ...req.body };
		newProduct = await ProductModel.create(newProduct);
		res.json(newProduct);
	} catch (error) {
		console.error("Error adding product:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
