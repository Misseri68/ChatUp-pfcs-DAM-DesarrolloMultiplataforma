import { Injectable } from '@angular/core';
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  USERS : User[] = [
    {
      "username": "user1",
      "description": "User 1 description here",
      "status": true,
      "profilePicture": "../../assets/pictures/default_pfp.png",
      "userOptions": {},
      "chats": [
        {
          "id_chat": "chat1",
          "chatName": "Team Alpha",
          "isDM": false,
          "participants": ["user1", "user2"],
          "unreadMessages": 1000,
          "photo": "../../assets/pictures/default_pfp.png",
          "lastMessage": {
            "message_id": "PRUEBA1" ,
            "isMedia": false,
            "media": "",
            "text": "pene1",
            "sender": "user2",
            "date": new Date('2022-03-08T15:45:00Z')
          }
        },
        {
          "id_chat": "chat2",
          "chatName": "Direct Chat with User3eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
          "isDM": true,
          "participants": ["user1", "user3"],
          "unreadMessages": 12,
          "lastMessage": {
            "message_id": "PRUEBA2" ,
            "isMedia": false,
            "media": "",
            "text": "pene2eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
            "sender": "user3",
            "date": new Date('2024-05-09T08:20:00Z')
          }
        },
        {
          "id_chat": "chat3",
          "chatName": "Budget Discussion",
          "isDM": false,
          "participants": ["user1","user2", "user3"],
          "unreadMessages": 0,
          "lastMessage": {
            "message_id": "PRUEBA3" ,
            "isMedia": false,
            "media": "",
            "text": "pene3",
            "sender": "user1",
            "date": new Date('2024-11-23T23:30:00Z')
          }
        },
        {
          "id_chat": "chat1",
          "chatName": "Team Alpha",
          "isDM": false,
          "participants": ["user1", "user2"],
          "unreadMessages": 5,
          "lastMessage": {
            "message_id": "PRUEBA1" ,
            "isMedia": false,
            "media": "",
            "text": "pene1",
            "sender": "user2",
            "date": new Date('2022-03-08T15:45:00Z')
          }
        },
        {
          "id_chat": "chat2",
          "chatName": "Direct Chat with User3eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
          "isDM": true,
          "participants": ["user1", "user3"],
          "unreadMessages": 12,
          "lastMessage": {
            "message_id": "PRUEBA2" ,
            "isMedia": false,
            "media": "",
            "text": "pene2eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
            "sender": "user3",
            "date": new Date('2024-05-09T08:20:00Z')
          }
        },
        {
          "id_chat": "chat3",
          "chatName": "Budget Discussion",
          "isDM": false,
          "participants": ["user1","user2", "user3"],
          "unreadMessages": 0,
          "lastMessage": {
            "message_id": "PRUEBA3" ,
            "isMedia": false,
            "media": "",
            "text": "pene3",
            "sender": "user1",
            "date": new Date('2024-11-23T23:30:00Z')
          }
        },
        {
          "id_chat": "chat1",
          "chatName": "Team Alpha",
          "isDM": false,
          "participants": ["user1", "user2"],
          "unreadMessages": 5,
          "lastMessage": {
            "message_id": "PRUEBA1" ,
            "isMedia": false,
            "media": "",
            "text": "pene1",
            "sender": "user2",
            "date": new Date('2022-03-08T15:45:00Z')
          }
        },
        {
          "id_chat": "chat2",
          "chatName": "Direct Chat with User3eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
          "isDM": true,
          "participants": ["user1", "user3"],
          "unreadMessages": 12,
          "lastMessage": {
            "message_id": "PRUEBA2" ,
            "isMedia": false,
            "media": "",
            "text": "pene2eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
            "sender": "user3",
            "date": new Date('2024-05-09T08:20:00Z')
          }
        },
        {
          "id_chat": "chat3",
          "chatName": "Budget Discussion",
          "isDM": false,
          "participants": ["user1","user2", "user3"],
          "unreadMessages": 0,
          "lastMessage": {
            "message_id": "PRUEBA3" ,
            "isMedia": false,
            "media": "",
            "text": "pene3",
            "sender": "user1",
            "date": new Date('2024-11-23T23:30:00Z')
          }
        },
        {
          "id_chat": "chat1",
          "chatName": "Team Alpha",
          "isDM": false,
          "participants": ["user1", "user2"],
          "unreadMessages": 5,
          "lastMessage": {
            "message_id": "PRUEBA1" ,
            "isMedia": false,
            "media": "",
            "text": "pene1",
            "sender": "user2",
            "date": new Date('2022-03-08T15:45:00Z')
          }
        },
        {
          "id_chat": "chat2",
          "chatName": "Direct Chat with User3eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
          "isDM": true,
          "participants": ["user1", "user3"],
          "unreadMessages": 12,
          "lastMessage": {
            "message_id": "PRUEBA2" ,
            "isMedia": false,
            "media": "",
            "text": "pene2eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
            "sender": "user3",
            "date": new Date('2024-05-09T08:20:00Z')
          }
        },
        {
          "id_chat": "chat3",
          "chatName": "Budget Discussion",
          "isDM": false,
          "participants": ["user1","user2", "user3"],
          "unreadMessages": 0,
          "lastMessage": {
            "message_id": "PRUEBA3" ,
            "isMedia": false,
            "media": "",
            "text": "pene3",
            "sender": "user1",
            "date": new Date('2024-11-23T23:30:00Z')
          }
        }
        ,
        {
          "id_chat": "chat1",
          "chatName": "Team Alpha",
          "isDM": false,
          "participants": ["user1", "user2"],
          "unreadMessages": 5,
          "lastMessage": {
            "message_id": "PRUEBA1" ,
            "isMedia": false,
            "media": "",
            "text": "pene1",
            "sender": "user2",
            "date": new Date('2022-03-08T15:45:00Z')
          }
        },
        {
          "id_chat": "chat2",
          "chatName": "Direct Chat with User3eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
          "isDM": true,
          "participants": ["user1", "user3"],
          "unreadMessages": 12,
          "lastMessage": {
            "message_id": "PRUEBA2" ,
            "isMedia": false,
            "media": "",
            "text": "pene2eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
            "sender": "user3",
            "date": new Date('2024-05-09T08:20:00Z')
          }
        },
        {
          "id_chat": "chat3",
          "chatName": "Budget Discussion",
          "isDM": false,
          "participants": ["user1","user2", "user3"],
          "unreadMessages": 0,
          "lastMessage": {
            "message_id": "PRUEBA3" ,
            "isMedia": false,
            "media": "",
            "text": "pene3",
            "sender": "user1",
            "date": new Date('2024-11-23T23:30:00Z')
          }
        }
      ]
      ,
      "friends": ["user2", "user3"],
      "pendingRequests": []
    },
    {
      "username": "user2",
      "description": "User 2 description here",
      "status": false,
      "profilePicture": "url_to_profile_picture2.jpg",
      "userOptions": {},
      "chats": [
        {
          "id_chat": "chat1",
          "chatName": "Team Alpha",
          "isDM": false,
          "participants": ["user1", "user2"],
          "unreadMessages": 5,
          "lastMessage": {
            "message_id": "PRUEBA1" ,
            "isMedia": false,
            "media": "",
            "text": "pene1",
            "sender": "user2",
            "date": new Date('2024-03-08T15:45:00Z')
          }
        },
        {
          "id_chat": "chat3",
          "chatName": "Budget Discussion",
          "isDM": false,
          "participants": ["user1","user2", "user3"],
          "unreadMessages": 1,
          "lastMessage": {
            "message_id": "PRUEBA3" ,
            "isMedia": false,
            "media": "",
            "text": "pene3",
            "sender": "user1",
            "date": new Date('2024-11-23T23:30:00Z')
          }
        }],
      "friends": ["user1"],
      "pendingRequests": []
    },
    {
      "username": "user3",
      "description": "User 3 description here",
      "status": true,
      "profilePicture": "url_to_profile_picture3.jpg",
      "userOptions": {},
      "chats": [
        {
          "id_chat": "chat2",
          "chatName": "Direct Chat with User3",
          "isDM": true,
          "participants": ["user1", "user3"],
          "unreadMessages": 10,
          "lastMessage": {
            "message_id": "PRUEBA2" ,
            "isMedia": false,
            "media": "",
            "text": "pene2",
            "sender": "user3",
            "date": new Date('2024-07-15T08:20:00Z')
          }
        },
        {
          "id_chat": "chat3",
          "chatName": "Budget Discussion",
          "isDM": false,
          "participants": ["user1","user2", "user3"],
          "unreadMessages": 99,
          "lastMessage": {
            "message_id": "PRUEBA3" ,
            "isMedia": false,
            "media": "",
            "text": "pene3",
            "sender": "user1",
            "date": new Date('2024-11-23T23:30:00Z')
          }
        }
      ],
      "friends": ["user1" ],
      "pendingRequests": ["user2"]
    }
  ];


  getUserByUsername(username: string): User {
    const user = this.USERS.find(user => user.username.toLowerCase() === username.toLowerCase());
    if (!user) {
      throw new Error(`User not found for username: ${username}`);
    }
    return user;
  }

  formatDate(date: Date) {
    const day = date.getDate().toString().padStart(2, '0'); // Asegura dos dígitos
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Meses van de 0 a 11
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }




}
