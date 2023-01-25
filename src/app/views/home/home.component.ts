import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { PatientsService } from '../patients/patients.service';

@Component({
  selector: 'labmedical-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  readonly systemStats = [
    {
      name: 'pacientes',
      quantity: 70,
      icon: 'patients',
    },
    {
      name: 'consultas',
      quantity: 104,
      icon: 'medical-appointment',
    },
    {
      name: 'exames',
      quantity: 102,
      icon: 'medical-report',
    },
  ];

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

      return (
        name.includes(term) ||
        patient.email?.includes(term) ||
        patient.telefone.includes(term)
      );
    });
  }
}
