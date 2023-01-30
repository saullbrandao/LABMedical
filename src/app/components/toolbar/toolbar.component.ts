import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'labmedical-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  title!: Subject<string>;
  username: string | undefined = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private titleService: TitleService
  ) {}

  ngOnInit(): void {
    this.getUserName();
    this.getPageTitle();
  }

  shouldDisplay() {
    return !this.router.isActive('/login', {
      paths: 'exact',
      queryParams: 'exact',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }

  getUserName() {
    this.username = this.authService.getToken()?.user.name;
  }

  getPageTitle() {
    this.title = this.titleService.getPageTitle();
  }
}
