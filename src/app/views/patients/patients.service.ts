import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { Patient } from 'src/app/models/pacient';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  readonly API_URL = 'http://localhost:3000/pacientes';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Patient[]>(`${this.API_URL}`);
  }

  create(pacient: Patient) {
    return this.http.post<Patient>(this.API_URL, pacient).pipe(take(1));
  }

  getById(id: string) {
    return this.http.get<Patient>(`${this.API_URL}/${id}`).pipe(take(1));
  }

  getByName(term: string) {
    return this.http
      .get<Patient[]>(`${this.API_URL}?nome_like=${term}`)
      .pipe(take(1));
  }

  getPacientInfo(id: string) {
    return this.http
      .get<Patient>(`${this.API_URL}/${id}?_embed=exames&_embed=consultas`)
      .pipe(take(1));
  }
}
