import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

  transform(value: any): any {
    if(!value){
      return null;
    }else{
      return value = value+' UAH'
    }
    
  }

}
