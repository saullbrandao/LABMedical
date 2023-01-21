import { Component } from '@angular/core';

@Component({
  selector: 'labmedical-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
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

  pacients = [
    {
      name: 'Saull Brandão',
      age: 31,
      phone: '(99) 9 9999-9999',
      email: 'test1@test.com',
      insurance: '',
    },
    {
      name: 'Bliss Mongeot',
      age: 23,
      phone: '(99) 9 9999-9999',
      email: 'test2@test.com',
      insurance: 'unimed',
    },
    {
      name: 'Dulcinea Ladel',
      age: 5,
      phone: '(99) 9 9999-9999',
      email: 'test3@test.com',
      insurance: 'plamev',
    },
    {
      name: 'Esme Dowbiggin',
      age: 49,
      phone: '(99) 9 9999-9999',
      email: 'test4@test.com',
      insurance: 'cauzzo',
    },
    {
      name: 'Jesselyn Plackstone',
      age: 71,
      phone: '(99) 9 9999-9999',
      email: 'test5@test.com',
      insurance: 'sul america',
    },
    {
      name: 'Nate Boxe',
      age: 10,
      phone: '(99) 9 9999-9999',
      email: 'test6@test.com',
      insurance: 'bradesco saúde',
    },
    {
      name: 'Donalt Hamblin',
      age: 35,
      phone: '(99) 9 9999-9999',
      email: 'test7@test.com',
      insurance: 'unimed',
    },
    {
      name: 'Victoria Farnorth',
      age: 55,
      phone: '(99) 9 9999-9999',
      email: 'test8@test.com',
      insurance: 'unimed',
    },
  ];

  filteredPacients = this.pacients;

  searchPacients(searchTerm: string) {
    this.filteredPacients = this.pacients.filter((pacient) => {
      const name = pacient.name.toLowerCase();
      const term = searchTerm.toLowerCase();

      return (
        name.includes(term) ||
        pacient.email.includes(term) ||
        pacient.phone.includes(term)
      );
    });
  }
}
