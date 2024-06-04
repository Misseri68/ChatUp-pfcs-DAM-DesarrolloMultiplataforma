import {Component, Input, OnInit} from '@angular/core';
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
export class ChatComponent implements OnInit{

  @Input() selectedChat!: Chat;
  chat$ : Observable<Chat> | null = null

  @Input() currentUser$: Observable<User | null> | null = null;

  constructor(private chatService: ChatService) {
  }

  ngOnInit(): void {
    this.chat$ = this.chatService.loadChatMessages(this.selectedChat.id_chat)

  }

  displayChatPhoto(chat: Chat): string{
    if (chat.photo) return chat.photo
    return 'assets/pictures/default_pfp2.png';
  }

  sendMessage(){}


}
