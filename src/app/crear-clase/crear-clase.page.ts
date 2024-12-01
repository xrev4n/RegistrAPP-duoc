import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClasesService } from '../services/clases.service';
import { Router } from '@angular/router'; // Importar Router

@Component({
  selector: 'app-crear-clase',
  templateUrl: './crear-clase.page.html',
  styleUrls: ['./crear-clase.page.scss'],
})
export class CrearClasePage {
  claseForm: FormGroup;
  respuestaClase: any | null = null; // Almacena la respuesta de la API
  error: string | null = null; // Almacena mensajes de error

  constructor(private fb: FormBuilder, private clasesService: ClasesService, private router: Router) {
    // Inicialización del formulario
    this.claseForm = this.fb.group({
      fecha: ['', Validators.required],
      hora_inicio: ['', Validators.required],
      hora_termino: ['', Validators.required],
      id_curso: ['', Validators.required], // ID del curso
    });
  }

  async onSubmit() {
    if (this.claseForm.invalid) return;

    const { id_curso, ...claseData } = this.claseForm.value;

    try {
      this.respuestaClase = await this.clasesService.crearClase(
        id_curso,
        claseData
      );
      this.error = null; // Limpiar errores
    } catch (err: any) {
      this.respuestaClase = null; // Limpiar respuesta
      this.error = err.error?.message || 'Error al crear la clase.';
    }
  }

  // Método para navegar a la página de generación de QR
  goToQrGenerator() {
    if (this.respuestaClase && this.respuestaClase.codigo_qr) {
      this.router.navigate(['/qr-generator', { codigo: this.respuestaClase.codigo_qr }]);
    }
  }
}
