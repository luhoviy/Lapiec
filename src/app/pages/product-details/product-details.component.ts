import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { onInitProcutsAnimate } from 'src/app/shared/animations/animations';
import { TotalPriceService } from 'src/app/shared/services/total-price.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  animations:[onInitProcutsAnimate],
  providers:[{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } } ]
})


export class ProductDetailsComponent implements OnInit {
  productDetails?:IProduct;
  id?:number;
  isShown:boolean = false;
  count:number = 1;
  

  constructor(private productService:ProductsService,private rout:ActivatedRoute,private total:TotalPriceService) { }
  ngOnInit() {
    this.getProductDetails();
  }


  correctCountInput():void{
    this.count < 1 ? this.count = 1 : null
  }
  
  decrease():void{
    this.count > 1 ? this.count-- : null 
  }

  getProductDetails():void{
    this.id = +this.rout.snapshot.paramMap.get('id');
    this.productService.getProductDetails(this.id).subscribe(
      data => this.productDetails = data
    )
    setTimeout(() => this.isShown = true,1000);
  }

  addOrder(currentPrice:number):void{
      this.total.changeTotalPayment(currentPrice);
      this.count = 1;
  }
}
