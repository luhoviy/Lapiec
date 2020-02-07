import { IOrder } from '../interfaces/order.interface';

export class Order implements IOrder {
    constructor(
        public id:number,
        public userName:string,
        public userPhone:string,
        public userCity:string,
        public userStreet:string,
        public userHouse:string,
        public ordersDetails: Object[],
        public totalPayment:string,
        public userComment?:string
    ){}
}