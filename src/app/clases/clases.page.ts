import { Component } from '@angular/core';
import { CursosService } from '../services/cursos.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage {
  idCurso: number = 0;
  clases: any[] = [];

  constructor(private cursosService: CursosService, private alertController: AlertController, private router: Router) {}

  async obtenerClases() {
    if (!this.idCurso) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor ingrese un ID de curso válido.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    (await this.cursosService.obtenerClasesPorCurso(this.idCurso)).subscribe({
      next: (response) => {
        this.clases = response.clases || [];
      },
      error: async (err) => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'No se pudo obtener la lista de clases. Inténtelo nuevamente.',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }
    // Método para navegar a la página de generación de QR
    goToQrGenerator(codigoWeb: string) {
      if (codigoWeb) {
        this.router.navigate(['/qr-generator', { codigo: codigoWeb }]);
      }
    }
}
