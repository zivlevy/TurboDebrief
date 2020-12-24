
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {User} from '../classes/user';
import {Router} from '@angular/router';
import {BehaviorSubject, empty, Observable} from 'rxjs';
import {environment} from '../../environments/environment';

const USER_KEY = 'logged_in_user';

export interface IAuthEvent {
  user?: User;
  loggedIn: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private _router: Router) {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      try {
        const parsed = JSON.parse(user);
        if (parsed) {
          this._loggedInUser = new User(parsed);
          this.notifySubscribers();
        }
      } catch (ex) { }
    }
  }
  private _loggedInUser: User;

  private _inProcessSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public get inProcess$(): Observable<boolean> { return this._inProcessSubject.asObservable(); }

  private _loggedInUserSubject: BehaviorSubject<IAuthEvent> = new BehaviorSubject<IAuthEvent>({ loggedIn: false });
  public get loggedInUser$(): Observable<IAuthEvent> { return this._loggedInUserSubject.asObservable(); }

  public get isLoggedIn(): boolean { return !!this._loggedInUser; }
  public get loggedInUser(): User { return this._loggedInUser; }
  public get accessToken(): string { return !this.isLoggedIn ? null : this._loggedInUser.token; }

  public login(username: string, password: string): Observable<User>{
    return this.http.post<User>(environment.BASE_URL +  '/v2/login', { user_id: username, password }).pipe(
      tap((resp) => this.setUser(resp))
    );
  }

  public setUser(authResponse: User): any {
    if (authResponse) {
      const user = new User(authResponse);
      this._loggedInUser = user;
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      this.notifySubscribers();
    } else {
      localStorage.removeItem(USER_KEY);
      this._loggedInUser = null;
      this._inProcessSubject.next(false);
      this._router.navigateByUrl('/login', { state: { shouldAnimate: false } });
      this.notifySubscribers();
    }
  }
  public refreshAccessToken(): Observable<string> {
    if (!this._loggedInUser) {
      // TODO logout
      return empty();
    }

    // tslint:disable-next-line:max-line-length
    return this.http.post<any>( environment.BASE_URL + '/v2/refresh_token', { token: this._loggedInUser.refresh_token, user_id: this._loggedInUser.user_id }).pipe(
      tap(resp => {
        this._loggedInUser.refresh_token = resp.new_refresh_token;
        this._loggedInUser.token = resp.new_token;
        localStorage.setItem(USER_KEY, JSON.stringify(this._loggedInUser));
      })
    );
  }
  private notifySubscribers(): void {
    this._loggedInUserSubject.next({
      user: this._loggedInUser,
      loggedIn: this.isLoggedIn
    });
  }
}
