import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { Pacient } from 'src/app/shared/models/pacient';

@Injectable({
  providedIn: 'root',
})
export class PacientsService {
  readonly API_URL = 'http://localhost:3000/pacientes';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Pacient[]>(`${this.API_URL}`);
  }

  create(pacient: Pacient) {
    return this.http.post<Pacient>(this.API_URL, pacient).pipe(take(1));
  }

  getById(id: string) {
    return this.http.get<Pacient>(`${this.API_URL}/${id}`).pipe(take(1));
  }

  getByName(term: string) {
    return this.http
      .get<Pacient[]>(`${this.API_URL}?nome_like=${term}`)
      .pipe(take(1));
  }
}
