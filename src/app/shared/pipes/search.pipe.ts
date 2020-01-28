import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  
  transform(categories: any, currentCategory:string): any {
    if(!currentCategory){
      return categories;
    }
    if(!categories){
      return [];
    }


    if(currentCategory){
      categories = categories.filter(item => item.categoryName.toLowerCase().indexOf(currentCategory.toLowerCase()) !== -1) 
      return categories; 
      }

    
    
  }

}
