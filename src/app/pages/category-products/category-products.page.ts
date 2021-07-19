import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { forkJoin } from 'rxjs';
import { SubCategoryProducts } from 'src/app/model/subcategory-products';
import { ProductService } from 'src/app/services/product.service';
import { UtilService } from 'src/app/services/util.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.page.html',
  styleUrls: ['./category-products.page.scss'],
})
export class CategoryProductsPage implements OnInit {
  categoryName:string;
  categoryId:number;
  subCategoryProducts:SubCategoryProducts[]=[];
  imageResourcePath:string=environment.resourceUrl;
  constructor(
    private productService:ProductService,
    private route:ActivatedRoute,
    private UtilService:UtilService
  ) { 
    
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if(this.categoryId!=params['categoryId']){
        this.categoryId = params['categoryId'];
        this.categoryName = params['categoryName'];
        let subCategoryProduct=this.productService.getProductsPerSubCat(this.categoryId);
        forkJoin([subCategoryProduct]).subscribe(results=>{
          this.subCategoryProducts=results[0];
        },
        error=>{
          this.UtilService.presentAlert("Oops","Something went wrong",error);
        })
      }
     
    })
  
  }

}
