import { Component } from '@angular/core';
import {ChatMessageModel, EmoteModel} from "../../chat-message.model";
import {WebsocketService} from "../../services/websocket.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  /**
   * The messages 'cache'.  Don't keep everything forever, just what's needed to display visible messages on screen.
   * Otherwise, toss 'em out.
   */
  public messages: ChatMessageModel[];

  /**
   * How long to keep a message on screen, in milliseconds.
   *
   * @private
   */
  private ttl: number = 30000;

  private websocketService: WebsocketService;

  constructor() {
    this.messages = [];

    this.websocketService = new WebsocketService(
      '10.0.0.100',
      8090
    );

    this.websocketService.connect({
      next: (value) => {
        this.websocketService.sendMessage(
          {
            id: "sub",
            request: "Subscribe",
            events: {
              twitch: [
                "ChatMessage"
              ],
              raw: [
                "Action"
              ]
            }
          }
        );
      },
      error: () => {},
      complete: () => {}
    });

    this.websocketService.messages$.subscribe(async (message:any) => {
      if (message.event && message.event.type == 'ChatMessage') {
        if (message.event.source != 'Twitch') {
          console.warn('Chat message was not from twitch. Only twitch messages are currently supported.');
          return;
        }

        console.log(message);

        let emotes: EmoteModel[] = [];

        for (let emote of message.data.message.emotes) {
          emotes.push({
            name: emote.name,
            imageUrl: emote.imageUrl,
            startIndex: emote.startIndex,
            endIndex: emote.endIndex,
            type: emote.type,
            id: emote.id
          });
        }
        if (this.messages.length > 5) {
          this.messages.pop();
        }

        this.messages.unshift(
          {
            username: message.data.message.username,
            displayName: message.data.message.displayName,
            userId: message.data.message.userId,
            subscriber: message.data.message.subscriber,
            msgId: message.data.message.msgId,
            role: message.data.message.role,
            color: message.data.message.color,
            message: message.data.message.message,
            isHighlight: message.data.message.isHighlight,
            bits: message.data.message.bits,
            isReply: message.data.message.isReply,
            replyTo: message.data.message.replyTo ?? undefined,
            firstMessage: message.data.message.firstMessage,
            emotes: emotes,
            timestamp: Date.now()
          }
        );
      }
    });

    // Check the message queue for expiring messages on a regular basis.
    setInterval(() => {
      const now = Date.now();

      for (const [key, message] of this.messages.entries()) {
        if (now - message.timestamp > this.ttl) {
          this.messages.splice(key, 1);
        }
      }
    }, 1000);
  }
}
