import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearClasePage } from './crear-clase.page';
import { QrGeneratorPage } from '../qr-generator/qr-generator.page';

const routes: Routes = [
  {
    path: '',
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
export class CrearClasePageRoutingModule {}
