import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlerService {
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  public handleError = (error: HttpErrorResponse) => {
    switch (error.status) {
      case 400:
        this.handle400Error(error);
        break;
      case 401:
        this.handle401Error();
        break;
      case 404:
        this.handle404Error();
        break;
      default:
        this.handleUnknownError();
        break;
    }
  };

  private handle400Error = (error: HttpErrorResponse) => {
    if (error.url?.includes('/login')) {
      this.toastService.error('Email ou senha inválida', 'bad-credentials');
    }

    if (error.error === 'Email already exists') {
      this.toastService.error(
        'Erro ao cadastrar novo usuário. Email já utilizado.',
        'register-error'
      );
    }
  };

  private handle401Error = () => {
    this.toastService.error(
      'Sessão expirada. Por favor logue novamente.',
      'session-expired'
    );
    this.authService.logout();
  };

  private handle404Error = () => {
    this.router.navigate(['/404']);
  };

  private handleUnknownError() {
    this.toastService.error(
      'Ocorreu um erro. Tente novamente mais tarde.',
      'unkown-error'
    );
  }
}
