import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  public handleError (error:HttpErrorResponse) {
    if (error != null && error.error != null
      && error.error != undefined
      && error.status != null
      && error.status != undefined) {
      var message = null;
      if (error.status == 403) {
        message = 'Access Denied'
      }
      else if (error.status == 401) {
        message = 'Access denied'
      }
      else if (error.status == 404) {
        
        message = 'Connection Failed ';
      } else if(error.status == 400) {
        message = error.error.message;
      }
      else if(error.status == 500) {
        message = error.error.message;
      }else if(error.status == 0){
        message = 'Connection Failed ';
      }else{
        message ='Something bad happened. Please try again later.'
      }
      return throwError(message);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }
  
}
