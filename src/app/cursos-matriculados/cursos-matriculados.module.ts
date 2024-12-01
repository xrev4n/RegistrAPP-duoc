import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CursosMatriculadosPageRoutingModule } from './cursos-matriculados-routing.module';

import { CursosMatriculadosPage } from './cursos-matriculados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CursosMatriculadosPageRoutingModule
  ],
  declarations: [CursosMatriculadosPage]
})
export class CursosMatriculadosPageModule {}
