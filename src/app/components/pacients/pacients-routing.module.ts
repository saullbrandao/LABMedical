import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacientsFormComponent } from './pacients-form/pacients-form.component';

const routes: Routes = [
  {
    path: 'novo',
    component: PacientsFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacientsRoutingModule {}
