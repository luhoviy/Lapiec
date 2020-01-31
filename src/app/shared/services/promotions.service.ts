import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPromotions } from '../interfaces/promotions.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {
  promotions:Array<IPromotions>;
  url:string;
  constructor(private http:HttpClient) {
    this.url = 'http://localhost:3000/promotions';
   }
   
   getPromotionsData():Observable<Array<IPromotions>>{
     return this.http.get<Array<IPromotions>>(this.url);
   }

   addPromotion(promotion:IPromotions):Observable<Array<IPromotions>>{
     return this.http.post<Array<IPromotions>>(this.url,promotion);
   }
   
   editPromotion(promotion:IPromotions,id:number){
     return this.http.put(`${this.url}/${id}`,promotion);
   }
   
   deletePromotion(id:number){
     return this.http.delete(`${this.url}/${id}`);
   }
}
