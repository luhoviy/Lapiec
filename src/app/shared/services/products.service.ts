import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products:Array<IProduct> = [];

  private url:string;
  constructor(private http:HttpClient) {
    this.url= 'http://localhost:3000/products';
   }

  getProduct():Array<IProduct>{
    return this.products;
  }

  getJSONProducts():Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(this.url);
  }

  addJSONProducts(product:IProduct):Observable<Array<IProduct>>{
    return this.http.post<Array<IProduct>>(this.url,product);
  }

  deleteJSONProducts(id:number):Observable<Array<IProduct>>{
    return this.http.delete<Array<IProduct>>(`${this.url}/${id}`);
  }
  updateJSONProducts(product:IProduct):Observable<Array<IProduct>>{
    return this.http.put<Array<IProduct>>(`${this.url}/${product.id}`,product)
  }
  
}
