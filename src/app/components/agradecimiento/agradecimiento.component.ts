import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ParticlesComponent } from '../../shared/particles/particles.component';
import { CardService } from '../../services/card.service';
import { PaymentService } from '../../services/payment.service';
import { gsap } from 'gsap';

declare var anime: any; 

@Component({
  selector: 'app-agradecimiento',
  imports: [ParticlesComponent],
  templateUrl: './agradecimiento.component.html',
  styleUrl: './agradecimiento.component.css'
})
export class AgradecimientoComponent {

  constructor(
    private router: Router,
    private cardService: CardService,
    private paymentService: PaymentService
  ) {}
  

  redirigir(): void {
    // Limpiar solo las cartas seleccionadas y el estado de pago de la sesión
    // NO borrar el contador de tiradas para que el pago funcione
    this.cardService.clearSelectedCards();
    this.paymentService.clearPaidSession();
    localStorage.removeItem('tema');
    this.router.navigate(['/']);
  }
}
