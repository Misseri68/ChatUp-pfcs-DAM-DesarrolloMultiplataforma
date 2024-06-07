import {Component, HostListener, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {CommonModule, NgFor} from "@angular/common";
import {ChatComponent} from "../chat/chat.component";
import {Router, RouterOutlet} from "@angular/router";
import {Chat} from "../../model/chat";
import {Message} from "../../model/message";
import {AuthService} from "../../services/auth.service";
import {filter, map, Observable, of, Subscription, switchMap, tap} from "rxjs";
import {FriendsComponent} from "../Popups/friends/friends.component";
import {UserInfoComponent} from "../Popups/user-info/user-info.component";
import {ChatService} from "../../services/chat.service";
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgFor, ChatComponent, RouterOutlet, FriendsComponent, UserInfoComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./styles/home.component.css']
})
export class HomeComponent implements OnInit {
  showMyInfo: boolean = false;
  showFriendInfo: boolean = false;
  showFriends: boolean = false;

  username: string | undefined;
  user$ : Observable<User | null> ;
  chats$: Observable<Chat[]> | undefined;
  selectedChatId: string |undefined;

  constructor(private router: Router, private authService: AuthService, private chatService: ChatService) {
    //Cargamos de local, si no está iniciada la sesión envía a /auth .
    this.authService.getFromLocalStorage();
    this.user$ = this.authService.currentUser$;
  }

  ngOnInit(): void {
    this.user$.pipe(
      tap(userObserved => {
        if (userObserved) {
          this.username = userObserved.username;
        }
      }),
      filter(userObserved => !!userObserved && !!this.username), // Espera a que el usuario esté definido
      switchMap(() => {
        return this.chatService.getChats(this.username!).pipe(
          map(chats => {
            chats.forEach(chat => {
              // Obtener el último mensaje de cada chat
              let lastMessage = chat.messages && chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : undefined;
              chat.lastMessage = lastMessage;
            });
            return chats; // Devolver el arreglo de chats con el último mensaje agregado
          })
        );
      })
    ).subscribe(chatsWithLastMessage => {
      this.chats$ = of(chatsWithLastMessage); // Asignar los chats al observable chats$
    });
  }

  selectChat(id_chat: string) {
    this.selectedChatId = id_chat;
  }

  //Al presionar escape el chat seleccionado vuelve a undefined.
  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.key === "Escape") {
      this.selectedChatId = undefined;
    }
  }


  //Lógica para el listado de chats:
  displayLastMessage(message: Message):string {
    let sender: string;
    if(message!= null || message != undefined){
      if( this.username != null && this.username.toLowerCase() === message.sender.toLowerCase()) sender = 'You: ';
      else sender = message.sender + ': ';
      return sender + message.text
    }
   return "There are no messages yet."
  }

  // Método que comprueba si el chat tiene foto, y si no le asigna la foto por defecto.
  displayChatPhoto(chat: Chat): string{
    if (chat.photo) return chat.photo
    else return 'assets/pictures/default_pfp2.png';
  }

  /*Método que devolverá un String con la fecha que se pondrá en cada chat del listado de Chats del usuario.
   *  return: 'hh:MM' si el último menasje fue enviado el mismo día que el día actual.
   *  return: 'yesterday' si el último mensaje fue enviado el dia anterior al día actual.
   *  return: 'dd/MM' si el último mensaje fue anterior al dia anterior del anterior al actual.
   */
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
      return 'Yest.';
    } else {       //Si no es ni hoy ni ayer:
                   //Si es del mismo año:
      if(messageDate.getFullYear() === today.getFullYear()){
        return `${messageDate.getDate().toString().padStart(2, '0')}/${(messageDate.getMonth() + 1).toString().padStart(2, '0')}`;
      }
      //Si no es del mismo año:
      else{
        return `${messageDate.getDate().toString().padStart(2, '0')}/${(messageDate.getMonth() + 1).toString().padStart(2, '0')}/${messageDate.getFullYear()}`;

      }
    }
  }

  private convertTimestampToDate(timestamp: Timestamp): Date {
    // Convertir el timestamp a objeto Date
    const milliseconds = timestamp.seconds * 1000 + Math.round(timestamp.nanoseconds / 1000000);
    return new Date(milliseconds);
  }

  displayUnreadNumber(unreads: number): string{
    if(unreads>99) return '99⁺';
    else return '' + unreads;
  }

  logout() {
    this.authService.logout();
  }

  toggleFriends() {
    this.showFriends = !this.showFriends;
  }
  toggleFriendInfo() {
    this.showFriendInfo = !this.showFriendInfo;
  }
  toggleMyInfo() {
    this.showMyInfo = !this.showMyInfo;
  }

}
