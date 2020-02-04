import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { Category } from 'src/app/shared/classes/category.model';
import { onInitAdminAnimate } from 'src/app/shared/animations/animations';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss'],
  animations:[onInitAdminAnimate]
})
export class AdminCategoryComponent implements OnInit {
  modalRef: BsModalRef;
  currentInputCategory: string;
  currentCategoryID: number;
  categories: Array<ICategory> = []
  search: string;
  currentCategory: number;
  editStatus: boolean = false;
  wrongCategory: boolean = false;
  isShown:boolean = false;
  constructor(private modalService: BsModalService, private categoryService: CategoriesService) { }

  ngOnInit() {
    this.getCategories()
    setTimeout(() => this.isShown = true,300);

  }
 

  private getCategories(): void {
    this.categoryService.getJSONcategories().subscribe(
      data => {
        this.categories = data;
      },
      err => {
        console.log(err);
      }
    )
  }

  openModal(template: TemplateRef<any>) {
    if (this.editStatus === false) {
      this.currentInputCategory = '';
    }
    this.wrongCategory = false;
    this.modalRef = this.modalService.show(template);
  }

  addCategory(): void {
    if (!this.categories.some(elem => elem.categoryName.toLocaleLowerCase() === this.currentInputCategory.toLocaleLowerCase())) {
      const newCategory: ICategory = new Category(1, this.currentInputCategory.toLocaleLowerCase());
      if (this.currentInputCategory && this.categories.length > 0) {
        if (this.editStatus) {
          newCategory.id = this.currentCategoryID;
        } else {
          newCategory.id = this.categories.slice(-1)[0].id + 1;
        }
      }
      if (this.editStatus) {
        this.categoryService.updateJSONCategories(newCategory).subscribe(
          () => this.getCategories()
        )
        this.editStatus = false;
      } else {
        this.categoryService.addJSONCategories(newCategory).subscribe(
          () => this.getCategories()
        )
      }
      this.wrongCategory = false;
    } else {
      this.wrongCategory = true;
    }
  }
  editCategory(index: number): void {
    this.editStatus = true;
    this.currentInputCategory = this.categories[index].categoryName;
    this.currentCategoryID = this.categories[index].id;
  }
  saveEditCategory(index: number): void {
    this.addCategory()
  }
  deleteCategory(index: number): void {
    this.categoryService.deleteJSONCategories(this.categories[index].id).subscribe(
      () => {
        this.getCategories();
      }
    )
    this.categories.splice(index, 1);
    this.modalRef.hide()
  }
}
