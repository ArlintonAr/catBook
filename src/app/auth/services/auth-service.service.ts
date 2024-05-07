import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';


import { User } from '../interfaces/user.interface';
import { environmentAuth } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginResponse } from '../interfaces/loginResponse.interface';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { CheckTokenResponse } from '../interfaces/check-token.response';
import { ResponseRegisterUser } from '../interfaces/registerResponse';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public urlAuth: string = environmentAuth.url

  private _currentUser = signal<User | null>(null)
  private _authStatus = signal<AuthStatus>(AuthStatus.checking)

  //!Al mundo exterior
  public currentUser = computed(() => this._currentUser())
  public authStatus = computed(() => this._authStatus())

  private http = inject(HttpClient)


  constructor() {
    this.checkAuthStatus().subscribe()
  }



  setAuthentication(user: User, token: string): boolean {
    this._currentUser.set(user)
    this._authStatus.set(AuthStatus.authenticated)
    localStorage.setItem('token', token)
    return true
  }


  login(email: string, password: string): Observable<boolean> {
    const url = `${this.urlAuth}/auth/login`
    const body = { email, password }
    return this.http.post<LoginResponse>(url, body)
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError(err => throwError(() => err.error.message))
      )

  }

  checkAuthStatus(): Observable<boolean> {
    const url = `${this.urlAuth}/auth/check-token`
    const token = localStorage.getItem('token')


    if (!token) {
      this.logout()
      of(false)
    }

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)

    return this.http.get<CheckTokenResponse>(url, { headers })
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError(() => {
          this._authStatus.set(AuthStatus.notAuthenticated)
          return of(false)
        })
      )

  }


  logout() {
    localStorage.removeItem('token')
    this._currentUser.set(null)
    this._authStatus.set(AuthStatus.notAuthenticated)
  }


  /* ************************Registro de usuarios*********************** */

  registerUser(name: string, email: string, password: string): Observable<boolean> {
    const url: string = `${this.urlAuth}/auth/register`
    const params={name,email,password}

    return this.http.post<ResponseRegisterUser>(url,params)
      .pipe(
        map(({user,token})=>this.setAuthentication(user,token)),
        catchError(err => throwError(() => err.error.message))
        )

  }


}
