import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CursosService } from '../services/cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
})
export class CursosPage implements OnInit {
  cursos: any[] = [];
  mensaje: string = '';

  constructor(
    private cursosService: CursosService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.cargarCursos();
  }

  async cargarCursos() {
    try {
      const cursosObservable = await this.cursosService.obtenerCursos(); // Llamada al servicio
      cursosObservable.subscribe(
        (response) => {
          this.cursos = response.cursos; // Guardar los cursos obtenidos
          this.mensaje = response.message; // Mensaje de éxito
        },
        async (error) => {
          // Manejo de error en la suscripción
          const mensajeError = this.getErrorMessage(error);
          this.mensaje = mensajeError;
          await this.mostrarAlerta('Error al cargar cursos', mensajeError);
        }
      );
    } catch (error) {
      // Manejo de error en el try-catch
      const mensajeError = this.getErrorMessage(error);
      this.mensaje = mensajeError;
      await this.mostrarAlerta('Error', mensajeError);
    }
  }

  // Método para extraer el mensaje del error
  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message; // Error con mensaje específico
    } else if (typeof error === 'string') {
      return error; // Error como string
    } else {
      return 'Ha ocurrido un error inesperado.'; // Mensaje genérico
    }
  }

  // Método para mostrar alertas
  private async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
