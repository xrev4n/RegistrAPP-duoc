import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  async login() {
    this.authService.login(this.username, this.password).subscribe(
      async (response) => {
        if (response.message === 'Success') {
          // Guardar el nombre de usuario
          this.authService.setUserName(this.username);

          // Extraer y guardar el token
          const token = response.auth.token;
          await this.authService.setToken(token);

          // Navegar a la página principal
          this.navCtrl.navigateForward('/main-page');
        } else {
          // Mensaje de error por credenciales incorrectas
          const alert = await this.alertCtrl.create({
            header: 'Error',
            message: 'Usuario y/o contraseña incorrectos, por favor intente nuevamente.',
            buttons: ['OK'],
          });
          await alert.present();
        }
      },
      async (error) => {
        // Manejo de errores del servidor o conexión
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'Ocurrió un error al iniciar sesión. Por favor, intente nuevamente.',
          buttons: ['OK'],
        });
        await alert.present();
        console.error('Error al iniciar sesión:', error);
      }
    );
  }
}
