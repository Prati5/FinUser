import { Injectable } from '@angular/core';
import { ApiService } from '../ApiService/api.service';
import { environment } from 'src/environments/environment';
import { Constants } from 'src/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private _apiService:ApiService) { }

  loginUser(userInfo:any) {
    return this._apiService.
      loginUser(environment.APIURL + Constants.endpointUrls.login, userInfo, environment.client_id);
  }

  logoutUser(userInfo:any) {
    return this._apiService.
      logoutUser(environment.APIURL + 'o/revoke_token/', 'Bearer ' + userInfo.access_token, environment.client_id);
  }
}
