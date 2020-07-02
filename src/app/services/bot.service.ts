import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BOT} from './BOT';
import {Observable} from 'rxjs';
import {CommandAnalyzed} from '../models/command-analyzed';
import {first} from 'rxjs/operators';
import {environment} from '../../environments/environment.prod';

const bot = new BOT();
const faq = environment.faq;

@Injectable({
  providedIn: 'root'
})
export class BotService {

  constructor(private httpClient: HttpClient) {
  }

  analyzeCommand(command: string): CommandAnalyzed {
    const splitCommand = command.split(' ');
    switch (splitCommand[0]) {

      case '/sugg':
        if (command.split('#').length === 2 && command.split('#')[1].trim() !== '')
          return {
            data: {body: command.split('#')[1].trim()},
            message: 'Gracias por su recomendación, se tendrá en cuanta.',
            kind: 'sugg',
            url: bot.getSuggestionsURL()
          };
        else
          return {
            data: null,
            message: 'Debe poner alguna sugerencia, si tiene alguna.'
          };

      case '/bug':
        let topic;
        switch (splitCommand[1]) {
          case '#sec':
            topic = 'security';
            break;
          case '#fun':
            topic = 'functionality';
            break;
          case '#vis':
            topic = 'visual';
            break;
          default:
            return {
              data: null,
              message: 'Estructura incorrecta.\n Ej: /bug #sec #Entró Anonymous.\n #sec, #fun, #vis.'
            };
        }
        if (command.split('#').length === 3 && command.split('#')[2].trim() !== '')
          return {
            data: {body: command.split('#')[2].trim(), topic},
            message: 'Gracias por reportar el error, se corregirá lo antes posible.',
            kind: 'bug',
            url: bot.getBugsURL()
          };
        else
          return {
            data: null,
            message: 'Debe poner algún error, si encontró alguno.'
          };

      case '/bug_last':
        return {
          data: true,
          kind: 'bug',
          url: bot.getBugsURL()
        };

      case '/sugg_last':
        return {
          data: true,
          kind: 'sugg',
          url: bot.getSuggestionsURL()
        };

      case '/grant':
        let role;
        switch (splitCommand[1]) {
          case '#user':
            role = 'ROLE_USER';
            break;
          case '#admin':
            role = 'ROLE_ADMIN';
            break;
          case '#root':
            role = 'ROLE_ROOT';
            break;
          default:
            return {
              data: null,
              message: 'El rol seleccionado no es correcto.\n Ej: /grant #user #Anonymous. #user, #admin, #root.'
            };
        }
        if (command.split('#').length === 3 && command.split('#')[2].trim() !== '') {
          const user = command.split('#')[2].trim();
          return {
            data: {user, new_role: role},
            message: `Ya he asignado ${role} al usuario ${user}.`,
            kind: 'grant',
            url: bot.getGrantPermissionsURL()
          };
        } else
          return {
            data: null,
            message: 'Debe poner seleccionar algún usuario existente.'
          };

      case '/faq':
        return {
          data: [
            {
              name: 'Los Videos',
              command: '/faq_video'
            },
            {
              name: 'Los Usuarios',
              command: '/faq_user'
            },
            {
              name: 'La Seguridad',
              command: '/faq_sec'
            }
          ],
          message: 'Las Preguntas Frecuentes están separadas en estos temas.',
          kind: 'help'
        };

      case '/faq_video':
        if (splitCommand.length > 1) {
          return {
            data: true,
            kind: 'answer',
            message: faq.video.topics[+splitCommand[1].charAt(1) - 1].answer
          };
        } else
          return {
            data: faq.video.topics,
            message: 'Estos son los temas relacionados con Los Usuarios',
            kind: 'help'
          };

      case '/faq_user':
        if (splitCommand.length > 1) {
          return {
            data: true,
            kind: 'answer',
            message: faq.usuario.topics[+splitCommand[1].charAt(1) - 1].answer
          };
        } else
          return {
            data: faq.usuario.topics,
            message: 'Estos son los temas relacionados con Los Usuarios',
            kind: 'help'
          };

      case '/faq_sec':
        if (splitCommand.length > 1) {
          return {
            data: true,
            kind: 'answer',
            message: faq.seguridad.topics[+splitCommand[1].charAt(1) - 1].answer
          };
        } else
          return {
            data: faq.seguridad.topics,
            message: 'Estos son los temas relacionados con Los Usuarios',
            kind: 'help'
          };

      case '/ban_add':
        const args = command.split('#');
        return {
          data: {user: args[1].trim(), why: args[2].trim(), days: +args[3].trim()},
          message: `El usuario ${args[1].trim()} fue baneado por ${+args[3]} días.`,
          kind: 'ban',
          url: bot.getRevokeAccessURL()
        };

      case '/ban_revoke':
        return {
          data: {user: command.split('#')[1].trim()},
          message: `Al usuario ${command.split('#')[1].trim()} se le quito el ban.`,
          kind: 'ban',
          url: bot.getGrantAccessURL()
        };

      case '/ban_check':
        return {
          data: {user: command.split('#')[1].trim()},
          kind: 'ban:server',
          message: `El usuario ${command.split('#')[1].trim()} no está baneado.`,
          url: bot.getCheckBanURL()
        };

      default:
        return {
          data: null,
          message: 'Esa opción no ha sido desarrollada. :('
        };
    }
  }

  POSTFromBot(url: string, data: any): Observable<any> {
    return this.httpClient.post<any>(url, data, {headers: bot.getHeadersWithAuth()}).pipe(first());
  }

  GETFromBot(url: string): Observable<any> {
    return this.httpClient.get<any>(url, {headers: bot.getHeadersWithAuth()}).pipe(first());
  }

}
