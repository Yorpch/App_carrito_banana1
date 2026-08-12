import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonIcon, IonButtons, IonMenuButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  analyticsOutline, checkmarkCircleOutline, closeCircleOutline,
  timeOutline, flashOutline, pieChartOutline, trendingUpOutline,
  hardwareChipOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-analisis',
  templateUrl: './analisis.page.html',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,
    IonIcon, IonButtons, IonMenuButton],
})
export class AnalisisPage {
  constructor() {
    addIcons({
      analyticsOutline, checkmarkCircleOutline, closeCircleOutline,
      timeOutline, flashOutline, pieChartOutline, trendingUpOutline,
      hardwareChipOutline
    });
  }
}