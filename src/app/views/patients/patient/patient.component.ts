import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Patient } from 'src/app/models/patient';
import { PatientsService } from '../patients.service';

@Component({
  selector: 'labmedical-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
})
export class PatientComponent implements OnInit, OnDestroy {
  patient: Patient = {} as Patient;
  routeSubscription: Subscription = new Subscription();
  patientSubscription: Subscription = new Subscription();

  constructor(
    private patientsService: PatientsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params) => {
      const id = params['id'];

      this.patientSubscription = this.patientsService
        .getPatientInfo(id)
        .subscribe((patient) => {
          patient.consultas?.sort((a, b) => {
            const dateA = new Date(
              `${a.data.split('/').reverse().join('-')}T${a.horario}`
            );
            const dateB = new Date(
              `${b.data.split('/').reverse().join('-')}T${a.horario}`
            );

            return dateA < dateB ? -1 : 1;
          });

          this.patient = patient;
        });
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.patientSubscription.unsubscribe();
  }
}
