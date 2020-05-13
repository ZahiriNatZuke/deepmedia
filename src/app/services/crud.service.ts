import {Injectable} from '@angular/core';
import {API} from "./API";
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, first, retry} from "rxjs/operators";

const api = new API();

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private httpClient: HttpClient) {
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status} Message: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  GETWithOutAuth(URL: string, parameter: string): Observable<any> {
    return this.httpClient.get(URL + parameter, {headers: api.getHeadersWithOutAuth()}).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  GETForMyFavorites(): Observable<any> {
    return this.httpClient.get(api.getMyfavoritesURL(), {headers: api.getHeadersWithAuth()}).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  POSTForRegister(body: any): Observable<any> {
    return this.httpClient.post(api.getRegisterURL(), body, {headers: api.getHeadersForAuth()}).pipe(
      first(),
      retry(1),
      catchError(this.handleError)
    );
  }

  POSTForStore(URL: string, option: string, body: any, parameter?: string): Observable<any> {
    if (option === 'video')
      return this.httpClient.post(URL, body, {headers: api.getHeadersForStoreOrUpdate()}).pipe(
        retry(1),
        catchError(this.handleError)
      );
    else
      return this.httpClient.post(URL + parameter, body, {headers: api.getHeadersForStoreOrUpdate()}).pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  POSTForUpdate(URL: string, body: any, parameter: string): Observable<any> {
    return this.httpClient.post(URL + parameter, body, {headers: api.getHeadersForStoreOrUpdate()})
      .pipe(retry(1),
        catchError(this.handleError)
      );
  }

  POSTForLikeOrFavorite(URL: string, parameter: string): Observable<any> {
    return this.httpClient.post(URL + parameter, {}, {headers: api.getHeadersWithAuth()}).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  DELETEVideoOrUser(URL: string, parameter: string): Observable<any> {
    return this.httpClient.delete(URL + parameter, {headers: api.getHeadersWithAuth()}).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

}