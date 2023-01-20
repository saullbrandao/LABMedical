import { Component, Input } from '@angular/core';

@Component({
  selector: 'labmedical-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Input() title: string = '';
}
