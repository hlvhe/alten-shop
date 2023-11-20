import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { PrimeNGModule } from 'app/shared/utils/primeng/primeng.module';
import { ProductsService } from './products/products.service';


@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    PrimeNGModule
  ],
  exports: [ProductsComponent],
  providers: [ProductsService]
})
export class ProductModule { }
