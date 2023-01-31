import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { ExamsModule } from './exams/exams.module';
import { PatientsModule } from './patients/patients.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AgePipe } from '../pipes/age.pipe';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HomeComponent, LoginComponent, PageNotFoundComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ComponentsModule,
    AppointmentsModule,
    ExamsModule,
    PatientsModule,
    AgePipe,
  ],
})
export class ViewsModule {}
