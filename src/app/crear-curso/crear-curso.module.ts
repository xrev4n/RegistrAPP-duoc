import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Asegúrate de importar ReactiveFormsModule
import { IonicModule } from '@ionic/angular';

import { CrearCursoPageRoutingModule } from './crear-curso-routing.module';
import { CrearCursoPage } from './crear-curso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Importa ReactiveFormsModule aquí
    IonicModule,
    CrearCursoPageRoutingModule
  ],
  declarations: [CrearCursoPage]
})
export class CrearCursoPageModule {}
