import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Exam } from 'src/app/models/exam';
import { ExamsService } from './exams.service';

@Injectable({
  providedIn: 'root',
})
export class ExamResolver implements Resolve<Exam> {
  constructor(private examsService: ExamsService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Exam> {
    if (route.params && route.params['id']) {
      return this.examsService.getById(route.params['id']);
    }

    return of({
      id: 0,
      pacienteId: '',
      nome: '',
      data: '',
      horario: '',
      tipo: '',
      laboratorio: '',
      url: '',
      resultado: '',
    });
  }
}
