import { Component, OnInit} from '@angular/core';
import { onInitHomeAnimations } from 'src/app/shared/animations/animations';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations:[onInitHomeAnimations]
})
export class HomeComponent implements OnInit {
  isOpen:boolean = false;
  fOpen:boolean = false;
  iOpen:boolean = false;
  mOpen:boolean = false;
  constructor() { }

  ngOnInit() {
    
  }

  ngAfterContentInit(): void {
     setTimeout(() => this.isOpen = true,1500);    
     setTimeout(() => this.fOpen = true,1500);    
     setTimeout(() => this.iOpen = true,2000);    
     setTimeout(() => this.mOpen = true,2500);    
  }
  
   
}
