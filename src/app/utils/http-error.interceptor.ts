import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, EMPTY, Observable } from 'rxjs';
import { ErrorHandlerService } from '../services/error-handler.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private errorHandlerService: ErrorHandlerService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        this.errorHandlerService.handleError(error);

        return EMPTY;
      })
    );
  }
}
