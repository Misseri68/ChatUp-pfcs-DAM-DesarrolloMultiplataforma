import { Component } from '@angular/core';
import {User} from "../../model/user";
import {CommonModule, NgFor} from "@angular/common";
import {ChatComponent} from "../chat/chat.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgFor, ChatComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  user! : User ;

}
