import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonIcon, IonButtons, IonMenuButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { timeOutline, radioOutline } from 'ionicons/icons';

@Component({
  selector: 'app-sesiones',
  templateUrl: './sesiones.page.html',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,
    IonIcon, IonButtons, IonMenuButton],
})
export class SesionesPage {
  constructor() {
    addIcons({ timeOutline, radioOutline });
  }
}