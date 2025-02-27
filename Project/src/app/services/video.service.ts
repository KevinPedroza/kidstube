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

  UpdateVideoURL(token: Token, usuario: Video): Observable<Video> {
    return this.http
      .put<Video>("http://localhost:8000/videourl/", usuario, {
        headers: { token: token.data.token }
      })
      .catch(this.handleError);
  }

  UpdateVideoName(token: Token, usuario: Video): Observable<Video> {
    return this.http
      .put<Video>("http://localhost:8000/video", usuario, {
        headers: { token: token.data.token }
      })
      .catch(this.handleError);
  }


  pushFileToStorageUpdate(file: File, nombre: string, video: string, id:number): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('video', file);

    const req = new HttpRequest('PUT', 'http://localhost:8000/videonamevideo/' + nombre + '/' + video + "/" + id, formdata, {
      reportProgress: true,
      responseType: 'text',
    });

    return this.http.request(req);
  }

  GetVideos(token: Token): Observable<Video[]> {
    return this.http
      .get<Video[]>(`${this.orderUrl}`, {
        headers: { token: token.data.token }
      })
      .catch(this.handleError);
  }

  DeleteVideo(token: Token, id: number, video: string): Observable<{}> {
    console.log();
    return this.http
      .delete(`${this.orderUrl}/` + id + '/' + video, {
        headers: { token: token.data.token }
      })
      .catch(this.handleError);
  }

  DeleteURL(token: Token, id: number): Observable<{}> {
    console.log();
    return this.http
      .delete("http://localhost:8000/videourl/" + id, {
        headers: { token: token.data.token }
      })
      .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }
}
