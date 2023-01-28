import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'pacientes',
    loadChildren: () =>
      import('./views/patients/patients.module').then((m) => m.PatientsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'consultas',
    loadChildren: () =>
      import('./views/appointments/appointments.module').then(
        (m) => m.AppointmentsModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'exames',
    loadChildren: () =>
      import('./views/exams/exams.module').then((m) => m.ExamsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '404',
    component: PageNotFoundComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
