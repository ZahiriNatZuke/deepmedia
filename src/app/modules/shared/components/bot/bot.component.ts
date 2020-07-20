import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {faAngleDown, faAngleUp, faTimes} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../../services/authentication.service';
import {ChatMessage} from '../../../../models/chat-message';
import {environment} from '../../../../../environments/environment.prod';
import {BotService} from '../../../../services/bot.service';
import {CommandAnalyzed} from '../../../../models/command-analyzed';
import {Command} from '../../../../models/command';
import {Channel} from '../../../../models/channel';
import {map} from 'rxjs/operators';
import {Banished} from '../../../../models/banished';
import * as moment from 'moment';
import {ThemeConfigService} from '../../../../services/theme-config.service';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.scss']
})
export class BotComponent implements OnInit, OnDestroy {
  @ViewChild('textarea', {static: true}) textArea: ElementRef;
  @ViewChild('commandIco', {static: true}) iconCommand: MatIcon;
  @ViewChild('commandBtn', {static: true}) btnCommand: MatButton;
  botForm: FormGroup = this._formBuilder.group({
    body: ['', [Validators.required]]
  });
  chatStack: Array<ChatMessage> = new Array<ChatMessage>();
  historyChat: HistoryChat = new HistoryChat();
  inputCommands: Array<Command> = environment.commands;
  commands: JQuery<HTMLElement>;
  chat: JQuery<HTMLElement>;
  User: Channel;
  faTimes = faTimes;
  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;
  security: any;
  toggleMinimize: boolean;
  toggleCommand: boolean;
  typing: boolean;
  time: number;
  currentTheme: { theme: string } = this.themeConfigService.config;

  constructor(private _formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private botService: BotService,
              private themeConfigService: ThemeConfigService) {
    this.toggleMinimize = true;
    this.toggleCommand = false;
    this.typing = false;
    this.time = 1000;
    this.authenticationService.currentUser.subscribe(auth => this.User = auth);
    this.security = setInterval(() => {
      if (this.User === null || this.User === undefined) this.toClose();
    }, 200);
  }

  ngOnInit(): void {
    this.chat = $('#chat');
    this.commands = $('#commands').fadeToggle();
    window.addEventListener('keydown', (event) => {
      if (event.altKey && event.code === 'Enter' && event.target === this.textArea.nativeElement) this.onSubmit();
      if (event.altKey && event.code === 'ArrowUp' && event.target === this.textArea.nativeElement) this.upCommandFromHistory();
      if (event.altKey && event.code === 'ArrowDown' && event.target === this.textArea.nativeElement) this.downCommandFromHistory();
    });
    window.addEventListener('click', (event) => {
      if (event.target !== this.iconCommand._elementRef.nativeElement &&
          event.target !== this.btnCommand._elementRef.nativeElement && this.toggleCommand) this.toggleCommands();
    });
    document.querySelector('.msg-container').addEventListener('wheel', (e: any) => {
      if (e.deltaY) {
        e.preventDefault();
        e.currentTarget.scrollTop -=
            parseFloat(getComputedStyle(e.currentTarget).getPropertyValue('font-size')) * (e.deltaY < 0 ? -1 : 1) * 12;
      }
    });
  }

  toMinimizing() {
    if (this.toggleMinimize && this.toggleCommand) this.closeCommands();
    this.chat.css({bottom: this.toggleMinimize ? '-340px' : '0px'});
    this.toggleMinimize = !this.toggleMinimize;
  }

  toClose() {
    if (this.toggleMinimize && this.toggleCommand) this.closeCommands();
    this.chat.css({bottom: '-400px'});
    setTimeout(_ => this.chat.css({display: 'none'}), 500);
    this.toggleMinimize = true;
    this.chatStack = [];
    this.botForm.reset();
    this.historyChat.cleanHistory();
  }

  onSubmit() {
    if (this.botForm.valid) {
      if (this.botForm.get('body').value === 'cls') {
        this.chatStack = [];
        this.botForm.reset();
        return;
      }

      this.historyChat.mergeHistory();
      this.historyChat.addCommand(this.botForm.get('body').value);

      this.chatStack.push({
        text: this.botForm.get('body').value,
        type: 'client'
      });

      if (this.botForm.get('body').value === '/swap_theme') {
        this.botForm.reset();
        this.currentTheme.theme === 'light-theme' ?
            this.themeConfigService.setDarkTheme() : this.themeConfigService.setLightTheme();
        this.chatStack.push({
          text: this.currentTheme.theme === 'light-theme' ?
              'He cambiado a Modo Claro' : 'He Cambiado a Modo Oscuro',
          type: 'server'
        });
        return;
      }

      const result: CommandAnalyzed = this.botService.analyzeCommand(this.botForm.get('body').value);

      if (result.data)
        switch (result.kind) {
          case 'auto':
            this.showIndicator();
            this.MakeRequestFromAutoCommand(result.url);
            break;
          case 'inline':
            this.showIndicator();
            this.chooseOption(result);
            break;
          case 'help':
            this.showIndicator();
            this.chatStack.push({
              text: result.message,
              type: 'server'
            });
            for (const faq of result.data) {
              this.chatStack.push({
                text: faq,
                type: 'faq'
              });
            }
            break;
          case 'answer':
            this.showIndicator();
            this.chatStack.push({
              text: result.message,
              type: 'server'
            });
            break;
          case 'grant':
            this.showIndicator();
            this.MakeRequestForGrant(result);
            break;
          case 'ban:server':
            this.showIndicator();
            this.botService.POSTFromBot(result.url, result.data)
                .subscribe((response) => {
                  if (response.status) {
                    const data: Banished = response.data;
                    this.chatStack.push({
                      text: `El usuario ${data.user} está baneado, el ban vence ${moment(data.banish_expired_at * 1000).fromNow()}.\n
                              Fue baneado por @${data.byWho}.`,
                      type: 'server'
                    });
                  } else
                    this.chatStack.push({
                      text: result.message,
                      type: 'server'
                    });
                }, () => this.messageErrorFromBot());
            break;
          case 'delete':
            this.showIndicator();
            this.botService.DELETEFromBot(result.url, result.data.id)
                .subscribe(() => this.chatStack.push({
                      text: result.message,
                      type: 'server'
                    }),
                    () => this.messageErrorFromBot());
            break;
          default:
            break;
        }
      else
        this.chatStack.push({
          text: result.message,
          type: 'server'
        });

      this.botForm.reset();
    }
  }

  ngOnDestroy() {
    clearInterval(this.security);
  }

  toggleCommands() {
    this.commands.fadeToggle(300);
    this.toggleCommand = !this.toggleCommand;
  }

  closeCommands() {
    this.commands.fadeOut(300);
    this.toggleCommand = false;
  }

  emitCommand(command: Command) {
    switch (command.kind) {
      case 'inline':
        this.showIndicator();
        this.botForm.get('body').setValue(command.value);
        break;
      case 'auto':
        this.showIndicator();
        this.historyChat.mergeHistory();
        this.historyChat.addCommand(command.value);
        this.chatStack.push({
          text: command.value,
          type: 'client'
        });
        const auto: CommandAnalyzed = this.botService.analyzeCommand(command.value);
        this.MakeRequestFromAutoCommand(auto.url);
        break;
      case 'help':
        this.showIndicator();
        this.historyChat.mergeHistory();
        this.historyChat.addCommand(command.value);
        this.chatStack.push({
          text: command.value,
          type: 'client'
        });
        const help: CommandAnalyzed = this.botService.analyzeCommand(command.value);
        this.chatStack.push({
          text: help.message,
          type: 'server'
        });
        for (const faq of help.data) {
          this.chatStack.push({
            text: faq,
            type: 'faq'
          });
        }
        break;
      default:
        break;
    }
  }

  MakeRequestFromAutoCommand(url: string): void {
    this.botService.GETFromBot(url)
        .pipe(map(data =>
            data.data?.user.username ?
                `${data.data.user.username} : ${data.data.topic ? '#' + data.data.topic : ''} ${data.data.body}` :
                'No hay Información disponible.'))
        .subscribe(response => this.chatStack.push({
          text: response,
          type: 'server'
        }), () => this.messageErrorFromBot());
  }

  MakeRequestFromInlineCommand(result: CommandAnalyzed): void {
    this.botService.POSTFromBot(result.url, result.data)
        .subscribe((response) => {
          if (response.status === false)
            this.chatStack.push({
              text: response.message,
              type: 'server'
            });
          else
            this.chatStack.push({
              text: result.message,
              type: 'server'
            });
        }, () => this.messageErrorFromBot());
  }

  catchCommand(event: string) {
    this.botForm.get('body').setValue(event);
  }

  chooseOption(option: CommandAnalyzed) {
    if (typeof option.data === 'boolean')
      this.MakeRequestFromAutoCommand(option.url);
    else
      this.MakeRequestFromInlineCommand(option);
  }

  MakeRequestForGrant(result: CommandAnalyzed) {
    this.botService.POSTFromBot(result.url, {
      new_role: result.data.new_role,
      user: result.data.user
    }).subscribe((response) =>
        this.chatStack.push({
          text: response.status ? result.message : response.message,
          type: 'server'
        }), () => this.messageErrorFromBot());
  }

  messageErrorFromBot() {
    this.chatStack.push({
      text: 'Lo siento, necesito limpiar mis engranajes.',
      type: 'server'
    });
  }

  upCommandFromHistory() {
    this.botForm.get('body').setValue(this.historyChat.getLastCommand());
  }

  downCommandFromHistory() {
    this.botForm.get('body').setValue(this.historyChat.getTempCommand());
  }

  showIndicator() {
    this.closeCommands();
    if (!this.typing) {
      this.typing = !this.typing;
      setTimeout(() => {
        this.typing = !this.typing;
        this.time = 1000;
      }, this.time);
    } else
      this.time += 75;
  }

  getRoughCopy(): string {
    return `Borrador: ${this.botForm.get('body').value}`;
  }

  checkTextArea(): boolean {
    return (this.botForm.get('body').value === '' || this.botForm.get('body').value === null) || this.toggleMinimize;
  }

}

export class HistoryChat {
  historyChat: Array<string>;
  tempHistoryChat: Array<string>;

  constructor() {
    this.historyChat = new Array<string>();
    this.tempHistoryChat = new Array<string>();
  }

  getLastCommand(): string {
    if (this.historyChat.length === 1)
      return this.historyChat[0];
    const command = this.historyChat.pop();
    if (command === undefined)
      return;
    this.tempHistoryChat.push(command);
    return command;
  }

  getTempCommand(): string {
    if (this.tempHistoryChat.length === 1)
      return this.tempHistoryChat[0];
    const command = this.tempHistoryChat.pop();
    if (command === undefined)
      return;
    this.historyChat.push(command);
    return command;
  }

  addCommand(command: string) {
    if (command)
      this.historyChat.push(command);
  }

  mergeHistory() {
    this.historyChat.push(...this.tempHistoryChat.reverse());
    this.tempHistoryChat = [];
  }

  cleanHistory() {
    this.historyChat = [];
    this.tempHistoryChat = [];
  }

}
