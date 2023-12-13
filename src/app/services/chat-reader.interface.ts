import { ChatMessage } from '../models/chat-message';
import { Observable } from 'rxjs';

export interface ChatReader {
  messages$: Observable<ChatMessage>;
  connect(channels: string[]): void;
}
