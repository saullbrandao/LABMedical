import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacientsRoutingModule } from './pacients-routing.module';
import { PacientsFormComponent } from './pacients-form/pacients-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [PacientsFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PacientsRoutingModule,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask()],
})
export class PacientsModule {}
