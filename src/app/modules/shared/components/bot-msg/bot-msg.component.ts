import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-bot-msg',
  templateUrl: './bot-msg.component.html',
  styleUrls: ['./bot-msg.component.scss']
})
export class BotMsgComponent implements OnInit {
  @Input() type: string;
  @Input() text: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
