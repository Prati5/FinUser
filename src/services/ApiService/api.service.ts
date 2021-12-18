import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment'
import { map, catchError, timeout } from 'rxjs/operators';
import { Constants } from "src/constants";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  userIsAuthorized: boolean = true;
  private maxTimeout = 80000;
  private loginFormdata:any;
  private logoutFormData:any;
  accessToken: string = '';
  private options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };
  constructor(private http: HttpClient) {
  }

  uploadFile(file: any) {
    return this.postAction(
      environment.APIURL + Constants.endpointUrls.uploadFile,
      file
    );
  }

  getFileData(){
    return this.getAction(
      environment.APIURL + Constants.endpointUrls.getData
    );
  }

  loginUser <T> (path: string, userInfo:any, clientid: string) {
    this.loginFormdata = new URLSearchParams();
    this.loginFormdata.set('grant_type', 'password');
    this.loginFormdata.set('username', userInfo.username);
    this.loginFormdata.set('password', userInfo.password);
    //this.loginFormdata.set('client_id', clientid);

    return this.http.post(path, this.loginFormdata.toString(), this.options)
    .pipe(timeout(this.maxTimeout), map(res => {
          return this.extractData(res);
      }),
      catchError(err => {
        return throwError(err);
    }));
   }


   logoutUser <T> (path: string, token: string, clientid: string) {
    this.logoutFormData = new URLSearchParams();
    this.logoutFormData.set('token', token);
    this.logoutFormData.set('client_id', clientid);

    return this.http.post(path, this.logoutFormData.toString(), this.options)
    .pipe(timeout(this.maxTimeout), map(res => {
          return this.extractData(res);
      }),
      catchError(err => {
          return throwError(err);
      }));
   }


  postAction(path: string, body: any) {
    return this.http.post(path, body)
      .pipe(timeout(this.maxTimeout), map(res => {
        return this.extractData(res);
      }),
        catchError(err => {
          return throwError(err);
        }));
  }

  getAction<T>(path: string) {
    return this.http.get(path)
      .pipe(timeout(this.maxTimeout), map(res => {
        return this.extractData(res);
      }),
        catchError(err => {
          return throwError(err);
        }));
  }

  private extractData(result: any) {
    if (result && result.status === 200) {
      return result.json() || {};
    } else {
      return result || {};
    }
  }
}
