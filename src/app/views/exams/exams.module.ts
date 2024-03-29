import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamsRoutingModule } from './exams-routing.module';
import { ExamsFormComponent } from './exams-form/exams-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [ExamsFormComponent],
  imports: [
    CommonModule,
    ExamsRoutingModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    ComponentsModule,
  ],
  providers: [provideNgxMask()],
})
export class ExamsModule {}
