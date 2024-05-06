import {Chat} from "./chat";

export interface User {
  user_id: string;
  username: string;
  tag: number;
  chats : Chat [];
}
