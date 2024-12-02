import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private apiUrl = 'https://www.presenteprofe.cl/api/v1/cursos'; // URL base de la API

  constructor(private http: HttpClient) {}

  // Método para crear curso
  async createCourse(courseData: any): Promise<any> {
    const token = await this.getToken(); // Obtener el token desde el almacenamiento
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Incluir el token en los encabezados
      'Content-Type': 'application/json', // Establecer el tipo de contenido si es necesario
    });

    return this.http.post(this.apiUrl, courseData, { headers }).toPromise();
  }

  // Método para obtener los cursos del estudiante
  async obtenerCursos(): Promise<Observable<any>> {
    const token = await this.getToken(); // Obtener token desde Capacitor Storage
    const email = await this.getEmail(); // Obtener email desde Capacitor Storage

    if (!token || !email) {
      throw new Error('No hay un token de autenticación o correo guardado.');
    }

    // Configurar headers y parámetros para la solicitud
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const params = new HttpParams().set('user', email);

    // Realizar la solicitud GET
    return this.http.get(this.apiUrl, { headers, params });
  }

  // Método para obtener token desde Capacitor Storage
  private async getToken(): Promise<string | null> {
    const { value } = await Storage.get({ key: 'auth_token' });
    return value;
  }

  // Método para obtener email desde Capacitor Storage
  private async getEmail(): Promise<string | null> {
    const { value } = await Storage.get({ key: 'auth_email' });
    return value;
  }

  // Método para obtener la asistencia de un curso
  async obtenerAsistenciaCurso(cursoId: number): Promise<Observable<any>> {
    // Obtener el token del Storage
    const token = await this.getToken();
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }

    // Establecer los headers con el token de autenticación
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Realizar la solicitud GET con el ID del curso
    const url = `${this.apiUrl}/${cursoId}`;
    return this.http.get<any>(url, { headers });
  }

  // Nuevo método para obtener las clases de un curso
  async obtenerClasesPorCurso(cursoId: number): Promise<Observable<any>> {
    // Obtener el token del Storage
    const token = await this.getToken();
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }

    // Configurar headers con el token de autenticación
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Construir la URL de la solicitud
    const url = `${this.apiUrl}/${cursoId}/clase`;

    // Realizar la solicitud GET para obtener las clases
    return this.http.get<any>(url, { headers });
  }
}
