import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';
import { AppointmentsService } from './appointments.service';

@Injectable({
  providedIn: 'root',
})
export class AppointmentResolver implements Resolve<Appointment> {
  constructor(private appointmentsService: AppointmentsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Appointment> {
    if (route.params && route.params['id']) {
      return this.appointmentsService.getById(route.params['id']);
    }

    return of({
      id: undefined,
      pacienteId: '',
      motivo: '',
      data: '',
      horario: '',
      descricao: '',
      medicacao: '',
      dosagemEPrecaucoes: '',
    });
  }
}
