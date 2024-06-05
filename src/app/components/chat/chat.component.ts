import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Chat} from "../../model/chat";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {User} from "../../model/user";
import {Observable} from "rxjs";
import {ChatService} from "../../services/chat.service";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './chat.component.html',
  styleUrl: './styles/chat.component.css'
})
export class ChatComponent implements OnInit, OnChanges{


  @Input() id_chat :string | undefined;

  chat$ : Observable<Chat> | undefined;

  @Input() currentUsername : string | undefined;

  constructor(private chatService: ChatService) {
  }

  ngOnInit(): void {
  }
  ngOnChanges() {
    if(this.id_chat){
      this.chat$ = this.chatService.getChatByIdEager(this.id_chat)
    }
  }


  displayChatPhoto(chat: Chat): string{
    if (chat.photo) return chat.photo
    return 'assets/pictures/default_pfp2.png';
  }

  sendMessage(){}


}
