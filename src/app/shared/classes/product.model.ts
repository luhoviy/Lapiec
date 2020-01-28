import { IProduct } from '../interfaces/product.interface';

export class Product implements IProduct {
    constructor(
        public id: number,
        public categoryID: number,
        public categoryName: string,
        public name: string,
        public description: string,
        public weight: number,
        public price: number,
        public size?: string,
        public image?: string
    ) { }
}