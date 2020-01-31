import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  providers:[{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class ProductDetailsComponent implements OnInit {
  id?:number;
  productDetails?:IProduct;

  constructor(private productService:ProductsService,private rout:ActivatedRoute) { }
  ngOnInit() {
    this.getProductDetails();
  }


  getProductDetails():void{
    this.id = +this.rout.snapshot.paramMap.get('id');
    this.productService.getProductDetails(this.id).subscribe(
      data => this.productDetails = data
    )
  }



}
