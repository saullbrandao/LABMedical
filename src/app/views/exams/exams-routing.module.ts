import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamResolver } from './exam.resolver';
import { ExamsFormComponent } from './exams-form/exams-form.component';

const routes: Routes = [
  {
    path: 'novo',
    component: ExamsFormComponent,
  },
  {
    path: 'editar/:id',
    component: ExamsFormComponent,
    resolve: { exam: ExamResolver },
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'novo',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamsRoutingModule {}