import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonNote
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { atOutline, lockClosedOutline, personOutline } from 'ionicons/icons';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    CommonModule,
    IonButton,
    IonCard,
    IonCardContent,
    IonContent,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonNote,
    RouterLink
  ],
  templateUrl: './registro.page.html',
  styleUrl: './registro.page.scss'
})
export class RegistroPage {
  constructor() {
    addIcons({ atOutline, lockClosedOutline, personOutline });
  }
}
