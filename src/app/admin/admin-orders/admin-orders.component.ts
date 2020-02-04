import { Component, OnInit } from '@angular/core';
import { onInitAdminAnimate } from 'src/app/shared/animations/animations';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss'],
  animations:[onInitAdminAnimate]
})
export class AdminOrdersComponent implements OnInit {
  isShown:boolean = false;
  constructor() { }

  ngOnInit() {
    setTimeout(() => this.isShown = true,300);

  }

}
