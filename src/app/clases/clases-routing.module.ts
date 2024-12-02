import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClasesPage } from './clases.page';
import { CrearClasePage } from '../crear-clase/crear-clase.page';
import { QrGeneratorPage } from '../qr-generator/qr-generator.page';

const routes: Routes = [
  {
    path: '',
    component: ClasesPage
  },
  {
    path: 'crear-clase',
    component: CrearClasePage
  },
  {
    path: 'qr-generator',
    component: QrGeneratorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClasesPageRoutingModule {}
