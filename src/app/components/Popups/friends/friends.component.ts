import {Component, EventEmitter, HostListener, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {map, pipe, take, tap} from "rxjs";
import {User} from "../../../model/user";
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.css'
})
export class FriendsComponent {

  user: User | null = null;
  friendList: string[] = [];
  searchFriendResponse: string = '';

  constructor(private authService: AuthService, private userService: UserService) {
    this.authService.currentUser$.subscribe(userObserved => {
    this.user = userObserved;
    if(userObserved?.friends) this.friendList = userObserved.friends;
    });
    console.log(this.userService.getUserByUsername("a"))
  }

  /*
  * Este método devuelve un String que informa al usuario de todos los posibles casos al enviar una solicitud de amistad:
     * Si está en nuestra lista de amigos, si el usuario existe, si la solicitud a ese usuario ya fue enviada...
     * Tras comprobarlo, se cogerá el usuario, su lista de solicitudes, y se añadirá el nombre a su lista de solicitudes.*/

  searchFriend(friendName: string) {
    if(this.user){
      let myUsername = this.user.username;
      if(myUsername == friendName) {this.searchFriendResponse = "Nice try, but you sadly can't add yourself." ;
      }else{
        if (this.user.friends?.includes(friendName)) {
          this.searchFriendResponse = 'The user ' + friendName + ' is already your friend.'
        } else {
          this.userService.getUserByUsername(friendName).pipe(take(1)).subscribe(
            (friendUser: User | null) => {
              if (friendUser) {
                if(friendUser.pendingRequests?.includes(myUsername)){
                  this.searchFriendResponse = 'You already sent a friend request to ' + friendName + "!!!!"
                }else {
                  friendUser.pendingRequests?.push(myUsername)
                  this.userService.updateUser(friendName, friendUser).then(r =>  this.searchFriendResponse = 'Request sent to user ' + friendName)
                  return;
                }
              } else {
                this.searchFriendResponse = 'The user ' + friendName + ' was not found.'
              }
            });
        }
      }
    }
  }

  acceptFriend(friendName: string) {
    if(this.user && this.user?.username){
      if (this.user?.pendingRequests && this.user.pendingRequests.includes(friendName)) {
        this.user.pendingRequests = this.user.pendingRequests.filter( request => request !== friendName)
        this.user.friends?.push(friendName);

        this.userService.getUserByUsername(friendName).pipe(take(1)).subscribe(
          friendUser => {
            if(!friendUser.friends?.includes(<string>this.user?.username)){
              friendUser.friends?.push(<string>this.user?.username)
              this.userService.updateUser(friendName, friendUser)
              return;
            }
            return;
          }
        )
        this.userService.updateUser(this.user.username, this.user)
      }
    }
  }

  rejectFriend(friendName: string){
    if(this.user?.pendingRequests && this.user.pendingRequests.includes(friendName)){
      this.user.pendingRequests = this.user.pendingRequests.filter( request => request !== friendName)
      this.userService.updateUser(this.user.username, this.user)
    }
  }

  goToChat(friendName: string){

  }


  @Output() closePopup: EventEmitter<void> = new EventEmitter<void>();
  onClose() {
    this.closePopup.emit();
  }
  /*@HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.closePopup.emit();
  }

*/
}
