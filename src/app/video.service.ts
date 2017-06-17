import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from "@angular/http";
import 'rxjs/add/operator/map';
import { Video } from "app/video";

@Injectable()
export class VideoService {

  private _getUrl = "/api/videos"
  private _postUrl = '/api/video'
  private _putUrl = '/api/video/'
  private _deleteUrl = '/api/video/'
  constructor(private _http: Http) { }

  getVideos() {
    return this._http.get(this._getUrl)
      .map((response: Response) => response.json());
  }

  addVideo(video: Video) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this._http.post(this._postUrl, video, options)
      .map((reaponse: Response) => reaponse.json());
  }

  updateVideo(video: Video) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this._http.put(this._putUrl + video._id, options)
      .map((reaponse: Response) => reaponse.json());
  }

  deleteVideo(video: Video) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this._http.delete(this._deleteUrl + video._id, options)
      .map((reaponse: Response) => reaponse.json());
  }
}
