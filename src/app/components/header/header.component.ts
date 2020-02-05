import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { TotalPriceService } from 'src/app/shared/services/total-price.service';
import { onInitProcutsAnimate } from 'src/app/shared/animations/animations';



window.onscroll = () => {
  window.pageYOffset >= 100 
  ? document.body.children[0].children[0].children[0].classList.add('scrolled')
  : document.body.children[0].children[0].children[0].classList.remove('scrolled')  
};


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations:[onInitProcutsAnimate]
})
export class HeaderComponent implements OnInit {
  categories:Array<ICategory>;
  adminStatus:boolean = true;
  totalPayment:number = 0;
  isShown:boolean = false;
  


  constructor(private categyService:CategoriesService, private total:TotalPriceService) { }
  ngOnInit() {
    this.categyService.getJSONcategories().subscribe(
      data => this.categories = data
    )
    this.total.currentPayment.subscribe(paymnet => {
      this.totalPayment = this.totalPayment + paymnet
      this.isShown = false;
      setTimeout(() => this.isShown = true,50)
    });
  }
  
}
