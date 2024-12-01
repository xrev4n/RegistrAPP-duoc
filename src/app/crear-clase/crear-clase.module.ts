import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearClasePageRoutingModule } from './crear-clase-routing.module';

import { CrearClasePage } from './crear-clase.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CrearClasePageRoutingModule
  ],
  declarations: [CrearClasePage]
})
export class CrearClasePageModule {}