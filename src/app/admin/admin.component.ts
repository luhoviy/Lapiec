import { Component, OnInit } from '@angular/core';
import { onInitAdminAnimate } from '../shared/animations/animations';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations:[onInitAdminAnimate]
})
export class AdminComponent implements OnInit {
  isShown:boolean = false;
  constructor() { }

  ngOnInit() {
    setTimeout(() => this.isShown = true,1000);
  }

}
