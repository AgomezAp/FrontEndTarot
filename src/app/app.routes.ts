import { Routes } from '@angular/router';

import {
  AdditionalInfoComponent,
} from './components/additional-info/additional-info.component';
import {
  AdditionalInfo1Component,
} from './components/additional-info1/additional-info1.component';
import {
  AdditionalInfo2Component,
} from './components/additional-info2/additional-info2.component';
import {
  AgradecimientoComponent,
} from './components/agradecimiento/agradecimiento.component';
import { CardsComponent } from './components/cards/cards.component';
import {
  DescriptionComponent,
} from './components/description/description.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ParticlesComponent } from './shared/particles/particles.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
    {
        path:'welcome', component: WelcomeComponent
    },
    {
        path:'cartas/:theme', component:CardsComponent
    },
    {
        path:'descripcion-cartas',component:DescriptionComponent
    },
    {
        path:'informacion',component:AdditionalInfoComponent
    },
    {
        path:'informacion1',component:AdditionalInfo1Component
    },
    {
        path:'informacion2',component:AdditionalInfo2Component
    },
    {
      path: 'particulas',component:ParticlesComponent
    },
    {
      path:'agradecimiento',component:AgradecimientoComponent
    }


];
