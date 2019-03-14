import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import { Token } from "../shared/token";
import { Video } from "./../models/video";
import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private orderUrl = "http://localhost:8000/video";

  constructor(private http: HttpClient) { }

  AddVideo(token: Token, video: Video): Observable<Video> {

    return this.http
      .post<Video>(`${this.orderUrl}`, video, {
        headers: { token: token.data.token }
      })
      .catch(this.handleError);
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
