import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.scss']
})
export class ProductsAdminComponent implements OnInit {
  products: Product[] = [];
  clonedProducts: { [s: string]: Product } = {};
  editing: boolean = false;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products["data"];
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }

  onRowEditInit(product: Product) {
    this.clonedProducts[product.id] = { ...product };
  }

  onRowEditSave(product: Product) {
      // Update the product in your backend or service
      this.productService.updateProduct(product).subscribe({
        next: () => {
          delete this.clonedProducts[product.id];
        },
        error: (error) => {
          console.error('Error updating product:', error);
          const index = this.products.findIndex(item => product.id === item.id);
          this.products[index] = this.clonedProducts[product.id];
          delete this.clonedProducts[product.id];
        }
      }
    );
  }
  
  onRowEditCancel(product: Product, index: number) {
    this.products[index] = this.clonedProducts[product.id];
    delete this.clonedProducts[product.id];
  }
}
