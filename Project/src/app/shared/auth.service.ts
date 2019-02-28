import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { User } from '../shared/users';
import { Token } from './token';

@Injectable()
export class AuthService {
  private authUrl = 'http://localhost:8000/login';
  private user = new User('user', '123');

  constructor(private http: HttpClient) {}

  login(): Observable<Token> {
    return this.http
      .post<Token>(`${this.authUrl}`, {
        login: this.user.user,
        password: this.user.password,
      })
      .catch(this.handleError);
    }
      private handleError(err: HttpErrorResponse) {
        // tslint:disable-next-line:no-console
        console.log(err.message);
        return Observable.throw(err.message);
      }
    }
