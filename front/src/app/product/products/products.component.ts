import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
import { Product } from "../product.model";
import { SelectItem } from "primeng/api";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  totalRecords: number;
  rows: number = 10;
  page: number;
  sortOptions: SelectItem[] = [
    { label: "Price High to Low", value: "!price" },
    { label: "Price Low to High", value: "price" },
  ];
  sortOrder!: number;
  sortField!: string;
  searchText: string = "";

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }


  private loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products["data"];
        this.totalRecords = this.products.length;
        this.filteredProducts = this.products;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }

  onPageChange(event: any): void {
    this.page = event.page + 1;
  }

  onSortChange(event: any) {
    let value = event.value;
    if (value.indexOf("!") === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  applyFilter() {
    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
