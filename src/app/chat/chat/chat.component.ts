import {Component, OnInit} from '@angular/core';
import {Chat} from "../../model/chat";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit{

  chat!: Chat;

  ngOnInit(): void {
  }



}
