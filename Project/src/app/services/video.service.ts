import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import { Token } from "../shared/token";
import { Video } from "./../models/video";
import { HttpClient, HttpErrorResponse, HttpResponse, HttpEvent, HttpRequest } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private orderUrl = "http://localhost:8000/video";

  constructor(private http: HttpClient) { }

  pushFileToStorage(file: File, nombre: string): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('video', file);

    const req = new HttpRequest('POST', 'http://localhost:8000/video/' + nombre, formdata, {
      reportProgress: true,
      responseType: 'text',
    });

    return this.http.request(req);
  }

  AddVideoURL(token: Token, video: Video): Observable<Video> {

    return this.http
      .post<Video>("http://localhost:8000/videourl", video, {
        headers: { token: token.data.token }
      })
      .catch(this.handleError);
  }

  UpdateVideo(token: Token, usuario: Video): Observable<Video> {
    return this.http
      .put<Video>(`${this.orderUrl}`, usuario, {
        headers: { token: token.data.token }
      })
      .catch(this.handleError);
  }


  GetVideos(token: Token): Observable<Video[]> {
    return this.http
      .get<Video[]>(`${this.orderUrl}`, {
        headers: { token: token.data.token }
      })
      .catch(this.handleError);
  }

  DeleteVideo(token: Token, id: number): Observable<{}> {
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
