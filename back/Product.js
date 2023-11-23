class Product {
  constructor() {
    this.id = undefined;
    this.name = "",
    this.code = "";
    this.description = "description";
    this.price = 150;
    this.quantity = 10;
    this.inventoryStatus = "INSTOCK";
    this.category = "Accessories";
    this.image = "";
    this.rating = 5;
  }
}

module.exports = Product;
