import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { onInitProcutsAnimate } from 'src/app/shared/animations/animations';
import { OrdersService } from 'src/app/shared/services/orders.service';



window.onscroll = () => {
  window.pageYOffset >= 100
    ? document.body.children[0].children[0].children[0].classList.add('scrolled')
    : document.body.children[0].children[0].children[0].classList.remove('scrolled')
};


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [onInitProcutsAnimate]
})
export class HeaderComponent implements OnInit {
  categories: Array<ICategory>;
  adminStatus: boolean = true;
  totalPayment?: string;
  isShown: boolean = true;



  constructor(private categyService: CategoriesService, private total: OrdersService) { }
  ngOnInit() {
    this.categyService.getJSONcategories().subscribe(
      data => this.categories = data
    )
    this.total.localStorageObserver.subscribe(
      data => {
         (+localStorage.getItem('totalPrice') > 0)
          ? this.totalPayment = localStorage.getItem('totalPrice')
          : this.totalPayment = '0'
          this.isShown = false;
          setTimeout(() => this.isShown = true,50)
      }
    )
  }
}