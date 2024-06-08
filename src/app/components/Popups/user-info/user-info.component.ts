import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../../model/user";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-user-info',
  standalone: true,
    imports: [
        NgForOf,
        AsyncPipe,
        NgIf
    ],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {
  @Input() username: string | undefined;
   user$: Observable<User> | undefined;
  constructor(private userService: UserService) {
    if(this.username){
      console.log("HI")
      this.user$ = userService.getUserByUsername(this.username)
    }
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
