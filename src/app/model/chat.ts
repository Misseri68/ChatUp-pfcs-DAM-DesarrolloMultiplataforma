import {User} from "./user";
import {Message} from "./message";

export interface Chat {
  id_chat: string;
  chatName: string;
  messages: Message[];
  photo?: string;
  isDM: boolean;
  participants: string[]
  unreadMessages: number;
  lastMessage?: Message;
}
