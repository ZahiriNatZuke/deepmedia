import {Injectable} from '@angular/core';
import {API} from "./API";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {first, retry} from "rxjs/operators";

const api = new API();

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private httpClient: HttpClient) {
  }

  GETWithOutAuth(URL: string, parameter: string): Observable<any> {
    return this.httpClient.get(URL + parameter, {headers: api.getHeadersWithOutAuth()}).pipe(
      retry(1)
    );
  }

  GETForMyFavorites(): Observable<any> {
    return this.httpClient.get(api.getMyfavoritesURL(), {headers: api.getHeadersWithAuth()}).pipe(
      retry(1)
    );
  }

  POSTForRegister(body: any): Observable<any> {
    return this.httpClient.post(api.getRegisterURL(), body, {headers: api.getHeadersWithOutAuth()}).pipe(
      first(),
      retry(1)
    );
  }

  POSTForStore(URL: string, option: string, body: any, parameter?: string): Observable<any> {
    if (option === 'video')
      return this.httpClient.post(URL, body, {headers: api.getHeadersWithAuth()}).pipe(
        retry(1)
      );
    else
      return this.httpClient.post(URL + parameter, body, {headers: api.getHeadersWithAuth()}).pipe(
        retry(1)
      );
  }

  POSTForUpdate(URL: string, body: any, parameter: string): Observable<any> {
    return this.httpClient.post(URL + parameter, body, {headers: api.getHeadersWithAuth()})
      .pipe(retry(1)
      );
  }

  POSTForLikeOrFavorite(URL: string, parameter: string): Observable<any> {
    return this.httpClient.post(URL + parameter, {}, {headers: api.getHeadersWithAuth()}).pipe(
      retry(1)
    );
  }

  DELETEVideoOrUser(URL: string, parameter: string): Observable<any> {
    return this.httpClient.delete(URL + parameter, {headers: api.getHeadersWithAuth()}).pipe(
      retry(1)
    );
  }

}
