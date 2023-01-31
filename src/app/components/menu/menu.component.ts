import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'labmedical-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements AfterViewInit {
  readonly menuCategories = [
    {
      title: 'geral',
      items: [
        { title: 'início', icon: 'list', page: '/home' },
        {
          title: 'sair',
          icon: 'logout',
          click: () => this.logout(),
        },
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

  @ViewChild('toggleButton') toggleButton!: ElementRef<HTMLButtonElement>;

  constructor(private router: Router, private authService: AuthService) {}

  ngAfterViewInit(): void {
    if (window.matchMedia('screen and (max-width: 768px)').matches) {
      this.toggleButton.nativeElement.click();
    }
  }

  shouldDisplay() {
    return !this.router.isActive('/login', {
      paths: 'exact',
      queryParams: 'exact',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }

  logout() {
    this.authService.logout();
  }
}
