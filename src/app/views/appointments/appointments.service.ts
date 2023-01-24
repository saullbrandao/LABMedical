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

  create(appointment: Appointment) {
    return this.http.post<Appointment>(this.API_URL, appointment).pipe(take(1));
  }
}
