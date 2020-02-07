export interface IOrder {
    id:number
    userName:string,
    userPhone:string,
    userCity:string,
    userStreet:string,
    userHouse:string,
    ordersDetails:Array<Object>,
    totalPayment:string,
    userComment?:string
}