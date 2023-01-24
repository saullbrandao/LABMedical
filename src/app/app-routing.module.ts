import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'pacientes',
    loadChildren: () =>
      import('./views/patients/patients.module').then((m) => m.PatientsModule),
  },
  {
    path: 'consultas',
    loadChildren: () =>
      import('./views/appointments/appointments.module').then(
        (m) => m.AppointmentsModule
      ),
  },
  {
    path: 'exames',
    loadChildren: () =>
      import('./views/exams/exams.module').then((m) => m.ExamsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
