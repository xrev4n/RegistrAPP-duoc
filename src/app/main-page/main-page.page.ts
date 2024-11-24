import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.page.html',
  styleUrls: ['./main-page.page.scss'],
})
export class MainPagePage implements OnInit {
  userName: string | null = '';

  constructor(private authService: AuthService, private navCtrl: NavController) {}

  async ngOnInit() {
    // Obtener el nombre del usuario al cargar la página
    this.userName = this.authService.getUserName();
  }

  async logout() {
    // Llama al método de logout del AuthService
    await this.authService.logout();

    // Redirige al usuario a la página de inicio (home)
    this.navCtrl.navigateRoot('/home');
  }
}
