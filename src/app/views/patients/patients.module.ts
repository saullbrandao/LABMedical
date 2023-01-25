import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { MedicalRecordsComponent } from './medical-records/medical-records.component';
import { PatientsFormComponent } from './patients-form/patients-form.component';
import { PatientsRoutingModule } from './patients-routing.module';
import { PatientComponent } from './patient/patient.component';

@NgModule({
  declarations: [PatientsFormComponent, MedicalRecordsComponent, PatientComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PatientsRoutingModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [provideNgxMask()],
})
export class PatientsModule {}
