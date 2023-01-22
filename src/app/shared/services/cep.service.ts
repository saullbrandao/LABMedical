import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { CEP_REGEX } from '../utils/constants';
import { CepAdress } from '../models/cep-address';

@Injectable({
  providedIn: 'root',
})
export class CepService {
  constructor(private http: HttpClient) {}

  getAddress(cep: string): Observable<CepAdress> | undefined {
    if (CEP_REGEX.test(cep)) {
      return this.http
        .get<CepAdress>(`https://viacep.com.br/ws/${cep}/json`)
        .pipe(take(1));
    } else {
      return;
    }
  }
}
