import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacientsRoutingModule } from './pacients-routing.module';
import { PacientsFormComponent } from './pacients-form/pacients-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { MedicalRecordsComponent } from './medical-records/medical-records.component';

@NgModule({
  declarations: [PacientsFormComponent, MedicalRecordsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PacientsRoutingModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [provideNgxMask()],
})
export class PacientsModule {}
