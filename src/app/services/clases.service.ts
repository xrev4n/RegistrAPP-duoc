import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root',
})
export class ClasesService {
  private baseUrl = 'https://www.presenteprofe.cl/api/v1/cursos';

  constructor(private http: HttpClient) {}

  // Método para crear una clase
  async crearClase(idCurso: number, claseData: any) {
    const token = await this.getToken();
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const url = `${this.baseUrl}/${idCurso}/clase`;

    return this.http.post(url, claseData, { headers }).toPromise();
  }

  // Obtener el token de autenticación desde el almacenamiento
  private async getToken(): Promise<string | null> {
    const { value } = await Storage.get({ key: 'auth_token' });
    return value;
  }
}
