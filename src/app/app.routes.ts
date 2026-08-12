import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    loadComponent: () => import('../pages/login/login.page').then((m) => m.LoginPage)
  },
  {
    path: 'registro',
    loadComponent: () => import('../pages/registro/registro.page').then((m) => m.RegistroPage)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('../pages/dashboard/dashboard.page').then((m) => m.DashboardPage)
  },
  {
    path: 'actividades',
    loadComponent: () => import('../pages/actividades/actividades.page').then((m) => m.ActividadesPage)
  },
  {
    path: 'sesiones',
    loadComponent: () => import('../pages/sesiones/sesiones.page').then((m) => m.SesionesPage)
  },
  {
    path: 'log-eventos',
    loadComponent: () => import('../pages/log-eventos/log-eventos.page').then((m) => m.LogEventosPage)
  },
  {
    path: 'base-datos',
    loadComponent: () => import('../pages/base-datos/base-datos.page').then((m) => m.BaseDatosPage)
  },
  {
    path: 'analisis',
    loadComponent: () => import('../pages/analisis/analisis.page').then((m) => m.AnalisisPage)
  },
  {
    path: 'configuracion',
    loadComponent: () => import('../pages/configuracion/configuracion.page').then((m) => m.ConfiguracionPage)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
