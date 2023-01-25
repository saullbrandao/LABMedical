import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  readonly API_URL = 'http://localhost:3000/consultas';

  constructor(private http: HttpClient) {}

  private create(appointment: Appointment) {
    return this.http.post<Appointment>(this.API_URL, appointment).pipe(take(1));
  }

  private update(appointment: Appointment) {
    return this.http
      .put<Appointment>(`${this.API_URL}/${appointment.id}`, appointment)
      .pipe(take(1));
  }

  save(appointment: Appointment) {
    if (appointment.id) return this.update(appointment);

    return this.create(appointment);
  }

  getById(id: string) {
    return this.http.get<Appointment>(`${this.API_URL}/${id}`).pipe(take(1));
  }

  delete(id: number) {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
