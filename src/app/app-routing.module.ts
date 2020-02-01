import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { BasketComponent } from './pages/basket/basket.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { PromotionsComponent } from './pages/promotions/promotions.component';
import { AdminPromotionsComponent } from './admin/admin-promotions/admin-promotions.component';
import { PromotionDetailsComponent } from './pages/promotion-details/promotion-details.component';



const routes: Routes = [
  { path: '', redirectTo:'home',pathMatch:'full'},
  { path: 'home',component:HomeComponent},
  { path: 'payment',component:PaymentComponent},
  { path: 'basket',component:BasketComponent},
  { path: 'promotions',component:PromotionsComponent},
  { path: 'promotions/:id',component:PromotionDetailsComponent},
  { path: 'menu/:name',component:ProductsComponent},
  { path: 'menu/:name/:id',component:ProductDetailsComponent},
  { path: 'admin',component:AdminComponent,children:[
    { path: '', redirectTo:'category',pathMatch:'full'},
    { path: 'category',component:AdminCategoryComponent},
    { path: 'products',component:AdminProductsComponent},
    { path: 'orders',component:AdminOrdersComponent},
    { path: 'promotions',component:AdminPromotionsComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
