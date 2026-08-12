import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonButton,
  IonContent,
  IonIcon,
  IonToolbar,
  IonHeader,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonButtons,
  IonMenuButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, checkmarkCircleOutline, flameOutline, timeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-actividades',
  standalone: true,
  imports: [
    CommonModule,
    IonButton,
    IonContent,
    IonIcon,
    IonToolbar,
    IonHeader,
    IonTitle,
    IonList,
    IonItem,
    IonLabel,
    IonBadge,
    IonButtons,
    IonMenuButton
  ],
  templateUrl: './actividades.page.html',
  styleUrl: './actividades.page.scss'
})
export class ActividadesPage {
  protected activities = [
    { title: 'Sesión móvil iniciada', detail: 'Android Studio / emulador', status: 'Activa', color: 'success' },
    { title: 'Análisis automático', detail: 'Precisión del modelo actualizada', status: 'Pendiente', color: 'warning' },
    { title: 'Sincronización DB', detail: 'Última copia guardada', status: 'OK', color: 'primary' }
  ];

  constructor() {
    addIcons({ addOutline, checkmarkCircleOutline, flameOutline, timeOutline });
  }
}
