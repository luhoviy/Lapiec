import { Component, OnInit, TemplateRef } from '@angular/core';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { onInitBasketAnimate } from 'src/app/shared/animations/animations';
import { Order } from 'src/app/shared/classes/order.model';
import { IOrder } from 'src/app/shared/interfaces/order.interface';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
  animations: [onInitBasketAnimate]
})
export class BasketComponent implements OnInit {
  orderNames?: Array<string> = [];
  orderList: Array<Object> = [];
  orderListJson:Array<IOrder> = [];
  totalPaymnet: string;
  hasOrders: boolean;
  modalRef: BsModalRef;
  currentOrderName: string;
  currentOrderPrice: string;
  currentOrder: Object;
  isShown: boolean = false;
  showEmptyBasket: boolean = true;
  fName:string;
  phone:number;
  city:string;
  street:string;
  house:string;
  comment?:string;
  orderCompleted:boolean;
  callBack:boolean;
  funnyCat:boolean = false;


  constructor(private orderService: OrdersService, private modalService: BsModalService) { }

  ngOnInit() {

    this.orderService.getOrderList().subscribe(
      data => this.orderListJson = data
    )
    

    if(localStorage.getItem('userName')){
      this.fName = localStorage.getItem('userName');
      this.phone = parseInt(localStorage.getItem('userPhone'));
      this.city = localStorage.getItem('userCity');
      this.street = localStorage.getItem('userStreet');
      this.house = localStorage.getItem('userHouse');
    }

    localStorage.getItem('orders')
      ? this.hasOrders = true
      : this.hasOrders = false;
    if (localStorage.getItem('orders')) {
      this.orderService.localStorageObserver.subscribe(
        data => this.getLocalStorageOrders()
      )
      setTimeout(() => this.isShown = true, 1000)
    } else {
      setTimeout(() => this.showEmptyBasket = false, 1000)
    }
  }

  pushOrder():void{
    const order:IOrder = new Order(
      1,
      this.fName,
      `0${this.phone}`,
      this.city,
      this.street,
      this.house,
      this.orderList,
      this.totalPaymnet,
      this.comment
    )

   if(this.orderListJson.length != 0){
     order.id = this.orderListJson.length+1;
   } 
  
  
   
   this.orderService.addOrder(order).subscribe(
     data => { 
       this.orderList = [];
       this.hasOrders = false;
       localStorage.clear();
       this.orderService.refreshLocalStorage();
       localStorage.setItem('userName',this.fName)
       localStorage.setItem('userCity',this.city)
       localStorage.setItem('userStreet',this.street)
       localStorage.setItem('userHouse',this.house)
       localStorage.setItem('userPhone',`${this.phone}`);
      }
    )
    
    setTimeout(() => this.orderCompleted = true, 1000)
    setTimeout(() => this.callBack = true, 2500)
    setTimeout(() => {this.callBack = false; this.orderCompleted = false}, 5500)
    setTimeout(() => this.showEmptyBasket = false, 6500)
  }


  getLocalStorageOrders(): void {
    this.orderList = [];

    if(localStorage.getItem('orders')){
    localStorage.getItem('orders').split(',').forEach(
      elem => this.orderList.push({
        name: elem,
        img: localStorage.getItem(`${elem}Img`),
        price: +localStorage.getItem(`${elem}TotalPrice`) / +localStorage.getItem(`${elem}Count`),
        count: localStorage.getItem(`${elem}Count`),
        totalPrice: localStorage.getItem(`${elem}TotalPrice`),
        id: localStorage.getItem(`${elem}ID`),
        categoryName: localStorage.getItem(`${elem}categoryName`),
      })
    )
  }
  

    this.totalPaymnet = localStorage.getItem('totalPrice');
  }

  decreaseCount(name: string, count: string, price: string): void {
    if (+count > 1) {

      localStorage.setItem(`${name}Count`, `${+count - 1}`);
      localStorage.setItem(`${name}TotalPrice`, `${(+count - 1) * +price}`);
      localStorage.setItem('totalPrice', `${+localStorage.getItem('totalPrice') - +price}`)
      this.orderService.refreshLocalStorage()
    }
  }
  increaseCount(name: string, count: string, price: string): void {
    localStorage.setItem(`${name}Count`, `${+count + 1}`);
    localStorage.setItem(`${name}TotalPrice`, `${(+count + 1) * +price}`);
    localStorage.setItem('totalPrice', `${+localStorage.getItem('totalPrice') + +price}`)
    this.orderService.refreshLocalStorage()

  }

  deleteOrder(name: string, totalPrice: string, order: Object) {
    localStorage.setItem('totalPrice', `${+this.totalPaymnet - +totalPrice}`);
    if (this.orderList[0] === order && this.orderList.length != 1) {
      localStorage.setItem('orders', `${localStorage.getItem('orders').replace(`${name},`, '')}`)
    } else if (this.orderList[0] === order && this.orderList.length == 1) {
      localStorage.setItem('orders', `${localStorage.getItem('orders').replace(`${name}`, '')}`);
    } else {
      localStorage.setItem('orders', `${localStorage.getItem('orders').replace(`,${name}`, '')}`);
    }
    localStorage.removeItem(`${name}ID`);
    localStorage.removeItem(`${name}Img`);
    localStorage.removeItem(`${name}Count`);
    localStorage.removeItem(`${name}TotalPrice`);
    localStorage.removeItem(`${name}categoryName`);
    this.orderService.refreshLocalStorage();
    if (!localStorage.getItem('orders')) {
      localStorage.removeItem('orders');
      this.orderList = [];
      this.hasOrders = false;
      this.isShown = false;
      this.showEmptyBasket = true;
      setTimeout(() => this.showEmptyBasket = false, 200);
    }
  }

  openModal(template: TemplateRef<any>, name: string, price: string, order: Object) {
    this.modalRef = this.modalService.show(template);
    this.currentOrderName = name;
    this.currentOrderPrice = price;
    this.currentOrder = order;
  }
}
