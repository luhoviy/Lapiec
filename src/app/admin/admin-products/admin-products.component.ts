import { Component, OnInit, TemplateRef } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Product } from 'src/app/shared/classes/product.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize,map } from 'rxjs/operators';


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
  productImage: string;
  productID: number;
  editStatus: boolean = false;
  searchProduct: string;
  modalRef: BsModalRef;
  imageCorrect:boolean = true;
  modalImage:boolean = false;
  currentImage:string = '';

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;

  constructor(private afStorage:AngularFireStorage,
              private productsService: ProductsService, 
              private modalService: BsModalService, 
              private categoriesService: CategoriesService) { }
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
  openModalWithClass(template: TemplateRef<any>,imgUrl?:string) {
    this.downloadURL = null;
    this.currentImage = imgUrl;
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
      this.productImage
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
    this.productImage = product.image;
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

  public upload(event: any): void {
    const file = event.target.files[0];
    const filePath = `images/${this.createUUID()}.${file.type.split('/')[1]}`;
    this.task = this.afStorage.upload(filePath, file);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges()
    .pipe(finalize(() => this.downloadURL = this.afStorage.ref(filePath).getDownloadURL()))
    .subscribe();
    this.task.then((e) => {
      this.afStorage.ref(`images/${e.metadata.name}`).getDownloadURL().subscribe(data => {
        this.productImage = data;
      });
    });
  }
  public createUUID(): string {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

}
