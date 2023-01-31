import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Patient } from 'src/app/models/patient';
import { PatientsService } from 'src/app/views/patients/patients.service';

@Component({
  selector: 'labmedical-search-patient',
  templateUrl: './search-patient.component.html',
  styleUrls: ['./search-patient.component.scss'],
})
export class SearchPatientComponent implements OnDestroy {
  @Output() selectedPatient: EventEmitter<Patient> = new EventEmitter();
  selectedPatientId: number | undefined;
  patients: Patient[] = [];
  patientsSearchSubscription: Subscription = new Subscription();

  constructor(
    private patientsService: PatientsService,
    private route: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    this.patientsSearchSubscription.unsubscribe();
  }

  searchPatient(term: string) {
    this.patientsSearchSubscription = this.patientsService
      .getByName(term)
      .subscribe((patients) => {
        this.patients = patients;
        this.selectedPatient.emit({} as Patient);
      });
  }

  selectPatient(patient: Patient) {
    this.selectedPatient.emit(patient);
    this.selectedPatientId = patient.id;
  }

  shouldDisplay() {
    return !this.route.routeConfig?.path?.includes('editar');
  }
}
