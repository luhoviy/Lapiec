import { Component, OnInit } from '@angular/core';
import { IPromotions } from 'src/app/shared/interfaces/promotions.interface';
import { PromotionsService } from 'src/app/shared/services/promotions.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent implements OnInit {
  promotions:Array<IPromotions> = [];

  constructor(private promService:PromotionsService) { }

  ngOnInit() {
    this.getPromotions();
  }
  getPromotions():void{
    this.promService.getPromotionsData().subscribe(
      data => this.promotions = data
    )
  }

}
