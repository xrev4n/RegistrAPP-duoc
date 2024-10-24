import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular'; 
import { AuthService } from '../services/auth.service'; // Importa el servicio de autenticación

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = '';  // Variable para el correo (en vez de username)
  password: string = '';  // Variable para la contraseña

  constructor(private navCtrl: NavController, private alertCtrl: AlertController, private authService: AuthService) { }

  ngOnInit() {}

  // Método para iniciar sesión
  async login() {
    // Llamar al servicio de autenticación
    this.authService.login(this.username, this.password).subscribe(
      async (response) => {
        // Si la autenticación es exitosa
        if (response.auth && response.auth.token) {
          // Guardar el token en localStorage
          localStorage.setItem('authToken', response.auth.token);

          // Redirigir a la página principal
          this.navCtrl.navigateForward('/main-page');
        }
      },
      async (error) => {
        // Manejo de errores de autenticación
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'Usuario y/o contraseña incorrectos, por favor intente nuevamente.',
          buttons: ['OK']
        });
        await alert.present();
      }
    );
  }
}
