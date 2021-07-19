import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, retry } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http:HttpClient,
    private errorHandlerService:ErrorHandlerService
  ) { }

  public getNewArrivals():Observable<any> {
    let url=environment.apiUrl+'newArrivals';
    return this.http.get(url).pipe(catchError(error=>this.errorHandlerService.handleError(error)));
  }

  public getBestSellers():Observable<any> {
    let url=environment.apiUrl+'bestSellers';
    return this.http.get(url).pipe(catchError(error=>this.errorHandlerService.handleError(error)));;
  }

  public getCatoryList():Observable<any> {
    let url=environment.apiUrl+'category';
    return this.http.get(url).pipe(catchError(error=>this.errorHandlerService.handleError(error)));;
  }
}
