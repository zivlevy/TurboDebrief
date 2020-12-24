import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable, throwError, Subject } from "rxjs";
import { AuthService } from './auth.service';
import { catchError, switchMap, tap, finalize } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private _refreshingToken: boolean = false;
    private _refreshTokenSync: Subject<void> = new Subject();

    constructor(private authService: AuthService) {}

    private addAuthHeader(request: HttpRequest<any>): HttpRequest<any> {
        const token = this.authService.accessToken;
        return !token ? request : request.clone({
            setHeaders: {
                'X-Access-Token': token
            }
        });
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(this.addAuthHeader(req)).pipe(
            catchError(err => {
                if (err && err.status === 401 && this.authService.loggedInUser) {
                    // TODO Check specific message
                    return this.refreshToken().pipe(
                        switchMap(() => {
                            return next.handle(this.addAuthHeader(req));
                        })
                    );
                } else {
                    return throwError(err);
                }
            })
        );
    }

    private refreshToken(): Observable<any> {
        if (this._refreshingToken) {
            return this._refreshTokenSync.asObservable();
        } else {
            this._refreshingToken = true;
            return this.authService.refreshAccessToken().pipe(
                finalize(() => this._refreshingToken = false),
                tap(() => {
                    this._refreshTokenSync.next();
                })
            );
        }
    }
}
