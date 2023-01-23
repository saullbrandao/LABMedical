import { Component, OnInit } from '@angular/core';
import { PacientsService } from 'src/app/components/pacients/pacients.service';
import { Pacient } from 'src/app/shared/models/pacient';

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
      icon: 'pacients',
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

      return (
        name.includes(term) ||
        pacient.email?.includes(term) ||
        pacient.telefone.includes(term)
      );
    });
  }
}
