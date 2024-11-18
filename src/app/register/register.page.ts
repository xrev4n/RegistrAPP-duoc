import { Component } from '@angular/core';
import { UsuarioService } from '../services/usuario.service'; // Asegúrate de importar el servicio
import { AlertController } from '@ionic/angular'; // Para mostrar alertas

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  codigo: string = ''; // Para el código de invitación
  run: string = ''; // Para el RUN
  nombre: string = ''; // Para el nombre
  apellido: string = ''; // Para el apellido
  correo: string = ''; // Para el correo
  perfil: string = 'estudiante'; // Perfil (por defecto estudiante)

  constructor(private usuarioService: UsuarioService, private alertCtrl: AlertController) { }

  // Método para registrar usuario
  async register() {
    if (!this.codigo || !this.run || !this.nombre || !this.apellido || !this.correo || !this.perfil) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Por favor complete todos los campos.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    this.usuarioService.registerUser(this.codigo, this.run, this.nombre, this.apellido, this.correo, this.perfil).subscribe(async (response) => {
      if (response.message === 'Usuario registrado exitosamente') {
        const alert = await this.alertCtrl.create({
          header: 'Éxito',
          message: 'Usuario registrado exitosamente. Credenciales de ingreso enviadas al correo.',
          buttons: ['OK']
        });
        await alert.present();
      } else {
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'Hubo un problema al registrar el usuario. Por favor, intenta de nuevo.',
          buttons: ['OK']
        });
        await alert.present();
      }
    }, async (error) => {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Ocurrió un error al registrar el usuario.',
        buttons: ['OK']
      });
      await alert.present();
    });
  }
}
