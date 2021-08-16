import { NgxPermissionsService } from 'ngx-permissions';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,  BehaviorSubject ,  ReplaySubject, of } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models';
import { map ,  distinctUntilChanged, catchError } from 'rxjs/operators';


@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor (
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService,
    private permissionsService: NgxPermissionsService,

  ) {}

  public get authenticated() {
    return this.isAuthenticatedSubject.value;
  }

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      return this.apiService.get('/users')
      .pipe(map(
        res => {

              this.setAuth(res.data.user);
              return res.data.user;
            }

      ), catchError(e => {
        this.purgeAuth();
        return of(null)}))
    } else {
     return  of(null);
    }
  }
  updateUserContext() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
        this.apiService.get('/users').subscribe(res => {
              this.setAuth(res.data.user);
            }, )
    }
  }

  setAuth(user: User) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // flush permissions
    this.permissionsService.flushPermissions();
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(type: boolean, credentials: any): Observable<User> {
    const route = type ? '/login' : '/signup';
    return this.apiService.post('/users' + route, credentials)
      .pipe(map(
      res => {
        this.setAuth(res.data.user);
        return res;
      }
    ));
  }
  verifyOtp(otp: string, email:string)
  {
    return this.apiService.get(`/users/verifyOtp/${otp}/${email}`)
  }
  addStrike(slug:string,email:string)
  {
    return this.apiService.post(`/users/strike/${slug}/${email}`)
  }
  resendOtp(email:string)
  {
    return this.apiService.get(`/users/resendOtp/${email}`)
  }
  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }
  getAllUsers(path:string)
  {
    return this.apiService.get(path);
  }
  // Update the user on the server (email, pass, etc)
  update(user: User): Observable<User> {
    return this.apiService
    .put('/user', { user })
    .pipe(map(data => {
      // Update the currentUser observable
      this.currentUserSubject.next(data.user);
      return data.user;
    }));
  }
  updateStatus(type:number,email:string)
  {
    return this.apiService.put(`/users/status/${type}/${email}`)
  }
  changeStatus(email:string, status: number)
  {
    return this.apiService.put(`/users/status/${status}/${email}`);
  }

  sendOtp(email:string)
  {
    return this.apiService.get(`/users/forgotPassword/${email}`)
  }
}
