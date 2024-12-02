import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClasesPage } from './clases.page';
import { CrearClasePage } from '../crear-clase/crear-clase.page';

const routes: Routes = [
  {
    path: '',
    component: ClasesPage
  },
  {
    path: 'crear-clase',
    component: CrearClasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClasesPageRoutingModule {}
