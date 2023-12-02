import {Component, Input} from '@angular/core';
import {ChatMessage} from "../../models/chat-message";

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent {
  @Input()
  public chatMessage!: ChatMessage;
  @Input()
  public channelNumber!: number;
  @Input()
  public theme: string = Theme.Sideways;
  @Input()
  public showChannelName = false;
}

export enum Theme {
  Sideways = 'sideways',
  Vertical = 'vertical'
}

export function isTheme(value: string): value is Theme {
  return value in Theme;
}
