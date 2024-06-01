import {Component, EventEmitter, HostListener, Output} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {map, Observable, pipe, take, tap} from "rxjs";
import {User} from "../../../model/user";
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../services/user.service";

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

  searchFriendResponse: string = '';
  user$: Observable<User> ;
  user$prueba : Observable<User> = this.userService.getUserByUsername("TodasPutas");

  constructor(private authService: AuthService, private userService: UserService) {
    this.user$ = this.authService.currentUser$
  }

  /* Este método devuelve un String que informa al usuario de todos los posibles casos al enviar una solicitud de amistad:
     * Si está en nuestra lista de amigos, si el usuario existe, si la solicitud a ese usuario ya fue enviada...
     * Tras comprobarlo, se cogerá el usuario, su lista de solicitudes, y se añadirá el nombre a su lista de solicitudes.*/

  searchFriend(friendName: string) {
    let currentUsername : string;
    this.user$.pipe(
      //Coger solo el primer resultado para no crear un bucle infinito.
      take(1),
      tap(
        currentUser => {
          currentUsername = currentUser.username;
          if(currentUsername == friendName){
            //Si el nombre de usuario que envías es el mismo que el nombre del usuario actual:
            this.searchFriendResponse = "Nice try, but sadly, you can't add yourself as a friend.";
          }else{
            if(currentUser.friends?.includes(friendName)) {
              //Si el nombre del amigo ya se encuentra en tu lista de amigos:
              this.searchFriendResponse = "The user " + friendName + " is already your friend.";
            }
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
          }})
    ).subscribe();
  }


  acceptFriend(friendName: string) {
    let currentUsername : string = '';
    this.user$.pipe(
      take(1),
      tap(
        user => {
          currentUsername = user.username;
          user.pendingRequests = user.pendingRequests?.filter( request => request !== friendName);
          user.friends?.push(friendName);
          this.userService.updateUser(user.username, user);
        })
    ).subscribe()

    this.userService.getUserByUsername(friendName).pipe(
      take(1),
      tap(
        friendUser => {
          friendUser.friends?.push(currentUsername)
          this.userService.updateUser(friendName, friendUser)
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

  goToChat(friendName: string){

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
