import {Component, OnDestroy, OnInit} from '@angular/core';
import {faAngleDown, faAngleUp, faPaperPlane, faTimes} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../../services/authentication.service';
import {ChatMessage} from '../../../../models/chat-message';
import {environment} from '../../../../../environments/environment.prod';
import {BotService} from '../../../../services/bot.service';
import {CommandAnalyzed} from '../../../../models/command-analyzed';
import {Command} from '../../../../models/command';
import {Channel} from '../../../../models/channel';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.scss']
})
export class BotComponent implements OnInit, OnDestroy {
  faTimes = faTimes;
  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;
  faPaperPlane = faPaperPlane;
  chat: JQuery<HTMLElement>;
  commands: JQuery<HTMLElement>;
  toggleMinimize: boolean;
  toggleCommand: boolean;
  botForm: FormGroup = this._formBuilder.group({
    body: ['', [Validators.required]]
  });
  security: any;
  chatStack: Array<ChatMessage> = new Array<ChatMessage>();
  inputCommands: Array<Command> = environment.commands;
  User: Channel;

  constructor(private _formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private botService: BotService) {
    this.toggleMinimize = true;
    this.toggleCommand = false;
    this.authenticationService.currentUser.subscribe(auth => this.User = auth);
    this.security = setInterval(() => {
      this.authenticationService.currentUser.subscribe(auth => {
        if (auth === null || auth === undefined) this.toClose();
      });
    }, 200);
  }

  ngOnInit(): void {
    this.chat = $('#chat');
    this.commands = $('#commands').fadeToggle();
  }

  toMinimizing() {
    if (this.toggleMinimize && this.toggleCommand) {
      this.toggleCommands();
    }
    this.chat.css({
      bottom: this.toggleMinimize ? '-340px' : '0px'
    });
    this.toggleMinimize = !this.toggleMinimize;
  }

  toClose() {
    if (this.toggleMinimize && this.toggleCommand) {
      this.toggleCommands();
    }
    this.chat.css({
      bottom: '-400px'
    });
    this.toggleMinimize = true;
    this.chatStack = [];
    this.botForm.reset();
  }

  onSubmit() {
    if (this.botForm.valid && !this.botForm.pristine) {
      this.chatStack.push({
        text: this.botForm.get('body').value,
        type: 'client'
      });

      const commandObj = this.inputCommands.find(command =>
          command.value.split(' ')[0] === this.botForm.get('body').value.split(' ')[0]);

      const result: CommandAnalyzed = this.botService.analyzeCommand(this.botForm.get('body').value);

      if (result.data) {
        if (commandObj.kind === 'auto')
          this.MakeRequestFromAutoCommand(result.url);
        else
          this.botService.POSTFromBot(result.url, result.data)
              .subscribe(() => {
                this.chatStack.push({
                  text: result.message,
                  type: 'server'
                });
              }, () => {
                this.chatStack.push({
                  text: 'Sorry, necesito limpiar mis engranajes.',
                  type: 'server'
                });
              });
      } else
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

  emitCommand(command: Command) {
    if (command.kind === 'inline') {
      this.botForm.get('body').setValue(command.value);
    } else {
      this.chatStack.push({
        text: command.value,
        type: 'client'
      });
      const result: CommandAnalyzed = this.botService.analyzeCommand(command.value);
      this.MakeRequestFromAutoCommand(result.url);
    }

    this.toggleCommands();
  }

  getStackMessages(): Array<ChatMessage> {
    const newArray: Array<ChatMessage> = [];
    for (let i = this.chatStack.length - 1; i >= 0; i--)
      newArray.push(this.chatStack[i]);
    return newArray;
  }

  MakeRequestFromAutoCommand(url: string): void {
    if (this.User.user.role !== 'ROLE_USER')
      this.botService.GETFromBot(url)
          .pipe(map(data => `${data.data.user.username} : ${data.data.topic ? '#' + data.data.topic : ''} ${data.data.body}`))
          .subscribe(response => {
            this.chatStack.push({
              text: response,
              type: 'server'
            });
          }, () => {
            this.chatStack.push({
              text: 'Sorry, necesito limpiar mis engranajes.',
              type: 'server'
            });
          });
    else
      this.chatStack.push({
        text: 'No tienes acceso a esta información. Contacta con algún administrador.',
        type: 'server'
      });
  }
}
