import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MsgDialogComponent} from '../modules/shared/dialogs/msg-dialog/msg-dialog.component';
import {ErrorsDialogComponent} from '../modules/shared/dialogs/errors-dialog/errors-dialog.component';
import {ThemeConfigService} from './theme-config.service';
import * as moment from 'moment';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  sysNotificationsAssets = environment.sysNotificationIcons;

  constructor(private snackBar: MatSnackBar, private themeConfigService: ThemeConfigService) {
  }

  askForPermissions() {
    if (Notification.permission !== 'granted')
      Notification.requestPermission().then(() => {
        if (Notification.permission === 'granted')
          return new Notification('Notificaciones de Sistema Disponibles', {
            body: 'Usted ha dado permisos para que #DeepMedia haga uso de las notificaciones del Sistema.',
            image: this.sysNotificationsAssets.deepmedia_picture.url,
            icon: this.checkStatus('info'),
            timestamp: moment().valueOf(),
            lang: 'es',
            dir: 'auto',
            requireInteraction: true
          });
      });
  }

  showNotification(from: string, message: string, status: string) {
    if (Notification.permission === 'granted')
      this.sysNotification(from, message, status);
    else
      this.snackBar.openFromComponent(MsgDialogComponent, {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'end',
        data: {from, message, status},
        panelClass: this.themeConfigService.config.theme
      });
  }

  sysNotification(title: string, msg: string | string[], status: string) {
    const n = new Notification(title, {
      body: typeof msg === 'string' ? msg : msg.toLocaleString().replace(',', '\n'),
      icon: this.checkStatus(status),
      timestamp: moment().valueOf(),
      lang: 'es',
      dir: 'auto',
      requireInteraction: false,
      silent: false,
      tag: title
    });
    setTimeout(() => n.close(), 5000);
  }

  checkStatus(status: string): string {
    switch (status) {
      case 'success':
        return this.sysNotificationsAssets.icons_ok.url;
      case 'info':
        return this.sysNotificationsAssets.icons_info.url;
      case 'warning':
        return this.sysNotificationsAssets.icons_attention.url;
      case 'danger':
        return this.sysNotificationsAssets.icons_high_priority.url;
      default:
        return this.sysNotificationsAssets.deepmedia_picture.url;
    }
  }

  showErrors(from: string, errors: string[], status: string) {
    if (Notification.permission === 'granted')
      this.sysNotification(from, errors, status);
    else
      this.snackBar.openFromComponent(ErrorsDialogComponent, {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'end',
        data: {from, errors, status},
        panelClass: this.themeConfigService.config.theme
      });
  }

  checkCurrentThemeFromTime() {
    const timeTheme: { checked: boolean } = JSON.parse(localStorage.getItem('time-theme'));
    if (!timeTheme.checked || this.checkTime()) {
      if (moment().hours() > 8 && moment().hours() < 20 && this.themeConfigService.config.theme === 'dark-theme') {
        this.showNotification('Tema Info',
            'En este horario le sugerimos que haga uso del Tema Claro de la aplicación.', 'info');
        localStorage.setItem('time-theme', JSON.stringify({checked: true}));
      }

      if ((moment().hours() <= 8 || moment().hours() >= 20) && this.themeConfigService.config.theme === 'light-theme') {
        this.showNotification('Tema Info',
            'En este horario le sugerimos que haga uso del Tema Oscuro de la aplicación.', 'info');
        localStorage.setItem('time-theme', JSON.stringify({checked: true}));
      }
    }
  }

  checkTime(): boolean {
    const timeTheme: { checked: boolean } = JSON.parse(localStorage.getItem('time-theme'));
    if (timeTheme.checked &&
        (moment().hours() <= 8 || moment().hours() >= 20) &&
        this.themeConfigService.config.theme === 'light-theme') {
      return true;
    }
    return timeTheme.checked &&
        moment().hours() > 8 && moment().hours() < 20 &&
        this.themeConfigService.config.theme === 'dark-theme';
  }

}
