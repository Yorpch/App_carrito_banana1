import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Ajusta esta URL al endpoint de tu servicio web (REST o Gateway)
  private apiUrl = 'http://localhost:3000/api/pagos';

  constructor(private http: HttpClient) { }

  enviarFormulario(datos: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Envío de la petición POST con los datos del formulario
    return this.http.post(this.apiUrl, datos, { headers });
  }
}