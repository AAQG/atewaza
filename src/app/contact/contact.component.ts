import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  feedbackMessage = signal('');
  feedbackType = signal<'success' | 'error' | null>(null);

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.feedbackMessage.set('Por favor, completa todos los campos.');
      this.feedbackType.set('error');
      return;
    }
    
    // Aquí iría la lógica para enviar el formulario a un backend
    console.log('Formulario enviado:', form.value);

    this.feedbackMessage.set('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
    this.feedbackType.set('success');
    form.reset();

    setTimeout(() => {
      this.feedbackMessage.set('');
      this.feedbackType.set(null);
    }, 5000);
  }
}