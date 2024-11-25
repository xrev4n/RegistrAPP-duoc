import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';  // Para usar el token de autenticación

@Injectable({
  providedIn: 'root',
})
export class AsistenciaService {
  private apiUrl = 'https://www.presenteprofe.cl/api/v1/clases';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Método para registrar asistencia
  registrarAsistencia(code: string): Observable<any> {
    return new Observable(observer => {
      // Obtener el token del usuario
      this.authService.getToken().then(token => {
        if (!token) {
          observer.error('No autenticado');
          return;
        }

        // Configurar los encabezados
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        });

        // Realizar la solicitud POST
        this.http.post<any>(`${this.apiUrl}/${code}/asistencia`, {}, { headers })
          .subscribe(
            response => {
              if (response.message === 'Ya has registrado tu asistencia') {
                observer.next({ success: true, message: response.message });
              } else if (response.message === 'Asistencia registrada con éxito') {
                observer.next({ success: true, message: response.message });
              } else {
                observer.error('Error en la respuesta del servidor');
              }
            },
            error => {
              // Manejar los posibles errores
              if (error.status === 401) {
                observer.error('No autenticado');
              } else if (error.status === 404) {
                observer.error('Código de clase incorrecto');
              } else {
                observer.error('Error en la solicitud');
              }
            }
          );
      });
    });
  }
}
