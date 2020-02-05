import { IPromotions } from '../interfaces/promotions.interface';

export class Promotion implements IPromotions {
    constructor(
       public id:number,
       public name:string,
       public description:string,
       public finishDate:Date,
       public profit:string,
       public image:string
        ){}
}