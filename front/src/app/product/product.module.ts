import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { PrimeNGModule } from 'app/shared/utils/primeng/primeng.module';
import { ProductService } from './product.service';
import { ProductsAdminComponent } from './products-admin/products-admin.component';


@NgModule({
  declarations: [ProductsComponent, ProductsAdminComponent],
  imports: [
    CommonModule,
    PrimeNGModule,
  ],
  exports: [ProductsComponent, ProductsAdminComponent],
  providers: [ProductService]
})
export class ProductModule { }
