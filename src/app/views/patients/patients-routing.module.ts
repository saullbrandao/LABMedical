import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicalRecordsComponent } from './medical-records/medical-records.component';
import { PacientResolver } from './patient.resolver';
import { PatientComponent } from './patient/patient.component';
import { PatientsFormComponent } from './patients-form/patients-form.component';

const routes: Routes = [
  {
    path: 'novo',
    component: PatientsFormComponent,
  },
  {
    path: '',
    component: MedicalRecordsComponent,
  },
  {
    path: ':id',
    component: PatientComponent,
  },
  {
    path: 'editar/:id',
    component: PatientsFormComponent,
    resolve: { pacient: PacientResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientsRoutingModule {}
