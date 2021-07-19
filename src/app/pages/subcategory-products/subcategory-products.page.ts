import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { forkJoin, Observable } from 'rxjs';
import { Product } from 'src/app/model/product-model';
import { ProductService } from 'src/app/services/product.service';
import { UtilService } from 'src/app/services/util.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-subcategory-products',
  templateUrl: './subcategory-products.page.html',
  styleUrls: ['./subcategory-products.page.scss'],
})
export class SubcategoryProductsPage implements OnInit {
  productsList:Array<Product>=new Array<Product>();
  subCategoryId:number=null;
  subCategoryName:string=null;
  startPrice:number=0;
  endPrice:number=5000;
  orderBy:string='id';
  direction:string='desc';
  searchTerm:string=null;
  page:number=0;
  maxSize:number=10;
  size:number=10;
  currentElements:number;
  totalElements:number;
  imageResourcePath:string=environment.resourceUrl;
  constructor(
    private productService:ProductService,
    private route:ActivatedRoute,
    private UtilService:UtilService,
    private menuCtrl:MenuController
  ) {

   }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.size=10;
      if( params['subCategoryId']!= undefined && params['subCategoryId']!=null){
        this.subCategoryId = params['subCategoryId'];
      }
      this.subCategoryName = params['subCategoryName'];
      this.searchTerm=params['searchTerm'];
     
     
    })
    let subCategoryProduct=this.getFilteredProductList();
    forkJoin([subCategoryProduct]).subscribe(results=>{
      this.productsList=results[0].content;
      this.currentElements=results[0].numberOfElements;
      this.totalElements=results[0].totalElements;
    },
    error=>{
      this.UtilService.presentAlert("Oops","Something went wrong",error);
    })
  }
  getFilteredProductList():Observable<any>{
    return this.productService.getFilteredProduct(this.orderBy,this.direction,String(this.page),String(this.size),String(this.subCategoryId),this.searchTerm,String(this.startPrice),String(this.endPrice));
  }

  loadMore(event){
    console.log(event);
    this.size+=10;
    this.getFilteredProductList().subscribe(result=>{
      this.productsList=result.content;
      if(event){
        event.target.complete();
      }
      if(result.totalElements===result.numberOfElements){
        event.target.disabled=true;
      }
    },
    error=>{
      this.UtilService.presentAlert("Oops","Something went wrong",error);
    });


  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  ionViewWillLeave(){
    this.menuCtrl.enable(true);
  }
}
