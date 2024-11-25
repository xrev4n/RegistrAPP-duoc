import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private navCtrl: NavController,
    private authService: AuthService
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.platform.ready();

    const isAuthenticated = await this.authService.checkToken(); // Verificar si el token es válido
    if (isAuthenticated) {
      // Si el usuario está autenticado, obtenemos su perfil
      try {
        const userInfoObservable = await this.authService.getUserInfo(); // Obtener la información del usuario
        userInfoObservable.subscribe(
          async (userInfo: any) => {
            if (userInfo && userInfo.message === 'Success') {
              const perfil = userInfo.data.perfil;  // Obtener el perfil (rol)
              
              if (perfil === 'docente') {
                // Redirigir a la página de profesor si el rol es 'profesor'
                this.navCtrl.navigateRoot('/profesor');
              } else {
                // Redirigir a la página principal si el rol es estudiante u otro
                this.navCtrl.navigateRoot('/main-page');
              }
            } else {
              // Si no se pudo obtener la información del usuario
              this.navCtrl.navigateRoot('/home'); // Redirigir a la página de inicio de sesión
            }
          },
          async (error: any) => {
            // Manejo de errores si ocurre algún problema al obtener la información
            console.error('Error al obtener el perfil del usuario:', error);
            this.navCtrl.navigateRoot('/home'); // Redirigir a la página de inicio de sesión en caso de error
          }
        );
      } catch (error) {
        console.error('Error al obtener la información del usuario:', error);
        this.navCtrl.navigateRoot('/home'); // Redirigir a la página de inicio de sesión si no se puede obtener el perfil
      }
    } else {
      // Si el usuario no está autenticado, redirigir a la página de inicio de sesión
      this.navCtrl.navigateRoot('/home');
    }
  }
}
