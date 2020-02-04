import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { onInitProcutsAnimate } from 'src/app/shared/animations/animations';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  animations:[onInitProcutsAnimate],
  providers:[{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class ProductDetailsComponent implements OnInit {
  id?:number;
  isShown:boolean = false;
  orderCount:number = 1;
  
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
    setTimeout(() => this.isShown = true,1000);
  }
}
