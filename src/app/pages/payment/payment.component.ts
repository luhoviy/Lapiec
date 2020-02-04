import { Component, OnInit } from '@angular/core';
import { onInitPaymentAnimate } from 'src/app/shared/animations/animations';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  animations:[onInitPaymentAnimate]
})
export class PaymentComponent implements OnInit {
  isShown:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    setInterval(() => this.isShown = true,1000)
    
  }

}
