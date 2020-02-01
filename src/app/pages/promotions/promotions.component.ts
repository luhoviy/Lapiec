import { Component, OnInit } from '@angular/core';
import { IPromotions } from 'src/app/shared/interfaces/promotions.interface';
import { PromotionsService } from 'src/app/shared/services/promotions.service';
import { onInitPromotionsAnimate } from 'src/app/shared/animations/animations';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss'],
  animations:[onInitPromotionsAnimate]
})
export class PromotionsComponent implements OnInit {
  promotions:Array<IPromotions> = [];
  isShown:boolean = false;

  constructor(private promService:PromotionsService) { }

  ngOnInit() {
    this.getPromotions();
  }
  getPromotions():void{
    this.promService.getPromotionsData().subscribe(
      data => this.promotions = data
    )
  }
  
    ngAfterContentInit(): void {
    setTimeout(() => this.isShown = true,100);    
 }

}
