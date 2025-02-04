import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import { CardService } from '../../services/card.service';
import { ParticlesComponent } from '../../shared/particles/particles.component';

@Component({
  selector: 'app-cards',
  imports: [ParticlesComponent, CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
   animations: [
      trigger('fadeIn', [
        state('void', style({ opacity: 0 })),
        transition(':enter', [animate('1s ease-in', style({ opacity: 1 }))]),
      ]),
    ],
})
/**
 * Maneja la selección de una carta cuando se hace clic en ella.
 * 
 * Este método realiza las siguientes acciones:
 * 1. Verifica si ya se han seleccionado 3 cartas o si la carta ya está seleccionada.
 * 2. Actualiza el z-index de la carta seleccionada para mostrarla encima.
 * 3. Añade la clase "selected" a la carta y aplica una transición de estilo.
 * 4. Calcula y ajusta la posición de la carta seleccionada de manera responsive.
 * 5. Añade la carta seleccionada al array `selectedCards`.
 * 6. Cambia la imagen de fondo de la carta seleccionada después de un breve retraso.
 * 7. Si se han seleccionado 3 cartas, ajusta la posición final de las cartas seleccionadas,
 *    guarda las cartas seleccionadas en el servicio y navega a la página de descripción.
 * 
 * @param {Event} event - El evento de clic que desencadena la selección de la carta.
 */
export class CardsComponent implements OnInit {
  cards: any[] = [];
  selectedCards: { src: string, name:string, descriptions: string[] }[] = [];
  private theme: string = '';
  constructor(  private cardService: CardService,
    private router: Router,
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      // Obtener el tema de la ruta
      this.route.params.subscribe(params => {
        this.theme = params['theme'];
        this.initializeCards();
      });
    }
  /* Inicializa las cartas para obtener el tema de la carta 
    * Y barajarlo según el tema seleccionado
  */
   initializeCards(): void {
    this.cardService.clearSelectedCards();
    this.cards = this.cardService.getCardsByTheme(this.theme);
    this.displayCards();
  }
/**
 * Muestra un conjunto de cartas en una disposición en forma de abanico en la pantalla.
 * 
 * Este método obtiene un elemento contenedor con el ID "cardContainer" y 
 * crea y posiciona dinámicamente elementos de cartas dentro de él. Las cartas se 
 * organizan en forma de abanico, con cada carta teniendo un ángulo y posición únicos.
 * 
 * El método realiza los siguientes pasos:
 * 1. Verifica si el elemento contenedor de las cartas existe. Si no, registra un error y termina la ejecución.
 * 2. Verifica si hay cartas para mostrar. Si no, registra una advertencia y termina la ejecución.
 * 3. Calcula la posición y el ángulo de cada carta.
 * 4. Crea un elemento de carta para cada carta, establece sus estilos y atributos, y 
 *    lo añade al contenedor de cartas.
 * 5. Agrega eventos de entrada, salida y clic del mouse a cada carta.
 * 6. Anima la opacidad de cada carta para crear un efecto de aparición gradual.
 * 
 * @throws {Error} Si no se encuentra el elemento contenedor de las cartas.
 * @throws {Error} Si no hay cartas para mostrar.
 */

  displayCards(): void {
    const cardContainer = document.getElementById("cardContainer");
    if (!cardContainer) {
      console.error("❌ No se encontró el contenedor de cartas (#cardContainer)");
      return;
    }

    if (this.cards.length === 0) {
      console.warn("⚠️ No hay cartas para mostrar.");
      return;
    }


    const numberOfCards = 14;
    const startAngle = -40; // Ángulo inicial para el abanico
    const angleStep = 90 / (numberOfCards - 1); 
    const radius = 250; 
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 1.45 + 50;
    for (let i = 0; i < numberOfCards; i++) {
      const cardData = this.cards[i];

      if (cardData && cardData.src) {
        const angle = startAngle + (i * angleStep);
        const radian = angle * (Math.PI / 180);
        /*  */

        const card = document.createElement("div");
        card.classList.add("card");
        card.style.position = "absolute";
        card.style.width = "150px";
        card.style.height = "250px";
        card.style.border="1px solid #ccc";
        card.style.borderRadius="10px";
        card.style
        card.style.left = `${centerX + radius * Math.sin(radian) - 75}px`;
        card.style.top = `${centerY - radius * Math.cos(radian) - 125}px`
        card.style.opacity = "0";
        card.style.zIndex = `${i}`;
        card.style.transform = `rotate(${angle}deg)`; // Giro en acordeón
        card.style.backgroundImage = "url('/card-back.webp')";
        card.style.backgroundSize = "cover";
        card.style.transition = "all 0.5s ease-in-out";


        // Agregar atributos de datos
        card.dataset['src'] = cardData.src;
        card.dataset['name'] = cardData.name;
        card.dataset['descriptions'] = cardData.descriptions.join('.,');
        card.addEventListener("mouseenter", () => {
          card.style.boxShadow = "0 0 8px rgba(255, 215, 0, 0.8), 0 0 15px rgba(255, 215, 0, 0.6)";
        });

        card.addEventListener("mouseleave", () => {
          card.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)";
        });

        card.addEventListener("click", this.selectCard.bind(this));
        cardContainer.appendChild(card);

        setTimeout(() => {
          card.style.opacity = "1";
        }, i * 100);
      } else {
        console.error(`⚠️ La carta en el índice ${i} no tiene datos válidos.`);
      }
    }
  }

  selectCard(event: Event): void {
    const target = event.target as HTMLElement;
    if (this.selectedCards.length >= 3 || target.classList.contains("selected")) return;
  
    // Actualizar z-index para mostrar la última carta encima
    const currentZIndex = 1000 + this.selectedCards.length;
    target.style.zIndex = currentZIndex.toString();
  
    target.classList.add("selected");
    target.style.transition = "all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
  
    // Posicionamiento responsive
    const isMobile = window.innerWidth <= 768;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2 + (isMobile ? 80 : 120);
    const cardSpacing = isMobile ? 80 : 100;
  
    // Calcular nueva posición basada en cantidad de seleccionadas
    const offsetX = (this.selectedCards.length - 1) * cardSpacing - cardSpacing;
    
    target.style.left = `${centerX - 75 + offsetX}px`;
    target.style.top = `${centerY - 125}px`;
    target.style.transform = `scale(${isMobile ? 1.1 : 1.2}) rotateY(180deg)`;
  
    this.selectedCards.push({
      src: target.dataset['src'] || '',
      name: target.dataset['name'] || '',
      descriptions: target.dataset['descriptions']?.split('.,') || [],
    });
  
    setTimeout(() => {
      target.style.backgroundImage = `url('${target.dataset['src']}')`;
      target.style.pointerEvents = "none";
    }, 300);
  
    if (this.selectedCards.length === 3) {
      this.ajustarPosicionFinal(isMobile);
      setTimeout(() => {
        this.cardService.setSelectedCards(this.selectedCards); 
        this.fadeOutAndNavigate();
      }, 1500);
    }
  }
  
  private ajustarPosicionFinal(isMobile: boolean): void {
    const selectedCards = document.getElementsByClassName('selected');
    const cardWidth = isMobile ? 100 : 150;
    const spacing = isMobile ? 40 : 60;
    const totalWidth = (cardWidth * 3) + (2 * spacing);
    const startX = (window.innerWidth - totalWidth) / 2;
  
    // Ajuste clave: Posición vertical para escritorio (parte inferior)
    let centerY: number;
    
    if (isMobile) {
      // Centrado vertical para móvil
      const containerHeight = document.getElementById("cardContainer")?.clientHeight || 0;
      centerY = (window.innerHeight - containerHeight) / 2;
    } else {
      // Posición en parte inferior para escritorio (90% de la altura)
      centerY = window.innerHeight * 0.9 - 400; // Ajusta el valor "-100" según necesidad
    }
  
    Array.from(selectedCards).forEach((card: Element, index: number) => {
      const htmlCard = card as HTMLElement;
      htmlCard.style.transition = 'all 0.8s ease';
      htmlCard.style.left = `${startX + (index * (cardWidth + spacing))}px`;
      htmlCard.style.top = `${centerY}px`; // Aplicar posición vertical
      htmlCard.style.transform = `scale(${isMobile ? 1 : 1.2}) rotateY(180deg)`;
    });
  }
  private fadeOutAndNavigate(): void {
    const cardContainer = document.getElementById("cardContainer");
    if (cardContainer) {
      cardContainer.classList.add('fade-out');
      cardContainer.addEventListener('animationend', () => {
        this.router.navigate(['/descripcion-cartas']);
      });
    }
  }
}
