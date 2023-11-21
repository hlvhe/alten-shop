const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs").promises;
const cors = require("cors");

const app = express();
app.use(cors());
const port = 3000;
const dataFilePath = "products.json";

app.use(bodyParser.json());

let products = [];

// Load products from the local file on server start
loadProductsFromFile();

// Get all products
app.get("/api/products", (req, res) => {
	res.json(products);
});

// Update an existing product
app.put("/api/products", async (req, res) => {
	const updatedProduct = req.body;
	const index = products["data"].findIndex((p) => p.id === updatedProduct.id);
	if (index !== -1) {
		products["data"][index] = updatedProduct;
		try {
			await saveProductsToFile();
			res.json(updatedProduct);
		} catch (error) {
			console.error("Error saving products to file:", error);
		}
	} else {
		res.status(404).json({ error: "Product not found" });
	}
});

async function loadProductsFromFile() {
	try {
		const file = await fs.readFile(dataFilePath, "utf8");
		products = JSON.parse(file);
	} catch (error) {
		// If the file does not exist, create an empty one
		saveProductsToFile();
	}
}

// Save products to the local file
async function saveProductsToFile() {
	const productsJson = JSON.stringify(products, null, 2);
	await fs.writeFile(dataFilePath, productsJson);
}

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});