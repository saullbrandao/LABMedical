import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.authService.isLoggedIn()) {
      let newRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.getToken()?.accessToken}`,
        },
      });
      return next.handle(newRequest).pipe(
        catchError((error) => {
          if (error.status === 401) {
            this.authService.logout();
          }

          return of(error);
        })
      );
    }

    return next.handle(request);
  }
}
