import { Component } from '@angular/core';
import { EstudiantesService } from '../estudiantes.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage {
  cursoId: number = 0; // El ID del curso
  mensaje: string = ''; // Mensaje que se mostrará
  asistencia: any = null; // Datos de asistencia

  constructor(
    private estudiantesService: EstudiantesService
  ) {}

  // Método para obtener la asistencia
  async obtenerAsistencia() {
    if (this.cursoId <= 0) {
      this.mensaje = 'Por favor, ingresa un ID de curso válido.';
      return;
    }
  
    try {
      // Llamamos al servicio para obtener la asistencia
      const asistenciaObservable = await this.estudiantesService.obtenerAsistenciaCurso(this.cursoId);
      asistenciaObservable.subscribe({
        next: (data) => {
          this.asistencia = data; // Almacenar la información de la asistencia
          this.mensaje = 'Asistencia obtenida con éxito.';
        },
        error: (err) => {
          this.asistencia = null;
          if (err instanceof Error) {
            // Verifica que el error sea una instancia de Error
            this.mensaje = 'Error al obtener la asistencia: ' + err.message;
          } else {
            // Si el error no es una instancia de Error, maneja el caso general
            this.mensaje = 'Error desconocido al obtener la asistencia.';
          }
        },
      });
    } catch (error) {
      // Manejo de errores con tipo desconocido
      if (error instanceof Error) {
        this.mensaje = 'Error al obtener la asistencia: ' + error.message;
      } else {
        this.mensaje = 'Error desconocido al obtener la asistencia.';
      }
    }
  }
  
}
