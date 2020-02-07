import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { onInitProcutsAnimate } from 'src/app/shared/animations/animations';
import { OrdersService } from 'src/app/shared/services/orders.service';


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
  

  constructor(private productService:ProductsService,private rout:ActivatedRoute,private total:OrdersService) { }
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

  addOrder(currentPrice:number,name:string,imgUrl:string,id:number,categoryName:string):void{
      if(localStorage.getItem('orders') && localStorage.getItem('orders').indexOf(`${name}`) == -1){

        localStorage.setItem('orders',`${localStorage.getItem('orders') + `,${name}`}`)
      }
      if(!localStorage.getItem('orders')){
         localStorage.setItem('orders',`${name}`)
      } 
      
      localStorage.setItem(`${name}Img`,`${imgUrl}`);
      localStorage.setItem(`${name}ID`,`${id}`);
      localStorage.setItem(`${name}categoryName`,`${categoryName}`);

      localStorage.getItem(`${name}TotalPrice`) 
             ? localStorage.setItem(`${name}TotalPrice`,`${+localStorage.getItem( `${name}TotalPrice`) + currentPrice}`)
             : localStorage.setItem(`${name}TotalPrice`,`${currentPrice}`);

      localStorage.getItem(`${name}Count`) 
             ? localStorage.setItem(`${name}Count`,`${+localStorage.getItem( `${name}Count`) + this.count}`)
             : localStorage.setItem(`${name}Count`,`${this.count}`);
         
      localStorage.setItem('totalPrice',`${+localStorage.getItem('totalPrice') + currentPrice}`);       
      this.count = 1;
     this.total.refreshLocalStorage()
  }
}
