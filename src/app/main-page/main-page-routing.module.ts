import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPagePage } from './main-page.page';
import { QrScannerPage } from '../qrscanner/qrscanner.page';
import { CursosMatriculadosPage } from '../cursos-matriculados/cursos-matriculados.page';
import { AsistenciaPage } from '../asistencia/asistencia.page';

const routes: Routes = [
  {
    path: '',
    component: MainPagePage
  },
  {
    path: 'qrscanner',
    component: QrScannerPage
  },
  {
    path: 'cursos-matriculados',
    component: CursosMatriculadosPage
  },
  {
    path: 'asistencia',
    component: AsistenciaPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPagePageRoutingModule {}
