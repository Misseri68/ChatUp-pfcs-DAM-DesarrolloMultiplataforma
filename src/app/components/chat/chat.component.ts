import {Component, Input, OnInit} from '@angular/core';
import {Chat} from "../../model/chat";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {User} from "../../model/user";
import {Observable} from "rxjs";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './chat.component.html',
  styleUrl: './styles/chat.component.css'
})
export class ChatComponent implements OnInit{

  @Input() chat!: Chat;
  @Input() currentUser$: Observable<User | null> | null = null;

  ngOnInit(): void {

  }




}
