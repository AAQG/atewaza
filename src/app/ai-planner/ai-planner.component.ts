import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GeminiService } from '../services/gemini.service';
import { Observable, of } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-ai-planner',
  standalone: true,
  imports: [
    FormsModule, // Necesario para [(ngModel)]
    AsyncPipe    // Necesario para el pipe 'async'
  ],
  templateUrl: './ai-planner.component.html',
})
export class AiPlannerComponent {
  disciplinas = ['Kickboxing', 'Karate', 'Judo', 'Defensa Personal'];
  objetivos = ['Mejorar Resistencia', 'Ganar Fuerza', 'Aprender Defensa Personal', 'Bajar de Peso', 'Competir'];
  dias = ['2 días', '3 días', '4 días', '5 días'];

  // Usando Signals para el estado del formulario
  selectedDisciplina = signal(this.disciplinas[0]);
  selectedObjetivo = signal(this.objetivos[0]);
  selectedDias = signal(this.dias[0]);

  isLoading = signal(false);
  planResult$: Observable<string | null> = of(null);

  constructor(private geminiService: GeminiService) {}

  generatePlan() {
    this.isLoading.set(true);
    this.planResult$ = of(null);

    const prompt = `Actúa como un entrenador experto en artes marciales del club ATEWAZA en Perú. Crea un plan de entrenamiento semanal para un nuevo estudiante.
    - Disciplina de enfoque: ${this.selectedDisciplina()}
    - Objetivo principal: ${this.selectedObjetivo()}
    - Días de entrenamiento por semana: ${this.selectedDias()}

    El plan debe ser motivador, claro y estar en español. Organiza el plan por días (Día 1, Día 2, etc.). Para cada día, detalla los ejercicios, número de series/repeticiones o tiempo, y un breve consejo. Incluye calentamiento y enfriamiento. El tono debe ser alentador y profesional. Formatea la respuesta con Markdown. Termina con una frase motivadora para que se unan al club ATEWAZA.`;

    this.planResult$ = this.geminiService.generatePlan(prompt).pipe(
      map(text => this.formatResponse(text)),
      finalize(() => this.isLoading.set(false))
    );
  }

  private formatResponse(rawText: string): string {
    return rawText
      .replace(/(\*\*|__)(.*?)\1/g, '<strong>$2</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^- (.*$)/gm, '<li class="mb-2 ml-4 list-disc">$1</li>')
      .replace(/(Día \d+:.*)/g, '<h4 class="text-xl font-bold text-red-600 mt-4 mb-2">$1</h4>')
      .replace(/(Calentamiento:|Enfriamiento:)/g, '<h5 class="text-lg font-semibold text-gray-700 mt-3 mb-1">$1</h5>')
      .replace(/\n/g, '<br>');
  }
}