import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http:HttpClient,
    private errorHandlerService:ErrorHandlerService
  ) { }

  public getProduct(id:number):Observable<any> {
    let url=environment.apiUrl+'product/'+id;
    return this.http.get(url).pipe(catchError(error=>this.errorHandlerService.handleError(error)));
  }

  public getProductsPerSubCat(categoryId:number):Observable<any>{
    let url=environment.apiUrl+'subcategory/'+categoryId;
    return this.http.get(url).pipe(catchError(error=>this.errorHandlerService.handleError(error)));;
  }

  public getFilteredProduct(orderBy:string,direction:string,
    page:string,size:string,subCategoryId:string,searchTerm:string,
    startPrice:string,endPrice:string){
      if(orderBy==null || orderBy == undefined){
        orderBy='id';
      }
      if(direction==null || direction == undefined){
        direction='desc';
      }
      if(page==null || page == undefined){
        page='0';
      }
      if(size==null || size == undefined){
        size='30';
      }
      if(subCategoryId==null || subCategoryId == undefined){
        subCategoryId='';
      }
      if(searchTerm==null || searchTerm == undefined){
        searchTerm='';
      }
      if(startPrice==null || startPrice == undefined){
        startPrice='0';
      }
      if(endPrice==null || endPrice == undefined){
        endPrice='10000';
      }
      let url=environment.apiUrl+'products';
      const params=new HttpParams().set('orderBy',orderBy)
                                   .append('direction',direction)
                                   .append('page',page)
                                   .append('size',size)
                                   .append('subCategoryId',subCategoryId)
                                   .append('searchTerm',searchTerm)
                                   .append('startPrice',startPrice)
                                   .append('endPrice',endPrice)
      return this.http.get<any>(url,{params:params}) ;                            
  }
}
