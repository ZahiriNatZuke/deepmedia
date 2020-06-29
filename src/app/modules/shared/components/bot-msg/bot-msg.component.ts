import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-bot-msg',
  templateUrl: './bot-msg.component.html',
  styleUrls: ['./bot-msg.component.scss']
})
export class BotMsgComponent implements OnInit {
  @Input() type: string;
  @Input() text: string;
  @Output() commandEmitter: EventEmitter<string>;

  constructor() {
    this.commandEmitter = new EventEmitter();
  }

  ngOnInit(): void {
  }

  emitCommand(textElement: string) {
    this.commandEmitter.emit(textElement);
  }
}
