import { Component } from '@angular/core';

import { ParticlesComponent } from '../../shared/particles/particles.component';

declare var anime: any; 

@Component({
  selector: 'app-agradecimiento',
  imports: [ParticlesComponent],
  templateUrl: './agradecimiento.component.html',
  styleUrl: './agradecimiento.component.css'
})
export class AgradecimientoComponent {
  ngAfterViewInit(): void {
 
    let textWrapper = document.querySelector('.c2');
    if (textWrapper) {
      if (textWrapper.textContent) {
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter' style='display:inline-block;'>$&</span>");
      }
    }
    
    anime.timeline({loop: true})
      .add({
        targets: '.c2 .letter',
        translateY: [100,0],
        translateZ: 0,
        opacity: [0,1],
        easing: "easeOutExpo",
        duration: 5000,
        delay: (el:any, i:any) => 500 + 30 * i
      }).add({
        targets: '.c2 .letter',
        translateY: [0,-100],
        opacity: [1,0],
        easing: "easeInExpo",
        duration: 1100,
        delay: (el:any, i:any) => 100 + 30 * i
      });
      
    let textWrapper1 = document.querySelector('.c1');
    if (textWrapper1 && textWrapper1.textContent) {
      textWrapper1.innerHTML = textWrapper1.textContent.replace(/\S/g, "<span class='el' style='display:inline-block;'>$&</span>");
    }

anime.timeline({loop: true})
  .add({
    targets: '.c1 .el',
    translateY: ["1.1em", 0],
    translateZ: 0,
    duration: 5000,
    delay: (el:any, i:any) => 50 * i
  }).add({
    targets: '.c1',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 100
  });

}
}
