import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { onInitProcutsAnimate } from 'src/app/shared/animations/animations';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [onInitProcutsAnimate]
})
export class ProductsComponent implements OnInit {
  isShown: boolean = false;
  products: Array<IProduct> = [];
  constructor(private productsService: ProductsService, private rout: ActivatedRoute) {

  }
  ngOnInit() {
    this.rout.params.subscribe(params => this.productsService.getJSONProducts().subscribe(
      data => {
      this.products = data.filter(elem => elem.categoryName.toLowerCase() === params['name']);
        this.isShown = false;
        setTimeout(() => this.isShown = true, 1000);
        }
      )
    )
  }

  // ngAfterContentInit(): void {
  //   setTimeout(() => this.isShown = true, 400);
  // }

}