import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@capacitor/storage'; // Importar Capacitor Storage

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://www.presenteprofe.cl/api/v1/auth'; // Cambia esto por tu URL real
  private userName: string | null = null; // Variable para almacenar el nombre del usuario

  constructor(private http: HttpClient) { }

  // Método para iniciar sesión
  login(correo: string, password: string): Observable<any> {
    const body = { correo, password };
    return this.http.post<any>(`${this.apiUrl}`, body);
  }

  // Método para guardar el nombre del usuario
  setUserName(name: string) {
    this.userName = name; // Guarda el nombre del usuario
  }

  // Método para obtener el nombre del usuario
  getUserName(): string | null {
    return this.userName; // Devuelve el nombre del usuario
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
    const correo = this.getUserName(); // Usamos el correo del usuario almacenado
    if (!correo) {
      throw new Error('Correo del usuario no encontrado.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });

    return this.http.get<any>(`${this.apiUrl}/me?user=${encodeURIComponent(correo)}`, { headers });
  }

  // Método para recuperar la contraseña
  recoverPassword(correo: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/recuperar`, { correo });
  }

  // Método para guardar el token en Storage
  async setToken(token: string) {
    await Storage.set({
      key: 'auth_token',
      value: token
    });
  }
}
