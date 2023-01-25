import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentResolver } from './appointment.resolver';
import { AppointmentsFormComponent } from './appointments-form/appointments-form.component';

const routes: Routes = [
  {
    path: 'novo',
    component: AppointmentsFormComponent,
  },
  {
    path: 'editar/:id',
    component: AppointmentsFormComponent,
    resolve: { appointment: AppointmentResolver },
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
export class AppointmentsRoutingModule {}
