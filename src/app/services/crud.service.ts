import {Injectable} from '@angular/core';
import {API} from "./API";
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";

const api = new API();
const CONTENT_TYPE_FORM_DATA = 'multipart/form-data';
const CONTENT_TYPE_WWW_FORM = 'application/x-www-form-urlencoded';

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

  GETWithAuth(URL: string, option: string): Observable<any> {
    if (option === 'refresh')
      return this.httpClient.get(URL, {headers: api.getHeadersForRefreshJWT()}).pipe(
        retry(1),
        catchError(this.handleError)
      );
    else
      return this.httpClient.get(URL, {headers: api.getHeadersWithAuth()}).pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  POSTForLoginOrRegister(URL: string, body: any): Observable<any> {
    return this.httpClient.post(URL, body, {headers: api.getHeadersForAuth()}).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  POSTForStore(URL: string, option: string, body: any, parameter?: string): Observable<any> {
    if (option === 'video')
      return this.httpClient.post(URL, body, {headers: api.getHeadersForStoreOrUpdate(CONTENT_TYPE_FORM_DATA)}).pipe(
        retry(1),
        catchError(this.handleError)
      );
    else
      return this.httpClient.post(URL + parameter, body, {headers: api.getHeadersForStoreOrUpdate(CONTENT_TYPE_WWW_FORM)}).pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  POSTForUpdate(URL: string, option: string, body: any, parameter: string): Observable<any> {
    body = body + '&_method=PATCH';
    return this.httpClient.post(URL + parameter, body, {headers: api.getHeadersForStoreOrUpdate(CONTENT_TYPE_FORM_DATA)}).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  POSTForLikeOrFavorite(URL: string, parameter: string): Observable<any> {
    return this.httpClient.post(URL + parameter, {}, {headers: api.getHeadersWithAuth()}).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  POSTLogout(): Observable<any> {
    return this.httpClient.post(api.getLogOutURL(), {}, {headers: api.getHeadersWithAuth()}).pipe(
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
