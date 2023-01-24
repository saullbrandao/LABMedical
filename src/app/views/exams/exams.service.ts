import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { Exam } from 'src/app/models/exam';

@Injectable({
  providedIn: 'root',
})
export class ExamsService {
  readonly API_URL = 'http://localhost:3000/exames';

  constructor(private http: HttpClient) {}

  create(exam: Exam) {
    return this.http.post<Exam>(this.API_URL, exam).pipe(take(1));
  }
}
