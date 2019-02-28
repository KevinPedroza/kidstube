import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import { Token } from "../shared/token";
import { Usuario } from "./../models/usuario";
import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private orderUrl = "http://localhost:8000/usuarios";

  constructor(private http: HttpClient) { }

  AddUsuario(token: Token, usuario: Usuario): Observable<Usuario> {

    return this.http
      .post<Usuario>(`${this.orderUrl}`, usuario, {
        headers: { token: token.data.token }
      })
      .catch(this.handleError);
  }

  UpdateUsuario(token: Token, usuario: Usuario): Observable<Usuario> {
    return this.http
      .put<Usuario>(`${this.orderUrl}`, usuario, {
        headers: { token: token.data.token }
      })
      .catch(this.handleError);
  }


  GetUsuarios(token: Token): Observable<Usuario[]> {
    return this.http
      .get<Usuario[]>(`${this.orderUrl}`, {
        headers: { token: token.data.token }
      })
      .catch(this.handleError);
  }

  DeleteUsuario(token: Token, usuario: Usuario): Observable<{}> {
    console.log();
    return this.http
      .delete(`${this.orderUrl}/` + usuario.id, {
        headers: { token: token.data.token }
      })
      .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }
}
