import { Injectable } from '@angular/core';
import { ICategory } from '../interfaces/category.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  categories: Array<ICategory> = [];

  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/categories'
  }

  getCategories(): Array<ICategory> {
    return this.categories;
  }

  getJSONcategories(): Observable<Array<ICategory>> {
    return this.http.get<Array<ICategory>>(this.url);

  }

  addJSONCategories(category: ICategory): Observable<Array<ICategory>> {
    return this.http.post<Array<ICategory>>(this.url, category);
  }

  deleteJSONCategories(id: number): Observable<Array<ICategory>> {
    return this.http.delete<Array<ICategory>>(`${this.url}/${id}`);
  }
  updateJSONCategories(category: ICategory): Observable<Array<ICategory>> {
    return this.http.put<Array<ICategory>>(`${this.url}/${category.id}`, category)
  }
}
