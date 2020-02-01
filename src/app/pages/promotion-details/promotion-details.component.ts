import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PromotionsService } from 'src/app/shared/services/promotions.service';
import { IPromotions } from 'src/app/shared/interfaces/promotions.interface';

@Component({
  selector: 'app-promotion-details',
  templateUrl: './promotion-details.component.html',
  styleUrls: ['./promotion-details.component.scss']
})
export class PromotionDetailsComponent implements OnInit {
  promotion:IPromotions;
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

}
