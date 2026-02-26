import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ParticlesComponent } from '../../shared/particles/particles.component';
import { CardService } from '../../services/card.service';
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
    private cardService: CardService
  ) {}


  redirigir(): void {
    this.cardService.clearSelectedCards();
    localStorage.removeItem('tema');
    this.router.navigate(['/']);
  }
}
