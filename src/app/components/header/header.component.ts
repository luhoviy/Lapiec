import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { ICategory } from 'src/app/shared/interfaces/category.interface';


window.onscroll = () => {
  window.pageYOffset >= 100 
  ? document.body.children[0].children[0].children[0].classList.add('scrolled')
  : document.body.children[0].children[0].children[0].classList.remove('scrolled')

  
};


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
