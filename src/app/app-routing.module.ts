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
    canActivateChild: [AuthGuard],
    title: 'Pacientes',
  },
  {
    path: 'consultas',
    loadChildren: () =>
      import('./views/appointments/appointments.module').then(
        (m) => m.AppointmentsModule
      ),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    title: 'Consultas',
  },
  {
    path: 'exames',
    loadChildren: () =>
      import('./views/exams/exams.module').then((m) => m.ExamsModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    title: 'Exames',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    title: 'Home',
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: '404',
    component: PageNotFoundComponent,
    title: '404',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    title: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
