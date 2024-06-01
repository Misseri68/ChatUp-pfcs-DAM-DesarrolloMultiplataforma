import { Component } from '@angular/core';
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

}
