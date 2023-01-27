import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';

type Token = {
  accessToken: string;
  user: {
    email: string;
    name: string;
  };
};

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly API_URL = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService
  ) {}

  login(email: string, password: string) {
    this.http
      .post<Token>(`${this.API_URL}/login`, { email, password })
      .subscribe({
        next: (res) => {
          localStorage.setItem('token', JSON.stringify(res));
          this.router.navigate(['/']);
        },
        error: () =>
          this.toastService.error('Erro ao fazer login. Tente novamente.'),
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  register(registerData: RegisterData) {
    return this.http.post<Token>(`${this.API_URL}/register`, registerData);
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
