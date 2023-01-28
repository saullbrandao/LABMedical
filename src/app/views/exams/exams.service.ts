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

  private create(exam: Exam) {
    return this.http.post<Exam>(this.API_URL, exam).pipe(take(1));
  }

  private update(exam: Exam) {
    return this.http
      .put<Exam>(`${this.API_URL}/${exam.id}`, exam)
      .pipe(take(1));
  }

  getAll() {
    return this.http.get<Exam[]>(`${this.API_URL}`);
  }

  save(exam: Exam) {
    if (exam.id) return this.update(exam);

    return this.create(exam);
  }

  getById(id: string) {
    return this.http.get<Exam>(`${this.API_URL}/${id}`).pipe(take(1));
  }

  delete(id: number) {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
