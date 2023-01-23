import { Component } from '@angular/core';

@Component({
  selector: 'labmedical-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  readonly menuCategories = [
    {
      title: 'geral',
      items: [
        { title: 'início', icon: 'list', page: '/' },
        { title: 'sair', icon: 'logout', page: '/logout' },
      ],
    },
    {
      title: 'pacientes',
      items: [
        { title: 'cadastrar', icon: 'add', page: 'pacientes/novo' },
        {
          title: 'listar prontuario',
          icon: 'list',
          page: 'pacientes/prontuarios',
        },
      ],
    },
    {
      title: 'exames',
      items: [
        {
          title: 'cadastrar consulta',
          icon: 'add',
          page: 'cadastrar-consultas',
        },
        { title: 'cadastrar exame', icon: 'add', page: 'cadastrar-exames' },
      ],
    },
  ];

  displayButtonText: boolean = true;

  toggleButtonText(toggleButton: HTMLElement) {
    this.displayButtonText = !toggleButton.classList.contains('collapsed');
  }
}
