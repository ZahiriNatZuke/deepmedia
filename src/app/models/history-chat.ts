export class HistoryChat {
  historyChat: Array<string>;
  tempHistoryChat: Array<string>;

  constructor() {
    this.historyChat = new Array<string>();
    this.tempHistoryChat = new Array<string>();
  }

  getLastCommand(): string {
    if (this.historyChat.length === 0)
      return this.tempHistoryChat[this.tempHistoryChat.length - 1];
    const command = this.historyChat.pop();
    this.tempHistoryChat.push(command);
    return command;
  }

  getTempCommand(): string {
    if (this.tempHistoryChat.length === 0)
      return this.historyChat[this.historyChat.length - 1];
    const command = this.tempHistoryChat.pop();
    this.historyChat.push(command);
    return command;
  }

  addCommand(command: string) {
    this.historyChat.push(command);
  }

  mergeHistory() {
    this.historyChat.concat(this.tempHistoryChat);
    this.tempHistoryChat = [];
  }

  cleanHistory() {
    this.historyChat = [];
    this.tempHistoryChat = [];
  }
}
