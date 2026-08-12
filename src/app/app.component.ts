import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonApp,
  IonHeader,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonRouterOutlet,
  IonSplitPane,
  IonTitle,
  IonToolbar,
  IonButton,
  IonItemDivider
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  analyticsOutline,
  clipboardOutline,
  cogOutline,
  logOutOutline,
  phonePortraitOutline,
  speedometerOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    IonApp,
    IonHeader,
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonMenuToggle,
    IonRouterOutlet,
    IonSplitPane,
    IonTitle,
    IonToolbar,
    IonButton,
    IonItemDivider,
    RouterLink,
    RouterLinkActive
  ],
  template: `
    <ion-app>
      <ion-split-pane contentId="main-content">
        <ion-menu contentId="main-content" type="overlay">
          <ion-header>
            <ion-toolbar color="primary">
              <ion-title>App_1</ion-title>
            </ion-toolbar>
          </ion-header>
          <ion-content>
            <ion-list lines="none">
              <ion-menu-toggle auto-hide="false" *ngFor="let item of menuItems">
                <ion-item button [routerLink]="item.path" routerLinkActive="selected" detail="false">
                  <ion-icon slot="start" [name]="item.icon"></ion-icon>
                  <ion-label>{{ item.label }}</ion-label>
                </ion-item>
              </ion-menu-toggle>
              <ion-item-divider></ion-item-divider>
              <ion-item button (click)="logout()" color="danger" detail="false">
                <ion-icon slot="start" name="log-out-outline"></ion-icon>
                <ion-label>Cerrar sesión</ion-label>
              </ion-item>
            </ion-list>
          </ion-content>
        </ion-menu>

        <ion-router-outlet id="main-content"></ion-router-outlet>
      </ion-split-pane>
    </ion-app>
  `
})
export class AppComponent {
  protected menuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'speedometer-outline' },
    { label: 'Actividades', path: '/actividades', icon: 'clipboard-outline' },
    { label: 'Análisis', path: '/analisis', icon: 'analytics-outline' },
    { label: 'Configuración', path: '/configuracion', icon: 'cog-outline' }
  ];

  constructor(private router: Router) {
    addIcons({
      speedometerOutline,
      clipboardOutline,
      analyticsOutline,
      cogOutline,
      logOutOutline,
      phonePortraitOutline
    });
  }

  logout() {
    try {
      localStorage.clear();
    } catch (e) {
      // ignore
    }
    this.router.navigate(['/login']);
  }
}
