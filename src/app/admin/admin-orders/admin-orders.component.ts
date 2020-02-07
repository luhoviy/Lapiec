import { Component, OnInit } from '@angular/core';
import { onInitAdminAnimate } from 'src/app/shared/animations/animations';
import { IOrder } from 'src/app/shared/interfaces/order.interface';
import { OrdersService } from 'src/app/shared/services/orders.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss'],
  animations:[onInitAdminAnimate]
})
export class AdminOrdersComponent implements OnInit {
  isShown:boolean = false;
  orderList:Array<IOrder> = [];
  totalPayment:number = 0;
  constructor(private service:OrdersService) { }

  ngOnInit() {
    setTimeout(() => this.isShown = true,300);
    this.getOrderList();  
  }

  deleteOrder(id:number){
    this.service.deleteOrder(id).subscribe(
      data => this.getOrderList()
    )
  }

  getOrderList():void{
    this.service.getOrderList().subscribe(
      data => { 
        this.orderList = data;
      }
    )
  }


  
  
}
