import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError } from "rxjs";
import { Product } from "./product.model";

@Injectable()
export class ProductService {
  private apiUrl = "http://localhost:3000/api/products";

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching products:', error);
        throw error
      })
    );
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/${product.id}`, product).pipe(
      catchError((error) => {
        console.error('Error updating product:', error);
        throw error;
      }))
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product).pipe(
      catchError((error) => {
        console.error('Error updating product:', error);
        throw error;
      }));
  }

  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${productId}`).pipe(
      catchError((error) => {
        console.error('Error updating product:', error);
        throw error;
      }));
  }
}
