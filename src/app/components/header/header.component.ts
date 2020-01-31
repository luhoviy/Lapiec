import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { ICategory } from 'src/app/shared/interfaces/category.interface';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  categories:Array<ICategory>;
  adminStatus:boolean = true;

  constructor(private categyService:CategoriesService) { }
  ngOnInit() {
    this.categyService.getJSONcategories().subscribe(
      data => this.categories = data
    )
  }
 
  

}
