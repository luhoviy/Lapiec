import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IOrder } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  localStorageData = new BehaviorSubject<Object>(localStorage);
  localStorageObserver = this.localStorageData.asObservable();

  url:string;

  constructor(private http:HttpClient) { 
    this.url = `http://localhost:3000/orders`;
  }
  
  addOrder(order:IOrder):Observable<Array<IOrder>>{
    return this.http.post<Array<IOrder>>(this.url,order);
  }

  getOrderList():Observable<Array<IOrder>>{
    return this.http.get<Array<IOrder>>(this.url);
  }

  deleteOrder(id:number):Observable<Array<IOrder>>{
    return this.http.delete<Array<IOrder>>(`${this.url}/${id}`);
  }

  getOrderDetails(id?:number):Observable<IOrder>{
    return this.http.get<IOrder>(`${this.url}/${id}`)
  }


  refreshLocalStorage():void{
    this.localStorageData.next(localStorage);
  }
}
