import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'pacientes',
    loadChildren: () =>
      import('./components/pacients/pacients.module').then(
        (m) => m.PacientsModule
      ),
  },
  {
    path: 'consultas',
    loadChildren: () =>
      import('./components/appointments/appointments.module').then(
        (m) => m.AppointmentsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
