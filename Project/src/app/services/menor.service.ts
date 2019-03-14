import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import { Token } from "../shared/token";
import { Menor } from "./../models/menor";
import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MenorService {

  private orderUrl = "http://localhost:8000/menores";

  constructor(private http: HttpClient) { }

  
  AddMenor(token: Token, usuario: Menor): Observable<Menor> {

    return this.http
      .post<Menor>(`${this.orderUrl}`, usuario, {
        headers: { token: token.data.token }
      })
      .catch(this.handleError);
  }

  UpdateMenor(token: Token, usuario: Menor): Observable<Menor> {
    return this.http
      .put<Menor>(`${this.orderUrl}`, usuario, {
        headers: { token: token.data.token }
      })
      .catch(this.handleError);
  }


  GetMenores(token: Token): Observable<Menor[]> {
    return this.http
      .get<Menor[]>(`${this.orderUrl}`, {
        headers: { token: token.data.token }
      })
      .catch(this.handleError);
  }

  DeleteMenor(token: Token, id: number): Observable<{}> {
    console.log();
    return this.http
      .delete(`${this.orderUrl}/` + id, {
        headers: { token: token.data.token }
      })
      .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }
}
