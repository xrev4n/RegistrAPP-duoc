import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursosPage } from './cursos.page';
import { CrearCursoPage } from '../crear-curso/crear-curso.page';

const routes: Routes = [
  {
    path: '',
    component: CursosPage
  },
  {
    path: 'crear-curso',
    component: CrearCursoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursosPageRoutingModule {}
