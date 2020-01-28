import { Component, OnInit, TemplateRef } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Product } from 'src/app/shared/classes/product.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  productsAdmin: Array<IProduct> = [];
  categories: Array<ICategory>;
  name: string;
  categoryName: string;
  categoryID: number;
  productDescription: string;
  productPrice: number;
  productWeight: number;
  editStatus: boolean = false;
  productID: number;
  searchProduct: string;
  modalRef: BsModalRef;

  constructor(private productsService: ProductsService, private modalService: BsModalService, private categoriesService: CategoriesService) { }
  ngOnInit() {
    this.getAdminProducts();
    this.getCategories();
  }

  private getCategories(): void {
    this.categoriesService.getJSONcategories().subscribe(
      data => {
        this.categories = data;
      },
      err => {
        console.log(err);
      }
    )
  }

  setCategoryID(): void {
    this.categoryID = this.categories.find(elem => elem.categoryName.toLocaleLowerCase() === this.categoryName.toLocaleLowerCase()).id;
  }

  private getAdminProducts(): void {
    this.productsService.getJSONProducts().subscribe(
      data => {
        this.productsAdmin = data;
      },
      err => {
        console.log(err);
      }
    )
  }
  openModalWithClass(template: TemplateRef<any>) {
    if (!this.editStatus) {
      this.resetForm();
    }
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );

  }

  addProduct(): void {
    const newProduct: IProduct = new Product(
      1,
      this.categoryID,
      this.categoryName,
      this.name,
      this.productDescription,
      this.productWeight,
      this.productPrice,
    );
    if (this.productsAdmin.length > 0 && this.categoryName && this.name && this.productDescription && this.productWeight && this.productPrice) {
      const id = this.productsAdmin.slice(-1)[0].id + 1;
      newProduct.id = id;
    }
    if (this.editStatus) {
      newProduct.id = this.productID;
      this.productsService.updateJSONProducts(newProduct).subscribe(
        () => {
          this.getAdminProducts();
        }
      )
      this.editStatus = false;
    } else {
      this.productsService.addJSONProducts(newProduct).subscribe(
        () => {
          this.getAdminProducts();
        }
      )
    }

    this.resetForm();
  }

  deleteProduct(product: IProduct): void {
    this.productsService.deleteJSONProducts(product.id).subscribe(
      () => {
        this.getAdminProducts();
      }
    )
  }



  editProduct(product: IProduct): void {
    this.categoryName = product.categoryName
    this.name = product.name;
    this.productDescription = product.description;
    this.productWeight = product.weight;
    this.productPrice = product.price;
    this.productID = product.id;
    this.editStatus = true;


  }

  resetForm(): void {
    if (!this.editStatus) {
      this.categoryName = ''
    }
    this.name = '';
    this.productDescription = '';
    this.productPrice = null;
    this.productWeight = null;
  }

}
