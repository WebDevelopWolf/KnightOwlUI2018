import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";

@Injectable()
export class KoapiService {

  private _baseUrl = "http://localhost:50280/";
  tempuser = "Liane";
  modules: any;

  constructor(private _http: Http) {
    console.log('Knight Owl API V1.0 (Beta) Initialized...');
  }

  // On successful API call
  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  // On Error in API Call
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  // Basic Get W/ No Body
  getService(url: string): Promise<any> {
    return this._http
        .get(this._baseUrl + url)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
  }

  // Basic Post W/ Body
  postService(url: string, body: any): Promise<any> {
    console.log(body);
    let headers = new Headers({'Content-Type': 'application/json'});
    return this._http
      .post(this._baseUrl + url, body, {headers: headers})
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

}
