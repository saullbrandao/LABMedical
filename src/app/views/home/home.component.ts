import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { AppointmentsService } from '../appointments/appointments.service';
import { ExamsService } from '../exams/exams.service';
import { PatientsService } from '../patients/patients.service';

@Component({
  selector: 'labmedical-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  systemStats = {
    pacientes: {
      quantity: 0,
      icon: 'patients',
    },
    consultas: {
      quantity: 0,
      icon: 'medical-appointment',
    },
    exames: {
      quantity: 0,
      icon: 'medical-report',
    },
  };

  patients: Patient[] = [];

  filteredPatients = this.patients;

  constructor(
    private patientsService: PatientsService,
    private appointmentsService: AppointmentsService,
    private examsService: ExamsService
  ) {}

  ngOnInit(): void {
    this.patientsService.getAll().subscribe((patients) => {
      this.systemStats.pacientes.quantity = patients.length;
      this.patients.push(...patients);
    });

    this.appointmentsService.getAll().subscribe((appointments) => {
      this.systemStats.consultas.quantity = appointments.length;
    });

    this.examsService.getAll().subscribe((exams) => {
      this.systemStats.exames.quantity = exams.length;
    });
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

  keepOrder = (a: any, b: any) => {
    return a;
  };
}
