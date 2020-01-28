import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterAdminProducts'
})
export class FilterAdminProductsPipe implements PipeTransform {

  transform(products: any, currentProduct:string): any {
    if(!currentProduct){
      return products;
    }
    if(!products){
      return [];
    }


    if(currentProduct){
      products = products.filter(product => product.categoryName.toLowerCase().indexOf(currentProduct.toLowerCase()) !== -1 ||
                                            product.name.toLowerCase().indexOf(currentProduct.toLowerCase()) !== -1 ||
                                            product.description.toLowerCase().indexOf(currentProduct.toLowerCase()) !== -1 ||
                                            product.weight.toString().toLowerCase().indexOf(currentProduct.toLowerCase()) !== -1 ||
                                            product.price.toString().toLowerCase().indexOf(currentProduct.toLowerCase()) !== -1
      ) 
      return products; 
      }

    
    
  }

}
