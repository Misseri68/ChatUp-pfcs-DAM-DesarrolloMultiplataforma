import {Chat} from "./chat";
import {UserOptions} from "./useroptions";

export interface User {
  username: string;
  description: string;
  status: boolean;
  userOptions?: UserOptions;
  profilePicture?: string;
  chats?: Chat [];
  friends?: string[];
  pendingRequests?: string[];
}