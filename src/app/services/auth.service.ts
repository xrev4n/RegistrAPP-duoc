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

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  login(correo: string, password: string): Observable<any> {
    const body = { correo, password };
    return this.http.post<any>(`${this.apiUrl}`, body);
  }

  // Método para obtener la información del usuario autenticado
  async getUserInfo(): Promise<Observable<any>> {
    const token = await this.getToken();
    if (!token) {
      throw new Error('Token no encontrado. El usuario no está autenticado.');
    }

    let correo = this.userName;
    if (!correo) {
      // Intenta recuperar el correo del almacenamiento
      const { value } = await Storage.get({ key: 'auth_email' });
      correo = value;
      if (!correo) {
        throw new Error('Correo del usuario no encontrado.');
      }
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    });

    // Llamada al endpoint /me para obtener la información completa del usuario
    return this.http.get<any>(`${this.apiUrl}/me?user=${encodeURIComponent(correo)}`, { headers });
  }

  // Modifica el setUserName para guardar el correo en Storage
  setUserName(name: string) {
    this.userName = name;
    Storage.set({ key: 'auth_email', value: name });
  }

  // Método para obtener el nombre del usuario
  async getUserName(): Promise<string | null> {
    const { value } = await Storage.get({ key: 'auth_email' });
    return value;
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

  // Método para recuperar la contraseña
  recoverPassword(correo: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/recuperar`, { correo });
  }

  //Método para manejar la persistencia
  async checkToken(): Promise<boolean> {
    const token = await this.getToken(); // Obtén el token del storage
    if (token) {
      console.log('Token encontrado:', token);
      return true; // Asume que el token es válido
    } else {
      console.log('No se encontró token en el almacenamiento.');
      return false;
    }
  }

  // Método para cerrar sesión y borrar el token
  async logout(): Promise<void> {
    await Storage.remove({ key: 'auth_token' });
    await Storage.remove({ key: 'auth_email' });
    this.userName = null;
    console.log('Sesión cerrada y token eliminado.');
  }
}
