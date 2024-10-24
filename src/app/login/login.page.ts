import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service'; // Asegúrate de importar el servicio

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = '';
  password: string = '';

  constructor(private navCtrl: NavController, private alertCtrl: AlertController, private authService: AuthService) { }

  ngOnInit() {}

  async login() {
    this.authService.login(this.username, this.password).subscribe(async (response) => {
      if (response.message === 'Success') {
        // Guardar el nombre del usuario
        this.authService.setUserName(this.username);
        this.navCtrl.navigateForward('/main-page');
      } else {
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'Usuario y/o contraseña incorrectos, por favor intente nuevamente.',
          buttons: ['OK']
        });
        await alert.present();
      }
    }, async (error) => {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Ocurrió un error al iniciar sesión.',
        buttons: ['OK']
      });
      await alert.present();
    });
  }
}
