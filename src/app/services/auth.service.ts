import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://www.presenteprofe.cl/api/v1/auth'; // Cambia esto por tu URL real
  private userName: string | null = null; // Variable para almacenar el nombre del usuario

  constructor(private http: HttpClient) { }

  login(correo: string, password: string): Observable<any> {
    const body = { correo, password };
    return this.http.post<any>(`${this.apiUrl}`, body);
  }

  setUserName(name: string) {
    this.userName = name; // Guarda el nombre del usuario
  }

  getUserName(): string | null {
    return this.userName; // Devuelve el nombre del usuario
  }

  getUserInfo(token: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  recoverPassword(correo: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/recuperar`, { correo });
  }
}
