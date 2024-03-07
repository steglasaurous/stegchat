import { Injectable } from '@angular/core';
import {
  buildEmoteImageUrl,
  ChatClient,
  parseChatMessage,
  ChatMessage as TwurpleChatMessage,
} from '@twurple/chat';
import { Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ChatMessage } from '../models/chat-message';
import { ChatReader } from './chat-reader.interface';

@Injectable({
  providedIn: 'root',
})
export class TwitchChatService implements ChatReader {
  private chatClient!: ChatClient;
  private messagesSubject$ = new Subject<ChatMessage>();
  public messages$ = this.messagesSubject$.pipe(
    catchError((e) => {
      throw e;
    }),
  );

  connect(channels: string[]) {
    this.chatClient = new ChatClient({ channels: channels });
    this.chatClient.connect();
    this.chatClient.onMessage(this.processMessage.bind(this));
    this.chatClient.onAction(this.processActionMessage.bind(this));
  }

  private processActionMessage(
    channel: string,
    user: string,
    text: string,
    msg: TwurpleChatMessage,
  ): void {
    this.processMessage(channel, user, text, msg, true);
  }
  private processMessage(
    channel: string,
    user: string,
    text: string,
    msg: TwurpleChatMessage,
    isAction: boolean = false,
  ): void {
    // Takes the incoming text and parses out the emotes. Output is an array of message parts
    // Assembles a renderable message text with emote images
    const renderedMessage = parseChatMessage(text, msg.emoteOffsets).map(
      (messagePart) => {
        switch (messagePart.type) {
          case 'text':
            return messagePart.text;
          case 'emote':
            return `<img src="${buildEmoteImageUrl(messagePart.id, {
              size: '1.0',
            })}" />`;
        }

        return '';
      },
    );

    const chatMessageModel: ChatMessage = {
      msgId: msg.id,
      username: msg.userInfo.displayName,
      channel: channel,
      message: text,
      renderedMessage: renderedMessage.join(''),
      // timestamp: msg.date.getMilliseconds(),
      timestamp: Date.now(),
      color: msg.userInfo.color,
      isAction: isAction,
    };

    this.messagesSubject$.next(chatMessageModel);
  }
}
