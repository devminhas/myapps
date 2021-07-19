import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { Category } from 'src/app/model/category-model';
import { Product } from 'src/app/model/product-model';
import { HomeService } from 'src/app/services/home.service';
import { UtilService } from 'src/app/services/util.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  productsList:Array<Product>=new Array();
  bestSellersList:Array<Product>=new Array();
  categories:Array<Category> = [];
  filtereItems=[];
  suggestionKeyWord=[
    "Ajrakh Salwar suit",
"Ajrakh cotton saree",
"Ajrakh modal silk",
"Ajrakh",
"Almirah",
"Chanderi silk",
"Chanderi",
"Chikankari",
"Clutches",
"Cotton kurti",
"Cotton running material",
"Cotton saree",
"Cotton",
"Dupatta",
"Gichha silk",
"Gichha",
"Handbag",
"Kota saree",
"Linen saree",
"Linen",
"Lucknowi chikankari",
"Maheswari silk",
"Maheswari",
"Mul cotton saree",
"Mul cotton set",
"Mul",
"Palazzos",
"Pants",
"Rayon",
"Salwar suit set",
"Salwar",
"Saree",
"Sling bags",
"Stoles",
"chikankari",
"special edition",
"suit set"

  ]
  searchTerm:string='';
  imageResourcePath:string=environment.resourceUrl;
  constructor(
    private homeService:HomeService,
    private UtilService:UtilService
  ) { }

  ngOnInit() {
    let arrivals=this.homeService.getNewArrivals();
    let categories=this.homeService.getCatoryList();
    let bestSellers=this.homeService.getBestSellers();
    forkJoin([arrivals,categories,bestSellers]).subscribe(results=>{
        this.productsList=results[0].content;
        this.productsList.length=10;
        this.categories=results[1];
        this.bestSellersList=results[2];

      //  this.categories= this.categories.filter(r=>r.coverImage!=null && r.coverImage!=undefined);
    },
    error=>{
  
      this.UtilService.presentAlert("Oops","Something went wrong",error);
    })
  }

  search(event){

    if(this.searchTerm.length==0){
      this.filtereItems.length=0;
      return
    }
    this.filtereItems=this.suggestionKeyWord.filter((item) => {
			return item.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });    
    
    if(this.filtereItems.length>10){
      this.filtereItems.length=10
    }
   


  }

  cancel(event){
    setTimeout(()=>{
      this.filtereItems.length=0;
    },500)
    
  }

}
