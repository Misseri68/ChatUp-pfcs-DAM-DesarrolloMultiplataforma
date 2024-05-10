import {Component, Input, OnInit} from '@angular/core';
import {Chat} from "../../model/chat";
import {Message} from "../../model/message";
import {NgForOf, NgIf} from "@angular/common";
import {User} from "../../model/user";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './chat.component.html',
  styleUrl: './styles/chat.component.css'
})
export class ChatComponent implements OnInit{

  @Input() chat!: Chat | undefined;
  @Input() currentUser!: User;
  ngOnInit(): void {
  }



}
