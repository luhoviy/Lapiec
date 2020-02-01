import { Component, OnInit} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { onInitProcutsAnimate } from 'src/app/shared/animations/animations';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  state:string;
  rofl:boolean = false;
  isOpen:boolean = false;
  constructor() { }

  ngOnInit() {
    
  }

  ngAfterContentInit(): void {
     setTimeout(() => this.isOpen = true,100);    
  }
  
   
}
