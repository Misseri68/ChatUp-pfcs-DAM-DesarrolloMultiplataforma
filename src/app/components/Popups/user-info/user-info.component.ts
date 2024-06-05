import {Component, EventEmitter, HostListener, Output} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../../model/user";
import {AsyncPipe, NgForOf} from "@angular/common";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {

  users$: Observable<User[]>;
  constructor(private userService: UserService) {
    this.users$ = this.userService.getAllUsers();
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
