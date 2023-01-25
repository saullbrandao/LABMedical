import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { PatientsService } from '../patients.service';

@Component({
  selector: 'labmedical-medical-records',
  templateUrl: './medical-records.component.html',
  styleUrls: ['./medical-records.component.scss'],
})
export class MedicalRecordsComponent implements OnInit {
  patients: Patient[] = [];
  filteredPatients = this.patients;

  constructor(private patientsService: PatientsService) {}

  ngOnInit(): void {
    this.patientsService
      .getAll()
      .subscribe((data) => this.patients.push(...data));
  }

  searchPatients(searchTerm: string) {
    this.filteredPatients = this.patients.filter((patient) => {
      const name = patient.nome.toLowerCase();
      const term = searchTerm.toLowerCase();

      return name.includes(term) || patient.id?.toString().includes(term);
    });
  }
}
