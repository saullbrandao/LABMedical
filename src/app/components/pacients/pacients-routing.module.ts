import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacientResolver } from './pacient.resolver';
import { PacientsFormComponent } from './pacients-form/pacients-form.component';

const routes: Routes = [
  {
    path: 'novo',
    component: PacientsFormComponent,
  },
  {
    path: 'editar/:id',
    component: PacientsFormComponent,
    resolve: { pacient: PacientResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacientsRoutingModule {}
