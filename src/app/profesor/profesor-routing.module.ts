import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfesorPage } from './profesor.page';
import { CursosPage } from '../cursos/cursos.page';
import { CrearClasePage } from '../crear-clase/crear-clase.page';

const routes: Routes = [
  {
    path: '',
    component: ProfesorPage
  },
  {
    path: 'cursos',
    component: CursosPage
  },
  {
    path: 'crear-clase',
    component: CrearClasePage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesorPageRoutingModule {}
