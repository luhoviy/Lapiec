export interface IProduct {
    id:number;
    categoryID:number;
    categoryName:string;
    name:string;
    description:string;
    weight:number;
    price:number;
    size?:string;
    image?:string;
    
}