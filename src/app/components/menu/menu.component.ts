import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
          page: 'pacientes',
        },
      ],
    },
    {
      title: 'exames',
      items: [
        {
          title: 'cadastrar consulta',
          icon: 'add',
          page: 'consultas/novo',
        },
        { title: 'cadastrar exame', icon: 'add', page: 'exames/novo' },
      ],
    },
  ];

  displayButtonText: boolean = true;

  constructor(private router: Router) {}

  shouldDisplay() {
    return !this.router.isActive('/login', {
      paths: 'exact',
      queryParams: 'exact',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }

  toggleButtonText(toggleButton: HTMLElement) {
    this.displayButtonText = !toggleButton.classList.contains('collapsed');
  }
}
