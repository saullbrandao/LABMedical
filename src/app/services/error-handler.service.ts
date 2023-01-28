import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  public handleError = (error: HttpErrorResponse) => {
    switch (error.status) {
      case 401:
        this.handle401Error();
        break;
      case 404:
        this.handle404Error();
        break;
      default:
        this.handleUnknownError();
    }
  };

  private handle401Error = () => {
    this.toastService.error('Sessão expirada. Por favor logue novamente.');
    this.authService.logout();
  };

  private handle404Error = () => {
    this.router.navigate(['/404']);
  };

  private handleUnknownError() {
    this.toastService.error('Ocorreu um erro. Tente novamente mais tarde.');
    this.router.navigate(['/']);
  }
}
