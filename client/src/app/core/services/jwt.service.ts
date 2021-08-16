import { Injectable } from '@angular/core';


@Injectable()
export class JwtService {

  getToken(): String {
    return window.localStorage['vinqloJwtToken'];
  }

  saveToken(token: String) {
    window.localStorage['vinqloJwtToken'] = token;
  }

  destroyToken() {
    window.localStorage.removeItem('vinqloJwtToken');
  }

}
