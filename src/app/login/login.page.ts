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

          // Llamar a la API para obtener la información del usuario (perfil)
          try {
            const userInfoObservable = await this.authService.getUserInfo(); // Resuelve la promesa
            userInfoObservable.subscribe(
              async (userInfo: any) => {  // Asignar el tipo de 'userInfo'
                if (userInfo && userInfo.message === 'Success') {
                  const perfil = userInfo.data.perfil;  // Obtener el perfil (rol)
                  
                  // Redirigir según el perfil del usuario
                  if (perfil === 'docente') {
                    this.navCtrl.navigateForward('/profesor'); // Redirigir a página de profesor
                  } else if (perfil === 'estudiante') {
                    this.navCtrl.navigateForward('/main-page'); // Redirigir a página de estudiante
                  } else {
                    // Si no hay perfil definido, mostrar un error
                    const alert = await this.alertCtrl.create({
                      header: 'Error',
                      message: 'Perfil de usuario no reconocido.',
                      buttons: ['OK'],
                    });
                    await alert.present();
                  }
                } else {
                  const alert = await this.alertCtrl.create({
                    header: 'Error',
                    message: 'No se pudo obtener la información del usuario.',
                    buttons: ['OK'],
                  });
                  await alert.present();
                }
              },
              async (error: any) => {  // Asignar el tipo de 'error'
                const alert = await this.alertCtrl.create({
                  header: 'Error',
                  message: 'Ocurrió un error al obtener la información del usuario.',
                  buttons: ['OK'],
                });
                await alert.present();
                console.error('Error al obtener el perfil del usuario:', error);
              }
            );
          } catch (error) {
            const alert = await this.alertCtrl.create({
              header: 'Error',
              message: 'Ocurrió un error al obtener la información del usuario.',
              buttons: ['OK'],
            });
            await alert.present();
            console.error('Error al obtener la información del usuario:', error);
          }
        } else {
          const alert = await this.alertCtrl.create({
            header: 'Error',
            message: 'Usuario y/o contraseña incorrectos, por favor intente nuevamente.',
            buttons: ['OK'],
          });
          await alert.present();
        }
      },
      async (error) => {
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
