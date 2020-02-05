import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PromotionsService } from 'src/app/shared/services/promotions.service';
import { IPromotions } from 'src/app/shared/interfaces/promotions.interface';
import { onInitPromotionsAnimate } from 'src/app/shared/animations/animations';

@Component({
  selector: 'app-promotion-details',
  templateUrl: './promotion-details.component.html',
  styleUrls: ['./promotion-details.component.scss'],
  animations:[onInitPromotionsAnimate]
})
export class PromotionDetailsComponent implements OnInit {
  promotion:IPromotions;
  isShown:boolean = false;
  constructor(private rout:ActivatedRoute,private service:PromotionsService) { }

  ngOnInit() {
    this.getPromotion();
  }
  
  getPromotion():void{
    this.rout.params.subscribe(
      params => this.service.getSinglePromotion(params['id']).subscribe(
        data => this.promotion = data
      )
    )
  }

  ngAfterContentInit(): void {
    setTimeout(() => this.isShown = true, 1000);
  }
}
