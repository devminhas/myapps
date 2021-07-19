import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, AnimationController, MenuController } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { Product } from 'src/app/model/product-model';
import { ProductService } from 'src/app/services/product.service';
import { UtilService } from 'src/app/services/util.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  id:number=null;
  selectedProduct:Product =new Product();
  selectedSize: number;
  selectedColor: number;
  activeVariation: string;
  imageResourcePath:string=environment.resourceUrl;
  constructor(
    private animatioCntrl: AnimationController,
    private productService:ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private menuCtrl:MenuController,
    public alertController: AlertController,
    private UtilService:UtilService
  ) { }

  ngOnInit() {
    this.activeVariation = 'size';
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
    })
    let product=this.productService.getProduct(this.id);
    forkJoin([product]).subscribe(results=>{
      this.selectedProduct=results[0];
    },
    error=>{
      console.log(error);
      this.UtilService.presentAlert("Oops","Something went wrong",error);
    })
  }
  segmentChanged(e: any) {
    this.activeVariation = e.detail.value;

    if (this.activeVariation == 'color') {
      this.animatioCntrl.create()
      .addElement(document.querySelector('.sizes'))
      .duration(500)
      .iterations(1)
      .fromTo('transform', 'translateX(0px)', 'translateX(100%)')
      .fromTo('opacity', '1', '0.2')
      .play();

      this.animatioCntrl.create()
      .addElement(document.querySelector('.colors'))
      .duration(500)
      .iterations(1)
      .fromTo('transform', 'translateX(-100%)', 'translateX(0)')
      .fromTo('opacity', '0.2', '1')
      .play();
    } else {
      this.animatioCntrl.create()
      .addElement(document.querySelector('.sizes'))
      .duration(500)
      .iterations(1)
      .fromTo('transform', 'translateX(100%)', 'translateX(0)')
      .fromTo('opacity', '0.2', '1')
      .play();

      this.animatioCntrl.create()
      .addElement(document.querySelector('.colors'))
      .duration(500)
      .iterations(1)
      .fromTo('transform', 'translateX(0px)', 'translateX(-100%)')
      .fromTo('opacity', '1', '0.2')
      .play();
    }
  }

  changeSize(size: number) {
    this.selectedSize = size;
  }

  changeColor(color: number) {
    this.selectedColor = color;
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  ionViewWillLeave(){
    this.menuCtrl.enable(true);
  }

}
