import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Chat} from "../../model/chat";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {User} from "../../model/user";
import {Observable, take, tap} from "rxjs";
import {ChatService} from "../../services/chat.service";
import {FormsModule} from "@angular/forms";
import {Message} from "../../model/message";
import {MessageService} from "../../services/message.service";
import {Timestamp} from "@angular/fire/firestore";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    AsyncPipe,
    FormsModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './styles/chat.component.css'
})
export class ChatComponent implements OnInit, OnChanges{

  @ViewChild('chatContent') private chatContainer!: ElementRef;

  @Input() id_chat :string | undefined;

  chat$ : Observable<Chat> | undefined;

  @Input() currentUsername : string | undefined;

  constructor(private chatService: ChatService, private messageService : MessageService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if(this.id_chat){
      this.chat$ = this.chatService.getChatById(this.id_chat).pipe(
        tap((chat) => {
          this.scrollToBottom();
        })
      );
    }
  }

  displayChatPhoto(chat: Chat): string{
    if (chat.photo) return chat.photo
    return 'assets/pictures/default_pfp2.png';
  }

  sendMessage() {
    const textarea = document.getElementById('expandable-textarea') as HTMLTextAreaElement;
    const text = textarea.value.trim();
    if(text.length > 0){
      textarea.value = '';
      textarea.focus();
      if(this.currentUsername){
        let message: Message = {
          isMedia: false,
          text: text,
          sender: this.currentUsername,
          date: Timestamp.now()
        }
        this.chat$?.pipe(
          take(1),
          tap(
            chat => {
              if(chat){
                this.messageService.addMessageToChat(chat.id_chat, message);
              }
            })).subscribe();
        this.scrollToBottom()

      }
    }
  }

  scrollToBottom() {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch(err) {

    }
  }

}
