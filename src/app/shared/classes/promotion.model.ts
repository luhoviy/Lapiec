import { IPromotions } from '../interfaces/promotions.interface';

export class Promotion implements IPromotions {
    constructor(
       public id:number,
       public name:string,
       public description:string,
       public startDate?:Date,
       public finishDate?:Date,
       public profit?:string
        ){}
}