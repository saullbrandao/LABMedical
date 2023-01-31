import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { AppointmentsFormComponent } from './appointments-form/appointments-form.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [AppointmentsFormComponent],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    ComponentsModule,
  ],
  providers: [provideNgxMask()],
})
export class AppointmentsModule {}
