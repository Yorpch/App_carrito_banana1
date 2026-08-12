import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonIcon,
  IonTitle,
  IonButtons,
  IonMenuButton
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { io, Socket } from 'socket.io-client';
import { addIcons } from 'ionicons';
import {
  hardwareChipOutline,
  radioOutline,
  timeOutline,
  navigateOutline,
  pulseOutline,
  bulbOutline,
  listOutline,
  desktopOutline,
  refreshOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonContent, IonIcon, IonTitle, IonButtons, IonMenuButton],
})
export class DashboardPage {
  private socket: Socket | null = null;
  public realtimeEvents: Array<any> = [];

  private getBackendUrl(): string {
    const provided = (window as any).API_SOCKET_URL;
    if (provided) return provided;

    const isAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent || '');
    if (isAndroid) {
      return 'http://10.0.2.2:3000';
    }

    return 'http://localhost:3000';
  }

  constructor() {
    addIcons({
      hardwareChipOutline,
      radioOutline,
      timeOutline,
      navigateOutline,
      pulseOutline,
      bulbOutline,
      listOutline,
      desktopOutline,
      refreshOutline
    });
    // connect to socket server (adjust URL if needed)
    try {
      this.socket = io(this.getBackendUrl());
      this.socket.on('connect', () => console.log('socket connected', this.socket?.id));
      this.socket.on('session.created', (data: any) => {
        this.realtimeEvents.unshift({ kind: 'session', ...data });
      });
      this.socket.on('event.created', (data: any) => {
        this.realtimeEvents.unshift({ kind: 'event', ...data });
      });
      this.socket.on('alerta.created', (data: any) => {
        this.realtimeEvents.unshift({ kind: 'alerta', ...data });
      });
      this.socket.on('device.created', (data: any) => {
        this.realtimeEvents.unshift({ kind: 'device', ...data });
      });
    } catch (e) {
      console.warn('SocketIO client not available', e);
    }
  }

  ngOnDestroy(): void {
    try {
      this.socket?.disconnect();
    } catch (e) {
      // ignore
    }
  }
}
