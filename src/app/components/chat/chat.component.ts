import {Component, ElementRef, Input, OnChanges, OnInit,  ViewChild} from '@angular/core';
import {Chat} from "../../model/chat";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {from,  Observable, of, switchMap, take, tap} from "rxjs";
import {ChatService} from "../../services/chat.service";
import {FormsModule} from "@angular/forms";
import {Message} from "../../model/message";
import {MessageService} from "../../services/message.service";
import {Timestamp} from "@angular/fire/firestore";
import {UserService} from "../../services/user.service";

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

  constructor(private chatService: ChatService, private messageService : MessageService, private userService: UserService) {
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
    if(textarea!=null){
      textarea.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
          event.preventDefault();
        }
      });
    }
    const text = textarea.value.trim();
    if(text.length > 0){
      textarea.value = ''.trim()
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
  displayTime(timestamp: Timestamp): string{
    const messageDate = this.convertTimestampToDate(timestamp);

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    // Comprobar si la fecha (año, mes y día) es la misma
    if (messageDate.getFullYear() === today.getFullYear() && messageDate.getMonth() === today.getMonth() && messageDate.getDate() === today.getDate()) {
      //Se usa padStart para añadir un 0 antes del dígito y tener un formato correcto.
      return `${messageDate.getHours().toString().padStart(2, '0')}:${messageDate.getMinutes().toString().padStart(2, '0')}`;
    } //comprueba si la fecha del mensaje es ayer
    else if (messageDate.getFullYear() === yesterday.getFullYear() && messageDate.getMonth() === yesterday.getMonth() && messageDate.getDate() === yesterday.getDate()) {
      return 'Yest. ' + `${messageDate.getHours().toString().padStart(2, '0')}:${messageDate.getMinutes().toString().padStart(2, '0')}`;
    } else {       //Si no es ni hoy ni ayer:
      //Si es del mismo año:
      if(messageDate.getFullYear() === today.getFullYear()){
        return `${messageDate.getDate().toString().padStart(2, '0')}/${(messageDate.getMonth() + 1).toString().padStart(2, '0')} ${messageDate.getHours().toString().padStart(2, '0')}:${messageDate.getMinutes().toString().padStart(2, '0')}`;
      }
      //Si no es del mismo año:
      else{
        return `${messageDate.getDate().toString().padStart(2, '0')}/${(messageDate.getMonth() + 1).toString().padStart(2, '0')}/${messageDate.getFullYear()} ${messageDate.getHours().toString().padStart(2, '0')}:${messageDate.getMinutes().toString().padStart(2, '0')}`;

      }
    }
  }

  protected convertTimestampToDate(timestamp: Timestamp): Date {
    //
    const milliseconds = timestamp.seconds * 1000 + Math.round(timestamp.nanoseconds / 1000000);
    return new Date(milliseconds);
  }

  scrollToBottom() {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch(err) {

    }
  }

}


/*
No leer, intento de método que no funcionó, para futuro.
isFriend(): Observable<boolean> {
  if(this.chat$){

    return this.chat$.pipe(
      switchMap(chat => {

        // Verifica si es un chat directo con exactamente 2 participantes
        if (chat.isDM && chat.participants.length === 2) {
          // Devuelve una promesa que resuelve si los participantes son amigos
          return from(this.userService.isFriend(chat.participants[0], chat.participants[1]));
        } else {
          // Si no es un chat directo o no tiene exactamente 2 participantes, devuelve false
          return of(false);
        }
      })
    );
  }
  else return of(false);
}*/

