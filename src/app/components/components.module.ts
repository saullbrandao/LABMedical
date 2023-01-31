import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { RegisterComponent } from './register/register.component';
import { SearchPatientComponent } from './search-patient/search-patient.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MenuComponent,
    RegisterComponent,
    SearchPatientComponent,
    ToolbarComponent,
  ],
  exports: [
    SearchPatientComponent,
    MenuComponent,
    ToolbarComponent,
    RegisterComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class ComponentsModule {}
