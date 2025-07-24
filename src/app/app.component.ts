import { Component } from '@angular/core';
import { AiPlannerComponent } from './ai-planner/ai-planner.component';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { AboutComponent } from './about/about.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';


@Component({
  selector: 'app-root',
  standalone: true,
  // Importa los componentes directamente aquí
  imports: [
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    ServiciosComponent,
    AiPlannerComponent,
    ContactComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'atewaza-website';
}

