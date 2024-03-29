import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatMessage } from '../../models/chat-message';
import { isTheme } from '../chat-message/chat-message.component';
import { CHAT_READER } from '../../utils/di-tokens';
import { ChatReader } from '../../services/chat-reader.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  /**
   * The messages 'cache'.  Don't keep everything forever, just what's needed to display visible messages on screen.
   * Otherwise, toss 'em out.
   */
  public messages: ChatMessage[];
  public theme = 'sideways';
  public showChannelName = false;

  /**
   * How long to keep a message on screen, in milliseconds.
   *
   * @private
   */
  private ttl: number = 30000;

  private readonly maxMessages: number = 15;
  private channels: string[] = [];

  constructor(
    @Inject(CHAT_READER) private chatReader: ChatReader,
    private route: ActivatedRoute,
  ) {
    this.messages = [];
    // Pull out the list of channels to join from the query string "channels"
    this.route.queryParamMap.subscribe((paramMap) => {
      const channels = paramMap.get('channels');
      if (channels != null) {
        this.channels = channels.split(',');
        if (this.channels.length > 1) {
          this.showChannelName = true;
        }
        this.chatReader.connect(channels.split(','));
        this.chatReader.messages$.subscribe((chatMessage) => {
          if (this.messages.length > this.maxMessages) {
            this.messages.pop();
          }

          this.messages.unshift(chatMessage);
        });
      } else {
        console.log(
          'No channels found in query string.  Specify a comma-delimited list of channel names to join',
        );
      }

      if (paramMap.has('theme')) {
        const themeFromQuery = paramMap.get('theme');
        console.log('Theme: ' + themeFromQuery);
        if (themeFromQuery != null && isTheme(themeFromQuery)) {
          console.log('setting theme');
          this.theme = themeFromQuery;
        }
      }

      if (paramMap.has('message_ttl')) {
        this.ttl = parseInt(paramMap.get('message_ttl') ?? '30000');
      }
      // Check the message queue for expiring messages on a regular basis.
      if (this.ttl > 0) {
        setInterval(() => {
          const now = Date.now();

          for (const [key, message] of this.messages.entries()) {
            if (now - message.timestamp > this.ttl) {
              this.messages.splice(key, 1);
            }
          }
        }, 1000);
      }

    });

  }

  getChannelNumber(chatMessage: ChatMessage) {
    for (let i = 0; i < this.channels.length; i++) {
      if (this.channels[i] == chatMessage.channel) {
        return i;
      }
    }

    return 0;
  }
}
