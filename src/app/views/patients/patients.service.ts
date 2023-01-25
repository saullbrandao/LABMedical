import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, take, throwError } from 'rxjs';
import { Patient } from 'src/app/models/patient';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  readonly API_URL = 'http://localhost:3000/pacientes';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Patient[]>(`${this.API_URL}`);
  }

  private create(patient: Patient) {
    return this.http.post<Patient>(this.API_URL, patient).pipe(take(1));
  }
  private update(patient: Patient) {
    return this.http
      .put<Patient>(`${this.API_URL}/${patient.id}`, patient)
      .pipe(take(1));
  }

  save(patient: Patient) {
    if (patient.id) return this.update(patient);

    return this.create(patient);
  }

  getById(id: string) {
    return this.http.get<Patient>(`${this.API_URL}/${id}`).pipe(take(1));
  }

  getByName(term: string) {
    return this.http
      .get<Patient[]>(`${this.API_URL}?nome_like=${term}`)
      .pipe(take(1));
  }

  getPatientInfo(id: string) {
    return this.http
      .get<Patient>(`${this.API_URL}/${id}?_embed=exames&_embed=consultas`)
      .pipe(take(1));
  }

  delete(id: string) {
    return this.getPatientInfo(id).pipe(
      switchMap((patient) => {
        // Only delete if patient has no appointments and exams
        if (patient.consultas?.length === 0 && patient.exames?.length === 0) {
          return this.http.delete<Patient>(`${this.API_URL}/${id}`);
        }

        return throwError(
          () =>
            new Error(
              'Erro ao deletar paciente. Paciente tem consultas ou exames cadastrados!'
            )
        );
      })
    );
  }
}
