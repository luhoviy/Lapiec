import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TotalPriceService {

  private totalPayment = new BehaviorSubject<number>(0);

  currentPayment = this.totalPayment.asObservable();

  constructor() { }
    changeTotalPayment(currentPayment:number):void{
      this.totalPayment.next(currentPayment);
    }
}
