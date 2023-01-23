import { Component, OnInit } from '@angular/core';
import { Pacient } from 'src/app/shared/models/pacient';
import { PacientsService } from '../pacients.service';

@Component({
  selector: 'labmedical-medical-records',
  templateUrl: './medical-records.component.html',
  styleUrls: ['./medical-records.component.scss'],
})
export class MedicalRecordsComponent implements OnInit {
  pacients: Pacient[] = [];
  filteredPacients = this.pacients;

  constructor(private pacientsService: PacientsService) {}

  ngOnInit(): void {
    this.pacientsService
      .getAll()
      .subscribe((data) => this.pacients.push(...data));
  }

  searchPacients(searchTerm: string) {
    this.filteredPacients = this.pacients.filter((pacient) => {
      const name = pacient.nome.toLowerCase();
      const term = searchTerm.toLowerCase();

      return name.includes(term) || pacient.id?.toString().includes(term);
    });
  }
}
