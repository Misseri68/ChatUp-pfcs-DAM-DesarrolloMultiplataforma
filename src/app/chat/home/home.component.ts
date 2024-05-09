import { Component } from '@angular/core';
import {User} from "../../model/user";
import {CommonModule, NgFor} from "@angular/common";
import {ChatComponent} from "../chat/chat.component";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Chat} from "../../model/chat";
import {Message} from "../../model/message";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgFor, ChatComponent],
  templateUrl: './home.component.html',
  styleUrl: './styles/home.component.css'
})
export class HomeComponent {

  constructor(private router: Router, private userService: UserService) {}

  user! : User ;

  ngOnInit(): void {
    try {
      this.user = this.userService.getUserByUsername('user1');
    } catch (error) {
      console.error(error);
      this.router.navigate(['/auth']);
    }
  }

  displayChat(chat: Chat)  {
  }

  displayLastMessage(message: Message):string {
    let sender: string;
    if(message.sender.toLowerCase() === this.user.username.toLowerCase()) sender = 'You: ';
    else sender = message.sender + ': ';
    return sender + message.text
  }


  // Método que comprueba si el chat tiene foto, y si no le asigna la foto por defecto.
  displayChatPhoto(chat: Chat): string{
    if (chat.photo) return chat.photo
    return 'assets/pictures/default_pfp2.png';
  }


  /*Método que devolverá un String con la fecha que se pondrá en cada chat del listado de Chats del usuario.
   *  return: 'hh:MM' si el último menasje fue enviado el mismo día que el día actual.
   *  return: 'yesterday' si el último mensaje fue enviado el dia anterior al día actual.
   *  return: 'dd/MM' si el último mensaje fue anterior al dia anterior del anterior al actual.
   */
  displayTime(messageDate: Date): string{
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    // Comprobar si la fecha (año, mes y día) es la misma
    if (messageDate.getFullYear() === today.getFullYear() && messageDate.getMonth() === today.getMonth() && messageDate.getDate() === today.getDate()) {
      //Se usa padStart para añadir un 0 antes del dígito y tener un formato correcto.
      return `${messageDate.getHours().toString().padStart(2, '0')}:${messageDate.getMinutes().toString().padStart(2, '0')}`;
    } //comprueba si la fecha del mensaje es ayer
    else if (messageDate.getFullYear() === yesterday.getFullYear() && messageDate.getMonth() === yesterday.getMonth() && messageDate.getDate() === yesterday.getDate()) {
      return 'Yesterday';
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

  displayUnreadNumber(unreads: number): string{
    if(unreads>99) return '99⁺';
    else return '' + unreads;
  }
}
