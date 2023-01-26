import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ToastService } from './toast.service';

type Token = {
  accessToken: string;
  user: {
    email: string;
    name: string;
  };
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly API_URL = 'http://localhost:3000/login';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService
  ) {}

  login(email: string, password: string) {
    this.http.post<Token>(this.API_URL, { email, password }).subscribe({
      next: (res) => {
        localStorage.setItem('token', JSON.stringify(res));
        this.router.navigate(['/']);
      },
      error: () =>
        this.toastService.error('Erro ao fazer login. Tente novamente'),
    });
  }

  isLoggedIn() {
    const localStorageToken = localStorage.getItem('token');
    if (!localStorageToken) {
      return false;
    }

    const token: Token = JSON.parse(localStorageToken);
    return token.accessToken !== null && token.accessToken.length > 0;
  }

  getToken(): Token | null {
    return this.isLoggedIn()
      ? JSON.parse(localStorage.getItem('token') || '{}')
      : null;
  }
}
