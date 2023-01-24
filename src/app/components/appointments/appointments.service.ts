import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, switchMap, take } from 'rxjs';
import { Appointment } from 'src/app/shared/models/appointment';

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
