import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { PizzaComponent } from './pages/pizza/pizza.component';
import { SaladComponent } from './pages/salad/salad.component';
import { DrinksComponent } from './pages/drinks/drinks.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { BasketComponent } from './pages/basket/basket.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';



const routes: Routes = [
  { path: '', redirectTo:'home',pathMatch:'full'},
  { path: 'home',component:HomeComponent},
  { path: 'pizza',component:PizzaComponent},
  { path: 'salad',component:SaladComponent},
  { path: 'drinks',component:DrinksComponent},
  { path: 'payment',component:PaymentComponent},
  { path: 'basket',component:BasketComponent},
  { path: 'admin',component:AdminComponent,children:[
    { path: '', redirectTo:'category',pathMatch:'full'},
    { path: 'category',component:AdminCategoryComponent},
    { path: 'products',component:AdminProductsComponent},
    { path: 'orders',component:AdminOrdersComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
