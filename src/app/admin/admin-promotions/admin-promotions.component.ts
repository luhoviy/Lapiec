import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IPromotions } from 'src/app/shared/interfaces/promotions.interface';
import { PromotionsService } from 'src/app/shared/services/promotions.service';
import { Promotion } from 'src/app/shared/classes/promotion.model';
import { onInitAdminAnimate } from 'src/app/shared/animations/animations';
import { finalize, map } from 'rxjs/operators';
import { AngularFireUploadTask, AngularFireStorageReference, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-admin-promotions',
  templateUrl: './admin-promotions.component.html',
  styleUrls: ['./admin-promotions.component.scss'],
  animations:[onInitAdminAnimate]
})
export class AdminPromotionsComponent implements OnInit {
  date: number = Date.now();
  editStatus: boolean = false;
  modalRef: BsModalRef;
  promotions: Array<IPromotions> = [];
  promName: string;
  promDescription: string;
  finishDate: Date;
  photo: string;
  promProfit: string;
  currentPromID: number;
  isShown:boolean = false;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  imageCorrect:boolean = true;
  modalImage:boolean = false;
  currentImage:string = '';



  constructor(private modalService: BsModalService, private promService: PromotionsService,private afStorage:AngularFireStorage) { }

  ngOnInit() {
    this.getPromotions();
    setTimeout(() => this.isShown = true,300);  

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
      this.promProfit,
      this.photo
    )
    if (this.promotions.length) {
      newPromotion.id = +this.promotions[this.promotions.length - 1].id + 1;
    }
    newPromotion.finishDate = this.finishDate
    newPromotion.name = this.promName;
    newPromotion.description = this.promDescription;
    newPromotion.image = this.photo;

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
    this.promProfit = this.promotions[id].profit;
    this.photo = this.promotions[id].image;
    this.finishDate = this.promotions[id].finishDate
  }

  saveEditPromotion(id: number): void {
    const editedPromotion = new Promotion(
      this.promotions[this.currentPromID].id,
      this.promName,
      this.promDescription,
      this.finishDate,
      this.promProfit,
      this.photo
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
    this.finishDate = null;
    this.promProfit = '';
    this.photo = '';
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
        this.photo = data;
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


