import { ChatReader } from './chat-reader.interface';
import { catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ChatMessage } from '../models/chat-message';

export class FakeMessageGeneratorService implements ChatReader {
  private fakeMessages: string[] = [
    'this is a test message',
    'hello!',
    'Check test one two.',
    'This is a very long message talking about stuff and things and yadda yadda  yadda blah blah blah',
    'https://one-huge-url-that-is-big.com/and-is-completely/unbroken/with-lots-of-data?about=things&and=stuff',
  ];
  private fakeUsers: string[] = [
    'SomeUser',
    'steglasaurous',
    'MortalTombatVR',
    'SomeOtherFrigginGuy',
    'DoYouEvenLiftBruh',
  ];
  private colours = ['#ff0000', '#00ff00', '#0000ff', '#ffffff'];
  // FIXME: Try adding emotes at some point.

  private intervalTimerHandle: any;

  private channels: string[] = [];
  private messagesSubject$ = new Subject<ChatMessage>();
  public messages$ = this.messagesSubject$.pipe(
    catchError((e) => {
      throw e;
    }),
  );

  connect(channels: string[]) {
    this.channels = channels;
    this.intervalTimerHandle = setInterval(() => {
      const message =
        this.fakeMessages[this.randomNumber(0, this.fakeMessages.length)];

      this.messagesSubject$.next({
        msgId: (Math.random() * 100).toString(),
        color: this.colours[this.randomNumber(0, this.colours.length)],
        channel: this.channels[this.randomNumber(0, this.channels.length)],
        message: message,
        renderedMessage: message,
        username: this.fakeUsers[this.randomNumber(0, this.fakeUsers.length)],
        timestamp: Date.now(),
      });
    }, 2000);
  }

  stop() {
    clearInterval(this.intervalTimerHandle);
  }

  private randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
