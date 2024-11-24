import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://www.presenteprofe.cl/api/v1/auth';
  private userName: string | null = null;

  constructor(private http: HttpClient) { }

  // Método para iniciar sesión
  login(correo: string, password: string): Observable<any> {
    const body = { correo, password };
    return this.http.post<any>(`${this.apiUrl}`, body);
  }

  // Método para guardar el nombre del usuario
  setUserName(name: string) {
    this.userName = name;
  }

  // Método para obtener el nombre del usuario
  getUserName(): string | null {
    return this.userName;
  }

  // Método para guardar el token en Storage
  async setToken(token: string) {
    await Storage.set({
      key: 'auth_token',
      value: token,
    });
  }

  // Método para obtener el token desde el Storage
  async getToken(): Promise<string | null> {
    const { value } = await Storage.get({ key: 'auth_token' });
    return value;
  }

  // Método para obtener la información del usuario autenticado
  async getUserInfo(): Promise<Observable<any>> {
    const token = await this.getToken();
    if (!token) {
      throw new Error('Token no encontrado. El usuario no está autenticado.');
    }

    const correo = this.getUserName();
    if (!correo) {
      throw new Error('Correo del usuario no encontrado.');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    });

    return this.http.get<any>(
      `${this.apiUrl}/me?user=${encodeURIComponent(correo)}`,
      { headers }
    );
  }

  // Método para recuperar la contraseña
  recoverPassword(correo: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/recuperar`, { correo });
  }

  //Metodo para manejar la persistencia
  async checkToken(): Promise<boolean> {
    const token = await this.getToken(); // Obtén el token del storage
    if (token) {
      console.log('Token encontrado:', token);

      // Aquí puedes agregar lógica para validar el token si es necesario
      return true; // Asume que el token es válido
    } else {
      console.log('No se encontró token en el almacenamiento.');
      return false;
    }
  }

  // Método para cerrar sesión y borrar el token
  async logout(): Promise<void> {
    // Borra el token del almacenamiento
    await Storage.remove({ key: 'auth_token' });

    // Limpia la variable de usuario local
    this.userName = null;

    console.log('Sesión cerrada y token eliminado.');
  }


}

