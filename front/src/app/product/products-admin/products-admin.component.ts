import { Component, OnInit } from "@angular/core";
import { Product } from "../product.model";
import { ProductService } from "../product.service";

@Component({
  selector: "app-products-admin",
  templateUrl: "./products-admin.component.html",
  styleUrls: ["./products-admin.component.scss"],
})
export class ProductsAdminComponent implements OnInit {
  products: Product[] = [];
  product: Product;
  clonedProducts: { [s: string]: Product } = {};
  editing: boolean = false;
  totalRecords: number;
  rows: number = 10;
  page: number;
  selectedProducts: Product[];
  productDialog: boolean;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products["data"];
        this.totalRecords = this.products.length;
      },
      error: (error) => {
        console.error("Error fetching products:", error);
      },
    });
  }

  onRowEditInit(product: Product) {
    this.clonedProducts[product.id] = { ...product };
  }

  onRowEditSave(product: Product) {
    this.productService.updateProduct(product).subscribe({
      next: () => {
        delete this.clonedProducts[product.id];
      },
      error: (error) => {
        console.error("Error updating product:", error);
        const index = this.products.findIndex((item) => product.id === item.id);
        this.products[index] = this.clonedProducts[product.id];
        delete this.clonedProducts[product.id];
      },
    });
  }

  onRowEditCancel(product: Product, index: number) {
    this.products[index] = this.clonedProducts[product.id];
    delete this.clonedProducts[product.id];
  }

  openNew() {
    this.product = {} as Product;
    this.productDialog = true;
  }

  deleteProduct(product: Product) {
    const index = this.products.findIndex((item) => product.id === item.id);
    this.products.splice(index,1); 
    this.productService.deleteProduct(product.id).subscribe({
      next: () => {
      },
      error: (error) => {
        console.error("Error deleting product:", error);
        this.loadProducts();
      },
    });
  }

  deleteSelectedProducts() {
    console.log(this.selectedProducts);
  }

  saveProduct() {
    this.productService.addProduct(this.product).subscribe({
      next: (newProduct) => {
        this.product = {} as Product;
        this.products.push(newProduct) 
        this.productDialog = false;
      },
      error: (error) => {
        console.error("Error saving product:", error);
      },
    });

  }
}
