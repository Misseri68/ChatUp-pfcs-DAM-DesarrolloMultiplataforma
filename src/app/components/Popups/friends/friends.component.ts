import {Component, EventEmitter, HostListener, Output} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {map, Observable, pipe, take, tap} from "rxjs";
import {User} from "../../../model/user";
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../services/user.service";
import {ChatService} from "../../../services/chat.service";
import {Chat} from "../../../model/chat";

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.css'
})
export class FriendsComponent {

  @Output() selectedChatId = new EventEmitter<string>();
  searchFriendResponse: string = '';
  user$: Observable<User>;

  constructor(private authService: AuthService, private userService: UserService, private chatService: ChatService) {
    this.user$ = this.authService.currentUser$
  }

  /* Este método devuelve un String que informa al usuario de todos los posibles casos al enviar una solicitud de amistad:
     * Si está en nuestra lista de amigos, si el usuario existe, si la solicitud a ese usuario ya fue enviada...
     * Tras comprobarlo, se cogerá el usuario, su lista de solicitudes, y se añadirá el nombre a su lista de solicitudes.*/

  searchFriend(friendName: string) {
    let currentUsername: string;
    this.user$.pipe(
      //Coger solo el primer resultado para no crear un bucle infinito.
      take(1),
      tap(
        currentUser => {
          currentUsername = currentUser.username;
          if (currentUsername == friendName) {
            //Si el nombre de usuario que envías es el mismo que el nombre del usuario actual:
            this.searchFriendResponse = "Nice try, but sadly, you can't add yourself as a friend.";
          } else {
            if (currentUser.friends?.includes(friendName)) {
              //Si el nombre del amigo ya se encuentra en tu lista de amigos:
              this.searchFriendResponse = "The user " + friendName + " is already your friend.";
            }
            else{
              this.userService.getUserByUsername(friendName).pipe(
                take(1),
                tap(friendUser => {
                  if (friendUser) {
                    if (friendUser.pendingRequests?.includes(currentUsername)) {
                      this.searchFriendResponse = `You already sent a friend request to ${friendName}!`;
                    } else {
                      friendUser.pendingRequests?.push(currentUsername);
                      this.userService.updateUser(friendName, friendUser);
                      this.searchFriendResponse = `Request sent to user ${friendName}`;
                    }
                  } else {
                    this.searchFriendResponse = `The user ${friendName} was not found.`;
                  }
                })
              ).subscribe();
            }
          }
        })
    ).subscribe();
  }

  acceptFriend(friendName: string) {
    let currentUsername: string = '';
    this.user$.pipe(
      take(1),
      tap(
        user => {
          currentUsername = user.username;
          user.pendingRequests = user.pendingRequests?.filter(request => request !== friendName);
          user.friends?.push(friendName);
          this.userService.updateUser(user.username, user);
        })
    ).subscribe()

    this.userService.getUserByUsername(friendName).pipe(
      take(1),
      tap(
        friendUser => {
          if(friendUser){
            friendUser.friends?.push(currentUsername)
            this.userService.updateUser(friendName, friendUser)
          }
        })
    ).subscribe();
  }

  rejectFriend(friendName: string) {
    this.user$.pipe(
      take(1),
      tap(user => {
        if (user.pendingRequests && user.pendingRequests.includes(friendName)) {
          //Devuelve una nueva lista que pase el filtro, en este caso, todos los amigos que no coincidan con el nombre de amigo pasado.
          user.pendingRequests = user.pendingRequests.filter(request => request !== friendName);
          this.userService.updateUser(user.username, user);
        }
      })
    ).subscribe();
  }

  unfriend(friendName: string){
    //TODO popup que te pida confirmacion

    let currentUsername : string;
    this.user$.pipe(
      take(1),
      tap(
        user =>{
          if(user && user.friends && user.friends.includes(friendName)){
            currentUsername = user.username
            user.friends = user.friends.filter( name => name !== friendName);
            this.userService.updateUser(currentUsername, user)
          }
        }
      )
    ).subscribe()

    this.userService.getUserByUsername(friendName).pipe(
      take(1),
      tap(
        friend => {
          if(friend && friend.friends && friend.friends.includes(currentUsername)){
            friend.friends = friend.friends.filter(name => name !== currentUsername);
            this.userService.updateUser(friendName, friend);
          }
        }
      )
    ).subscribe()

  }

  goToChat(currentUserName: string, friendName: string) {
    this.chatService.getDmChat(currentUserName, friendName).pipe(
      take(1),
      tap(
        async currentChat => {
          if (currentChat != null) {
            this.selectedChatId.emit(currentChat.id_chat);
            this.closePopup.emit()
          } else {
            const newChat = {
              chatName: `DM with ${friendName} and ${currentUserName}. `,  //TODO
              messages: [],
              photo: '../../../assets/pictures/default_pfp2.png',
              isDM: true,
              participants: [currentUserName, friendName],
              unreadMessages: 0
            };

            const createdChat = await this.chatService.createChat(newChat);
            if(createdChat!=null){
              this.selectedChatId.emit(createdChat.id_chat)
            }
          }
        })).subscribe()
  }

  //Emitir evento de cierre al padre.
  @Output() closePopup: EventEmitter<void> = new EventEmitter<void>();
  onClose() {
    this.closePopup.emit();
  }


  //Si se presiona escape se sale del popup.
  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
   if (event.key === "Escape") {
    this.closePopup.emit();
    }
  }

}
