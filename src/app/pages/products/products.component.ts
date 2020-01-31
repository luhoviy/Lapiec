import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  
})
export class ProductsComponent implements OnInit {
  products:Array<IProduct> = [];
  subscription:Subscription;
  constructor(private productsService:ProductsService,private rout:ActivatedRoute) {
       
  }
  ngOnInit() {
    this.rout.params.subscribe(params => this.productsService.getJSONProducts().subscribe(
      data => this.products = data.filter(elem => elem.categoryName.toLowerCase() === params['name'])
    )
    )
   
  }
  
}