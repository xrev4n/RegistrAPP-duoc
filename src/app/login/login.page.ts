import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular'; // Importamos NavController y AlertController

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = '';  // Variable para el nombre de usuario
  password: string = '';  // Variable para la contraseña

  constructor(private navCtrl: NavController, private alertCtrl: AlertController) { }

  ngOnInit() {}

  // Metodo para verificar las credenciales del usuario
  async login() {
    if (this.username === 'admin' && this.password === 'admin') {
      // Redirigir a la pagina principal si las credenciales son correctas
      this.navCtrl.navigateForward('/main-page');
    } else {
      // Mostrar un alert si las credenciales son incorrectas
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Usuario y/o contraseña incorrectos, por favor intente nuevamente.',
        buttons: ['OK']
      });

      await alert.present();
    }
  }
}
