import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import { Token } from "../shared/token";
import { requestSMS } from "./../models/requestSMS";
import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { VerificarToken } from './../models/verifyToken';

@Injectable({
  providedIn: 'root'
})
export class RequestsmsService {

  constructor(private http: HttpClient) { }
  
  requestSMS(token: Token, request: requestSMS): Observable<requestSMS> {

    return this.http
      .post<requestSMS>('http://localhost:8000/verification/start', request, {
        headers: { token: token.data.token }
      })
      .catch(this.handleError);
  }

  checkSMS(token: Token, request: VerificarToken): Observable<VerificarToken> {

    return this.http
      .post<VerificarToken>('http://localhost:8000/verification/verify', request, {
        headers: { token: token.data.token }
      })
      .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }

}
