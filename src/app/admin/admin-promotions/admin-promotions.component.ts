import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IPromotions } from 'src/app/shared/interfaces/promotions.interface';
import { PromotionsService } from 'src/app/shared/services/promotions.service';
import { Promotion } from 'src/app/shared/classes/promotion.model';


@Component({
  selector: 'app-admin-promotions',
  templateUrl: './admin-promotions.component.html',
  styleUrls: ['./admin-promotions.component.scss']
})
export class AdminPromotionsComponent implements OnInit {
  date: number = Date.now();
  editStatus: boolean = false;
  modalRef: BsModalRef;
  promotions: Array<IPromotions> = [];
  promName: string;
  promDescription: string;
  startDate: Date;
  finishDate: Date;
  promProfit?: string;
  currentPromID: number;
  constructor(private modalService: BsModalService, private promService: PromotionsService) { }

  ngOnInit() {
    this.getPromotions();
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
  getPromotions() {
    return this.promService.getPromotionsData().subscribe(
      data => this.promotions = data
    )
  }

  checkCopies(): boolean {
    return this.promotions.some(prom => prom.name !== this.promName);
  }


  addPromotion() {
    const newPromotion = new Promotion(
      1,
      this.promName,
      this.promDescription,
      null,
      null,
      this.promProfit
    )
    if (this.promotions.length) {
      newPromotion.id = +this.promotions[this.promotions.length - 1].id + 1;
    }

    newPromotion.name = this.promName;
    newPromotion.description = this.promDescription;
    newPromotion.startDate = this.startDate;
    newPromotion.finishDate = this.finishDate;

    this.promService.addPromotion(newPromotion).subscribe(
      () => {
        this.getPromotions();
      }
    )
  }

  deletePromotion(id: number) {
    this.promService.deletePromotion(id).subscribe(
      () => {
        this.getPromotions();
      }
    )
  }

  editPromotion(id: number) {
    this.editStatus = true;
    this.currentPromID = id;
    this.promName = this.promotions[id].name;
    this.promDescription = this.promotions[id].description;
    this.startDate = this.promotions[id].startDate;
    this.finishDate = this.promotions[id].finishDate;
    this.promProfit = this.promotions[id].profit;
  }

  saveEditPromotion(id: number): void {
    const editedPromotion = new Promotion(
      this.promotions[this.currentPromID].id,
      this.promName,
      this.promDescription,
      this.startDate,
      this.finishDate,
      this.promProfit
    )
    this.promService.editPromotion(editedPromotion, this.promotions[id].id).subscribe(
      () => {
        this.getPromotions();
      }
    )
    this.editStatus = false;
  }
  resetForm(): void {
    this.currentPromID = null;
    this.promName = '';
    this.promDescription = '';
    this.startDate = null;
    this.finishDate = null;
    this.promProfit = '';
  }


}
