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

    const isAuthenticated = await this.authService.checkToken();
    if (isAuthenticated) {
      // Redirige al usuario a la página principal
      this.navCtrl.navigateRoot('/main-page');
    } else {
      // Redirige al usuario a la página de inicio de sesión
      this.navCtrl.navigateRoot('/home');
    }
  }
}
