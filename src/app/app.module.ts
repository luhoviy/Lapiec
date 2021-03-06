import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule } from 'ngx-mask'

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { BasketComponent } from './pages/basket/basket.component';
import { InterfacesComponent } from './shared/interfaces/interfaces.component';
import { ClassesComponent } from './shared/classes/classes.component';
import { PipesComponent } from './shared/pipes/pipes.component';
import { ServicesComponent } from './shared/services/services.component';
import { DirectivesComponent } from './shared/directives/directives.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { SearchPipe } from './shared/pipes/search.pipe';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FilterAdminProductsPipe } from './shared/pipes/filter-admin-products.pipe';
import { CurrencyPipe } from './shared/pipes/currency.pipe';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { PromotionsComponent } from './pages/promotions/promotions.component';
import { AdminPromotionsComponent } from './admin/admin-promotions/admin-promotions.component';
import { PromotionDetailsComponent } from './pages/promotion-details/promotion-details.component';
import { NgxUiLoaderModule,NgxUiLoaderRouterModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';
import { ngxUiLoaderConfig } from './preloading-config';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { MonthPipe } from './shared/pipes/month.pipe';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PaymentComponent,
    BasketComponent,
    InterfacesComponent,
    ClassesComponent,
    PipesComponent,
    ServicesComponent,
    DirectivesComponent,
    AdminComponent,
    AdminCategoryComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    SearchPipe,
    FilterAdminProductsPipe,
    CurrencyPipe,
    ProductsComponent,
    ProductDetailsComponent,
    PromotionsComponent,
    AdminPromotionsComponent,
    PromotionDetailsComponent,
    MonthPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase, 'pizzeria'), 
    AngularFireAnalyticsModule, 
    AngularFirestoreModule,
    AngularFireAuthModule, 
    AngularFireStorageModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule.forRoot({exclude:['/admin/products','/admin/category','/admin/orders','/admin/promotions']}),
    CarouselModule.forRoot(),
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ],
  providers: [ProductDetailsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
