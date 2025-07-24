import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [],
  templateUrl: './servicios.component.html',
  styles: ``
})
export class ServiciosComponent {
  services: { title: string; description: string; iconUrl: string; }[];

  constructor(private sanitizer: DomSanitizer) {
    this.services = [
      { 
        title: 'KICKBOXING', 
        description: 'Potencia, velocidad y resistencia. Un entrenamiento completo que combina boxeo y patadas.',
        iconUrl: 'assets/icons/kickboxing.svg' 
      },
      { 
        title: 'KARATE', 
        description: 'Arte marcial tradicional enfocado en la técnica, la disciplina mental y la defensa personal.',
         iconUrl: 'assets/icons/karate.svg'
      },
      { 
        title: 'JUDO', 
        description: '"El camino de la suavidad". Domina las proyecciones, inmovilizaciones y el control del oponente.',
        iconUrl: 'assets/icons/judo.svg'
      },
      { 
        title: 'ARMAS', 
        description: 'Aprende el manejo de armas tradicionales como parte de tu formación marcial avanzada.',
        iconUrl: 'assets/icons/armas.svg'
      }
    ];
  }
}
