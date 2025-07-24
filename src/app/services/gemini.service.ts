import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  // En un proyecto real, la API Key no debería estar aquí.
  private apiKey = "";
  private apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.apiKey}`;

  constructor(private http: HttpClient) { }

  generatePlan(prompt: string): Observable<string> {
    const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
    return this.http.post<any>(this.apiUrl, payload).pipe(
      map(response => {
        if (response.candidates?.length > 0) {
          return response.candidates[0].content.parts[0].text;
        }
        throw new Error('Respuesta inesperada de la API.');
      }),
      catchError(error => {
        console.error("Error en el servicio de Gemini:", error);
        return of('<p class="text-center text-red-500">Lo sentimos, no pudimos generar tu plan en este momento. Por favor, intenta de nuevo más tarde.</p>');
      })
    );
  }
}