import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BOT} from './BOT';
import {Observable} from 'rxjs';
import {CommandAnalyzed} from '../models/command-analyzed';
import {first} from 'rxjs/operators';

const bot = new BOT();

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
        if (command.substr(6) !== '')
          return {
            data: {body: command.substr(6)},
            message: 'Gracias por su sugerencia, se tendrá en cuanta.',
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
              message: 'Estructura incorrecta. Ej: /bug #sec Entró Anonymous. #sec, #fun, #vis.'
            };
        }
        if (command.substr(10) !== '')
          return {
            data: {body: command.substr(10), topic},
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
