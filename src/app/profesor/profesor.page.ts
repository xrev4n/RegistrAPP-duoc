import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {

  userName: string | null = '';
  userInfo: any = null;

  constructor(private authService: AuthService, private navCtrl: NavController) {}

  async ngOnInit() {
    // Obtener el nombre del usuario al cargar la página
    this.userName = await this.authService.getUserName();

    // Obtener la información del usuario si el nombre está disponible
    if (this.userName) {
      try {
        const userInfo$ = await this.authService.getUserInfo();
        userInfo$.subscribe(
          (response) => {
            if (response.message === 'Success') {
              this.userInfo = response.data;
            }
          },
          (error) => {
            console.error('Error al obtener los datos del usuario:', error);
          }
        );
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    } else {
      console.log('No se encontró nombre de usuario.');
    }
  }

  async logout() {
    // Llama al método de logout del AuthService
    await this.authService.logout();

    // Redirige al usuario a la página de inicio (home)
    this.navCtrl.navigateRoot('/home');
  }
}
