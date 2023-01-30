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
    title: 'Cadastro de Paciente',
  },
  {
    path: '',
    component: MedicalRecordsComponent,
    title: 'Lista de Prontuários',
  },
  {
    path: ':id',
    component: PatientComponent,
    title: 'Prontuário de Paciente',
  },
  {
    path: 'editar/:id',
    component: PatientsFormComponent,
    resolve: { patient: PacientResolver },
    title: 'Edição de Paciente',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientsRoutingModule {}
