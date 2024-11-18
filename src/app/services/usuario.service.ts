import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'https://www.presenteprofe.cl/api/v1'; // URL base de la API

  constructor(private http: HttpClient) { }

  // Método para registrar un nuevo usuario
  registerUser(codigo: string, run: string, nombre: string, apellido: string, correo: string, perfil: string): Observable<any> {
    const body = {
      codigo,
      run,
      nombre,
      apellido,
      correo,
      perfil
    };

    return this.http.post<any>(`${this.apiUrl}/usuarios`, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': 'application/json'
      })
    });
  }
}
