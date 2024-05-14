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
      "description": "User 1's description here",
      "status": true,
      "profilePicture": "assets/pictures/default_pfp.png",
      "chats": [
        {
          "id_chat": "chat1",
          "chatName": "Project Alpha",
          "photo": 'assets/pictures/default_pfp.png',
          "isDM": false,
          "participants": ["user1", "user2", "user333"],
          "unreadMessages": 100,
          "lastMessage": {
            "message_id": "msg3",
            "isMedia": false,
            "text": "Reminder: Meeting at 3 PM today.",
            "sender": "user1",
            "date": new Date("2024-05-10T08:45:00Z")
          },
          "messages": [
            { message_id: "msg1", isMedia: false, text: "Hola, ¿cómo estás?", sender: "user1", date: new Date("2024-01-01T09:00:00") },
            { message_id: "msg2", isMedia: true, media: "http://example.com/image1.jpg", text: "", sender: "user2", date: new Date("2024-01-01T09:05:00") },
            { message_id: "msg3", isMedia: false, text: "Estoy bien, gracias por preguntar.", sender: "user1", date: new Date("2024-01-01T09:10:00") },
            { message_id: "msg4", isMedia: true, media: "http://example.com/image2.jpg", text: "", sender: "user33", date: new Date("2024-01-01T09:15:00") },
            { message_id: "msg5", isMedia: false, text: "¿Vamos al cine esta noche?", sender: "user2", date: new Date("2024-01-01T09:20:00") },
            { message_id: "msg6", isMedia: false, text: "Claro, ¿a qué hora?", sender: "user1", date: new Date("2024-01-01T09:25:00") },
            { message_id: "msg7", isMedia: true, media: "http://example.com/image3.jpg", text: "", sender: "user33", date: new Date("2024-01-01T09:30:00") },
            { message_id: "msg8", isMedia: false, text: "A las 8 estaría perfecto.", sender: "user2", date: new Date("2024-01-01T09:35:00") },
            { message_id: "msg9", isMedia: false, text: "Allí nos vemos.", sender: "user1", date: new Date("2024-01-01T09:40:00") },
            { message_id: "msg10", isMedia: true, media: "http://example.com/image4.jpg", text: "", sender: "user33", date: new Date("2024-01-01T09:45:00") },
            { message_id: "msg11", isMedia: false, text: "Perfecto, he reservado las entradas.", sender: "user2", date: new Date("2024-01-01T09:50:00") },
            { message_id: "msg12", isMedia: true, media: "http://example.com/image5.jpg", text: "", sender: "user1", date: new Date("2024-01-01T09:55:00") },
            { message_id: "msg13", isMedia: false, text: "Genial, gracias.", sender: "user33", date: new Date("2024-01-01T10:00:00") },
            { message_id: "msg14", isMedia: false, text: "¿Alguien quiere palomitas?", sender: "user1", date: new Date("2024-01-01T10:05:00") },
            { message_id: "msg15", isMedia: true, media: "http://example.com/image6.jpg", text: "", sender: "user2", date: new Date("2024-01-01T10:10:00") },
            { message_id: "msg16", isMedia: false, text: "Yo quiero de caramelo.", sender: "user33", date: new Date("2024-01-01T10:15:00") },
            { message_id: "msg17", isMedia: true, media: "http://example.com/image7.jpg", text: "", sender: "user1", date: new Date("2024-01-01T10:20:00") },
            { message_id: "msg18", isMedia: false, text: "Yo paso de palomitas esta vez.", sender: "user2", date: new Date("2024-01-01T10:25:00") },
            { message_id: "msg1", isMedia: false, text: "Hola, ¿cómo estás?", sender: "user1", date: new Date("2024-01-01T09:00:00") },
            { message_id: "msg2", isMedia: true, media: "http://example.com/image1.jpg", text: "", sender: "user2", date: new Date("2024-01-01T09:05:00") },
            { message_id: "msg3", isMedia: false, text: "Estoy bien, gracias por preguntar.", sender: "user1", date: new Date("2024-01-01T09:10:00") },
            { message_id: "msg4", isMedia: true, media: "http://example.com/image2.jpg", text: "", sender: "user33", date: new Date("2024-01-01T09:15:00") },
            { message_id: "msg5", isMedia: false, text: "¿Vamos al cine esta noche?", sender: "user2", date: new Date("2024-01-01T09:20:00") },
            { message_id: "msg6", isMedia: false, text: "Claro, ¿a qué hora?", sender: "user1", date: new Date("2024-01-01T09:25:00") },
            { message_id: "msg7", isMedia: true, media: "http://example.com/image3.jpg", text: "", sender: "user33", date: new Date("2024-01-01T09:30:00") },
            { message_id: "msg8", isMedia: false, text: "A las 8 estaría perfecto.", sender: "user2", date: new Date("2024-01-01T09:35:00") },
            { message_id: "msg9", isMedia: false, text: "Allí nos vemos.", sender: "user1", date: new Date("2024-01-01T09:40:00") },
            { message_id: "msg10", isMedia: true, media: "http://example.com/image4.jpg", text: "", sender: "user33", date: new Date("2024-01-01T09:45:00") },
            { message_id: "msg11", isMedia: false, text: "Perfecto, he reservado las entradas.", sender: "user2", date: new Date("2024-01-01T09:50:00") },
            { message_id: "msg12", isMedia: true, media: "http://example.com/image5.jpg", text: "", sender: "user1", date: new Date("2024-01-01T09:55:00") },
            { message_id: "msg13", isMedia: false, text: "Genial, gracias.", sender: "user33", date: new Date("2024-01-01T10:00:00") },
            { message_id: "msg14", isMedia: false, text: "¿Alguien quiere palomitas?", sender: "user1", date: new Date("2024-01-01T10:05:00") },
            { message_id: "msg15", isMedia: true, media: "http://example.com/image6.jpg", text: "", sender: "user2", date: new Date("2024-01-01T10:10:00") },
            { message_id: "msg16", isMedia: false, text: "Yo quiero de caramelo.", sender: "user33", date: new Date("2024-01-01T10:15:00") },
            { message_id: "msg17", isMedia: true, media: "http://example.com/image7.jpg", text: "", sender: "user1", date: new Date("2024-01-01T10:20:00") },
            { message_id: "msg18", isMedia: false, text: "Yo paso de palomitas esta vez.", sender: "user2", date: new Date("2024-01-01T10:25:00") },
            { message_id: "msg1", isMedia: false, text: "Hola, ¿cómo estás?", sender: "user1", date: new Date("2024-01-01T09:00:00") },
            { message_id: "msg2", isMedia: true, media: "http://example.com/image1.jpg", text: "", sender: "user2", date: new Date("2024-01-01T09:05:00") },
            { message_id: "msg3", isMedia: false, text: "Estoy bien, gracias por preguntar.", sender: "user1", date: new Date("2024-01-01T09:10:00") },
            { message_id: "msg4", isMedia: true, media: "http://example.com/image2.jpg", text: "", sender: "user33", date: new Date("2024-01-01T09:15:00") },
            { message_id: "msg5", isMedia: false, text: "¿Vamos al cine esta noche?", sender: "user2", date: new Date("2024-01-01T09:20:00") },
            { message_id: "msg6", isMedia: false, text: "Claro, ¿a qué hora?", sender: "user1", date: new Date("2024-01-01T09:25:00") },
            { message_id: "msg7", isMedia: true, media: "http://example.com/image3.jpg", text: "", sender: "user33", date: new Date("2024-01-01T09:30:00") },
            { message_id: "msg8", isMedia: false, text: "A las 8 estaría perfecto.", sender: "user2", date: new Date("2024-01-01T09:35:00") },
            { message_id: "msg9", isMedia: false, text: "Allí nos vemos.", sender: "user1", date: new Date("2024-01-01T09:40:00") },
            { message_id: "msg10", isMedia: true, media: "http://example.com/image4.jpg", text: "", sender: "user33", date: new Date("2024-01-01T09:45:00") },
            { message_id: "msg11", isMedia: false, text: "Perfecto, he reservado las entradas.", sender: "user2", date: new Date("2024-01-01T09:50:00") },
            { message_id: "msg12", isMedia: true, media: "http://example.com/image5.jpg", text: "", sender: "user1", date: new Date("2024-01-01T09:55:00") },
            { message_id: "msg13", isMedia: false, text: "Genial, gracias.", sender: "user33", date: new Date("2024-01-01T10:00:00") },
            { message_id: "msg14", isMedia: false, text: "¿Alguien quiere palomitas?", sender: "user1", date: new Date("2024-01-01T10:05:00") },
            { message_id: "msg15", isMedia: true, media: "http://example.com/image6.jpg", text: "", sender: "user2", date: new Date("2024-01-01T10:10:00") },
            { message_id: "msg16", isMedia: false, text: "Yo quiero de caramelo.", sender: "user33", date: new Date("2024-01-01T10:15:00") },
            { message_id: "msg17", isMedia: true, media: "http://example.com/image7.jpg", text: "", sender: "user1", date: new Date("2024-01-01T10:20:00") },
            { message_id: "msg18", isMedia: false, text: "Yo paso de palomitas esta vez.", sender: "user2", date: new Date("2024-01-01T10:25:00") },
            { message_id: "msg1", isMedia: false, text: "Hola, ¿cómo estás?", sender: "user1", date: new Date("2024-01-01T09:00:00") },
            { message_id: "msg2", isMedia: true, media: "http://example.com/image1.jpg", text: "", sender: "user2", date: new Date("2024-01-01T09:05:00") },
            { message_id: "msg3", isMedia: false, text: "Estoy bien, gracias por preguntar.", sender: "user1", date: new Date("2024-01-01T09:10:00") },
            { message_id: "msg4", isMedia: true, media: "http://example.com/image2.jpg", text: "", sender: "user33", date: new Date("2024-01-01T09:15:00") },
            { message_id: "msg5", isMedia: false, text: "¿Vamos al cine esta noche?", sender: "user2", date: new Date("2024-01-01T09:20:00") },
            { message_id: "msg6", isMedia: false, text: "Claro, ¿a qué hora?", sender: "user1", date: new Date("2024-01-01T09:25:00") },
            { message_id: "msg7", isMedia: true, media: "http://example.com/image3.jpg", text: "", sender: "user33", date: new Date("2024-01-01T09:30:00") },
            { message_id: "msg8", isMedia: false, text: "A las 8 estaría perfecto.", sender: "user2", date: new Date("2024-01-01T09:35:00") },
            { message_id: "msg9", isMedia: false, text: "Allí nos vemos.", sender: "user1", date: new Date("2024-01-01T09:40:00") },
            { message_id: "msg10", isMedia: true, media: "http://example.com/image4.jpg", text: "", sender: "user33", date: new Date("2024-01-01T09:45:00") },
            { message_id: "msg11", isMedia: false, text: "Perfecto, he reservado las entradas.", sender: "user2", date: new Date("2024-01-01T09:50:00") },
            { message_id: "msg12", isMedia: true, media: "http://example.com/image5.jpg", text: "", sender: "user1", date: new Date("2024-01-01T09:55:00") },
            { message_id: "msg13", isMedia: false, text: "Genial, gracias.", sender: "user33", date: new Date("2024-01-01T10:00:00") },
            { message_id: "msg14", isMedia: false, text: "¿Alguien quiere palomitas?", sender: "user1", date: new Date("2024-01-01T10:05:00") },
            { message_id: "msg15", isMedia: true, media: "http://example.com/image6.jpg", text: "", sender: "user2", date: new Date("2024-01-01T10:10:00") },
            { message_id: "msg16", isMedia: false, text: "Yo quiero de caramelo.", sender: "user33", date: new Date("2024-01-01T10:15:00") },
            { message_id: "msg17", isMedia: true, media: "http://example.com/image7.jpg", text: "", sender: "user1", date: new Date("2024-01-01T10:20:00") },
            { message_id: "msg18", isMedia: false, text: "Yo paso de palomitas esta vez.", sender: "user2", date: new Date("2024-01-01T10:25:00") },  { message_id: "msg1", isMedia: false, text: "Hola, ¿cómo estás?", sender: "user1", date: new Date("2024-01-01T09:00:00") },
            { message_id: "msg2", isMedia: true, media: "http://example.com/image1.jpg", text: "", sender: "user2", date: new Date("2024-01-01T09:05:00") },
            { message_id: "msg3", isMedia: false, text: "Estoy bien, gracias por preguntar.", sender: "user1", date: new Date("2024-01-01T09:10:00") },
            { message_id: "msg4", isMedia: true, media: "http://example.com/image2.jpg", text: "", sender: "user33", date: new Date("2024-01-01T09:15:00") },
            { message_id: "msg5", isMedia: false, text: "¿Vamos al cine esta noche?", sender: "user2", date: new Date("2024-01-01T09:20:00") },
            { message_id: "msg6", isMedia: false, text: "Claro, ¿a qué hora?", sender: "user1", date: new Date("2024-01-01T09:25:00") },
            { message_id: "msg7", isMedia: true, media: "http://example.com/image3.jpg", text: "", sender: "user33", date: new Date("2024-01-01T09:30:00") },
            { message_id: "msg8", isMedia: false, text: "A las 8 estaría perfecto.", sender: "user2", date: new Date("2024-01-01T09:35:00") },
            { message_id: "msg9", isMedia: false, text: "Allí nos vemos.", sender: "user1", date: new Date("2024-01-01T09:40:00") },
            { message_id: "msg10", isMedia: true, media: "http://example.com/image4.jpg", text: "", sender: "user33", date: new Date("2024-01-01T09:45:00") },
            { message_id: "msg11", isMedia: false, text: "Perfecto, he reservado las entradas.", sender: "user2", date: new Date("2024-01-01T09:50:00") },
            { message_id: "msg12", isMedia: true, media: "http://example.com/image5.jpg", text: "", sender: "user1", date: new Date("2024-01-01T09:55:00") },
            { message_id: "msg13", isMedia: false, text: "Genial, gracias.", sender: "user33", date: new Date("2024-01-01T10:00:00") },
            { message_id: "msg14", isMedia: false, text: "¿Alguien quiere palomitas?", sender: "user1", date: new Date("2024-01-01T10:05:00") },
            { message_id: "msg15", isMedia: true, media: "http://example.com/image6.jpg", text: "", sender: "user2", date: new Date("2024-01-01T10:10:00") },
            { message_id: "msg16", isMedia: false, text: "Yo quiero de caramelo.", sender: "user33", date: new Date("2024-01-01T10:15:00") },
            { message_id: "msg17", isMedia: true, media: "http://example.com/image7.jpg", text: "", sender: "user1", date: new Date("2024-01-01T10:20:00") },
            { message_id: "msg18", isMedia: false, text: "Yo paso de palomitas esta vez.", sender: "user2", date: new Date("2024-01-01T10:25:00") },
            { message_id: "msg1", isMedia: false, text: "Hola, ¿cómo estás?", sender: "user1", date: new Date("2024-01-01T09:00:00") },
            { message_id: "msg2", isMedia: true, media: "http://example.com/image1.jpg", text: "", sender: "user2", date: new Date("2024-01-01T09:05:00") },
            { message_id: "msg3", isMedia: false, text: "Estoy bien, gracias por preguntar.", sender: "user1", date: new Date("2024-01-01T09:10:00") },
            { message_id: "msg4", isMedia: true, media: "http://example.com/image2.jpg", text: "", sender: "user33", date: new Date("2024-01-01T09:15:00") },
            { message_id: "msg5", isMedia: false, text: "¿Vamos al cine esta noche?", sender: "user2", date: new Date("2024-01-01T09:20:00") },
            { message_id: "msg6", isMedia: false, text: "Claro, ¿a qué hora?", sender: "user1", date: new Date("2024-01-01T09:25:00") },
            { message_id: "msg7", isMedia: true, media: "http://example.com/image3.jpg", text: "", sender: "user33", date: new Date("2024-01-01T09:30:00") },
            { message_id: "msg8", isMedia: false, text: "A las 8 estaría perfecto.", sender: "user2", date: new Date("2024-01-01T09:35:00") },
            { message_id: "msg9", isMedia: false, text: "Allí nos vemos.", sender: "user1", date: new Date("2024-01-01T09:40:00") },
            { message_id: "msg10", isMedia: true, media: "http://example.com/image4.jpg", text: "", sender: "user33", date: new Date("2024-01-01T09:45:00") },
            { message_id: "msg11", isMedia: false, text: "Perfecto, he reservado las entradas.", sender: "user2", date: new Date("2024-01-01T09:50:00") },
            { message_id: "msg12", isMedia: true, media: "http://example.com/image5.jpg", text: "", sender: "user1", date: new Date("2024-01-01T09:55:00") },
            { message_id: "msg13", isMedia: false, text: "Genial, gracias.", sender: "user33", date: new Date("2024-01-01T10:00:00") },
            { message_id: "msg14", isMedia: false, text: "¿Alguien quiere palomitas?", sender: "user1", date: new Date("2024-01-01T10:05:00") },
            { message_id: "msg15", isMedia: true, media: "http://example.com/image6.jpg", text: "", sender: "user2", date: new Date("2024-01-01T10:10:00") },
            { message_id: "msg16", isMedia: false, text: "Yo quiero de caramelo.", sender: "user33", date: new Date("2024-01-01T10:15:00") },
            { message_id: "msg17", isMedia: true, media: "http://example.com/image7.jpg", text: "", sender: "user1", date: new Date("2024-01-01T10:20:00") },
            { message_id: "msg18", isMedia: false, text: "Yo paso de palomitas esta vez.", sender: "user2", date: new Date("2024-01-01T10:25:00") }

          ]
        },
        {
          "id_chat": "chat2",
          "chatName": "Direct with user33",
          "isDM": true,
          "participants": ["user1", "user33"],
          "unreadMessages": 1,
          "lastMessage": {
            "message_id": "msg6",
            "isMedia": true,
            "media": "http://example.com/image.jpg",
            "text": "Here's the design mockup.",
            "sender": "user33",
            "date": new Date("2024-05-10T09:00:00Z")
          },
          "messages": [
            {
              "message_id": "msg4",
              "isMedia": false,
              "text": "Could you send over the latest UI designs?",
              "sender": "user1",
              "date": new Date("2024-05-10T08:50:00Z")
            },
            {
              "message_id": "msg5",
              "isMedia": true,
              "media": "http://example.com/sketch.png",
              "text": "Just sketching some ideas.",
              "sender": "user1",
              "date": new Date("2024-05-10T08:55:00Z")
            },
            {
              "message_id": "msg6",
              "isMedia": true,
              "media": "http://example.com/image.jpg",
              "text": "Here's the design mockup.",
              "sender": "user33",
              "date": new Date("2024-05-10T09:00:00Z")
            }
          ]
        },
        {
          "id_chat": "chat1",
          "chatName": "Project Alpha",
          "photo": 'assets/pictures/default_pfp.png',
          "isDM": false,
          "participants": ["user1", "user2", "user33"],
          "unreadMessages": 0,
          "lastMessage": {
            "message_id": "msg3",
            "isMedia": false,
            "text": "Reminder: Meeting at 3 PM today.",
            "sender": "user1",
            "date": new Date("2024-05-10T08:45:00Z")
          },
          "messages": [
            {
              "message_id": "msg1",
              "isMedia": false,
              "text": "Hi team, are we ready for today's sprint review?",
              "sender": "user1",
              "date": new Date("2024-05-10T07:30:00Z")
            },
            {
              "message_id": "msg2",
              "isMedia": false,
              "text": "I've updated the Trello board with the latest tasks.",
              "sender": "user2",
              "date": new Date("2024-05-10T07:45:00Z")
            },
            {
              "message_id": "msg3",
              "isMedia": false,
              "text": "Reminder: Meeting at 3 PM today.",
              "sender": "user1",
              "date": new Date("2024-05-10T08:45:00Z")
            }
          ]
        },
        {
          "id_chat": "chat2",
          "chatName": "Direct with user33",
          "isDM": true,
          "participants": ["user1", "user33"],
          "unreadMessages": 1,
          "lastMessage": {
            "message_id": "msg6",
            "isMedia": true,
            "media": "http://example.com/image.jpg",
            "text": "Here's the design mockup.",
            "sender": "user33",
            "date": new Date("2024-05-10T09:00:00Z")
          },
          "messages": [
            {
              "message_id": "msg4",
              "isMedia": false,
              "text": "Could you send over the latest UI designs?",
              "sender": "user1",
              "date": new Date("2024-05-10T08:50:00Z")
            },
            {
              "message_id": "msg5",
              "isMedia": true,
              "media": "http://example.com/sketch.png",
              "text": "Just sketching some ideas.",
              "sender": "user1",
              "date": new Date("2024-05-10T08:55:00Z")
            },
            {
              "message_id": "msg6",
              "isMedia": true,
              "media": "http://example.com/image.jpg",
              "text": "Here's the design mockup.",
              "sender": "user33",
              "date": new Date("2024-05-10T09:00:00Z")
            }
          ]
        },
        {
          "id_chat": "chat1",
          "chatName": "Project Beta",
          "photo": 'assets/pictures/default_pfp.png',
          "isDM": false,
          "participants": ["user1", "user2", "user33"],
          "unreadMessages": 0,
          "lastMessage": {
            "message_id": "msg3",
            "isMedia": false,
            "text": "Reminder: Meeting at 3 PM today.",
            "sender": "user1",
            "date": new Date("2024-05-09T08:45:00Z")
          },
          "messages": [
            {
              "message_id": "msg1",
              "isMedia": false,
              "text": "Hi team, are we ready for today's sprint review?",
              "sender": "user1",
              "date": new Date("2024-05-05T07:30:00Z")
            },
            {
              "message_id": "msg2",
              "isMedia": false,
              "text": "I've updated the Trello board with the latest tasks.",
              "sender": "user2",
              "date": new Date("2024-05-10T07:45:00Z")
            },
            {
              "message_id": "msg3",
              "isMedia": false,
              "text": "Reminder: Meeting at 3 PM today.",
              "sender": "user1",
              "date": new Date("2024-05-09T08:45:00Z")
            }
          ]
        },
        {
          "id_chat": "chat2",
          "chatName": "Direct with user33",
          "isDM": true,
          "participants": ["user1", "user33"],
          "unreadMessages": 0,
          "lastMessage": {
            "message_id": "msg6",
            "isMedia": true,
            "media": "http://example.com/image.jpg",
            "text": "Here's the design mockup.",
            "sender": "user33",
            "date": new Date("2024-05-10T09:00:00Z")
          },
          "messages": [
            {
              "message_id": "msg4",
              "isMedia": false,
              "text": "Could you send over the latest UI designs?",
              "sender": "user1",
              "date": new Date("2024-05-10T08:50:00Z")
            },
            {
              "message_id": "msg5",
              "isMedia": true,
              "media": "http://example.com/sketch.png",
              "text": "Just sketching some ideas.",
              "sender": "user1",
              "date": new Date("2024-05-10T08:55:00Z")
            },
            {
              "message_id": "msg6",
              "isMedia": true,
              "media": "http://example.com/image.jpg",
              "text": "Here's the design mockup.",
              "sender": "user33",
              "date": new Date("2024-05-10T09:00:00Z")
            }
          ]
        },{
          "id_chat": "chat1",
          "chatName": "Project Alpha",
          "photo": 'assets/pictures/default_pfp.png',
          "isDM": false,
          "participants": ["user1", "user2", "user33"],
          "unreadMessages": 2,
          "lastMessage": {
            "message_id": "msg3",
            "isMedia": false,
            "text": "Reminder: Meeting at 3 PM today.",
            "sender": "user1",
            "date": new Date("2024-05-10T08:45:00Z")
          },
          "messages": [
            {
              "message_id": "msg1",
              "isMedia": false,
              "text": "Hi team, are we ready for today's sprint review?",
              "sender": "user1",
              "date": new Date("2024-05-10T07:30:00Z")
            },
            {
              "message_id": "msg2",
              "isMedia": false,
              "text": "I've updated the Trello board with the latest tasks.",
              "sender": "user2",
              "date": new Date("2024-05-10T07:45:00Z")
            },
            {
              "message_id": "msg3",
              "isMedia": false,
              "text": "Reminder: Meeting at 3 PM today.",
              "sender": "user1",
              "date": new Date("2024-05-10T08:45:00Z")
            }
          ]
        },
        {
          "id_chat": "chat2",
          "chatName": "Direct with user33",
          "isDM": true,
          "participants": ["user1", "user33"],
          "unreadMessages": 1,
          "lastMessage": {
            "message_id": "msg6",
            "isMedia": true,
            "media": "http://example.com/image.jpg",
            "text": "Here's the design mockup.",
            "sender": "user33",
            "date": new Date("2024-05-10T09:00:00Z")
          },
          "messages": [
            {
              "message_id": "msg4",
              "isMedia": false,
              "text": "Could you send over the latest UI designs?",
              "sender": "user1",
              "date": new Date("2024-05-10T08:50:00Z")
            },
            {
              "message_id": "msg5",
              "isMedia": true,
              "media": "http://example.com/sketch.png",
              "text": "Just sketching some ideas.",
              "sender": "user1",
              "date": new Date("2024-05-10T08:55:00Z")
            },
            {
              "message_id": "msg6",
              "isMedia": true,
              "media": "http://example.com/image.jpg",
              "text": "Here's the design mockup.",
              "sender": "user33",
              "date": new Date("2024-05-10T09:00:00Z")
            }
          ]
        },
        {
          "id_chat": "chat1",
          "chatName": "Project Alpha",
          "photo": 'assets/pictures/default_pfp.png',
          "isDM": false,
          "participants": ["user1", "user2", "user33"],
          "unreadMessages": 2,
          "lastMessage": {
            "message_id": "msg3",
            "isMedia": false,
            "text": "Reminder: Meeting at 3 PM today.",
            "sender": "user1",
            "date": new Date("2024-05-10T08:45:00Z")
          },
          "messages": [
            {
              "message_id": "msg1",
              "isMedia": false,
              "text": "Hi team, are we ready for today's sprint review?",
              "sender": "user1",
              "date": new Date("2024-05-10T07:30:00Z")
            },
            {
              "message_id": "msg2",
              "isMedia": false,
              "text": "I've updated the Trello board with the latest tasks.",
              "sender": "user2",
              "date": new Date("2024-05-10T07:45:00Z")
            },
            {
              "message_id": "msg3",
              "isMedia": false,
              "text": "Reminder: Meeting at 3 PM today.",
              "sender": "user1",
              "date": new Date("2024-05-10T08:45:00Z")
            }
          ]
        },
        {
          "id_chat": "chat2",
          "chatName": "Direct with user33",
          "isDM": true,
          "participants": ["user1", "user33"],
          "unreadMessages": 1,
          "lastMessage": {
            "message_id": "msg6",
            "isMedia": true,
            "media": "http://example.com/image.jpg",
            "text": "Here's the design mockup.",
            "sender": "user33",
            "date": new Date("2024-05-10T09:00:00Z")
          },
          "messages": [
            {
              "message_id": "msg4",
              "isMedia": false,
              "text": "Could you send over the latest UI designs?",
              "sender": "user1",
              "date": new Date("2024-05-10T08:50:00Z")
            },
            {
              "message_id": "msg5",
              "isMedia": true,
              "media": "http://example.com/sketch.png",
              "text": "Just sketching some ideas.",
              "sender": "user1",
              "date": new Date("2024-05-10T08:55:00Z")
            },
            {
              "message_id": "msg6",
              "isMedia": true,
              "media": "http://example.com/image.jpg",
              "text": "Here's the design mockup.",
              "sender": "user33",
              "date": new Date("2024-05-10T09:00:00Z")
            }
          ]
        },
        {
          "id_chat": "chat1",
          "chatName": "Project Alpha",
          "photo": 'assets/pictures/default_pfp.png',
          "isDM": false,
          "participants": ["user1", "user2", "user33"],
          "unreadMessages": 2,
          "lastMessage": {
            "message_id": "msg3",
            "isMedia": false,
            "text": "Reminder: Meeting at 3 PM today.",
            "sender": "user1",
            "date": new Date("2024-05-10T08:45:00Z")
          },
          "messages": [
            {
              "message_id": "msg1",
              "isMedia": false,
              "text": "Hi team, are we ready for today's sprint review?",
              "sender": "user1",
              "date": new Date("2024-05-10T07:30:00Z")
            },
            {
              "message_id": "msg2",
              "isMedia": false,
              "text": "I've updated the Trello board with the latest tasks.",
              "sender": "user2",
              "date": new Date("2024-05-10T07:45:00Z")
            },
            {
              "message_id": "msg3",
              "isMedia": false,
              "text": "Reminder: Meeting at 3 PM today.",
              "sender": "user1",
              "date": new Date("2024-05-10T08:45:00Z")
            }
          ]
        },
        {
          "id_chat": "chat2",
          "chatName": "Direct with user33",
          "isDM": true,
          "participants": ["user1", "user33"],
          "unreadMessages": 1,
          "lastMessage": {
            "message_id": "msg6",
            "isMedia": true,
            "media": "http://example.com/image.jpg",
            "text": "Here's the design mockup.",
            "sender": "user33",
            "date": new Date("2024-05-10T09:00:00Z")
          },
          "messages": [
            {
              "message_id": "msg4",
              "isMedia": false,
              "text": "Could you send over the latest UI designs?",
              "sender": "user1",
              "date": new Date("2024-05-10T08:50:00Z")
            },
            {
              "message_id": "msg5",
              "isMedia": true,
              "media": "http://example.com/sketch.png",
              "text": "Just sketching some ideas.",
              "sender": "user1",
              "date": new Date("2024-05-10T08:55:00Z")
            },
            {
              "message_id": "msg6",
              "isMedia": true,
              "media": "http://example.com/image.jpg",
              "text": "Here's the design mockup.",
              "sender": "user33",
              "date": new Date("2024-05-10T09:00:00Z")
            }
          ]
        },
        {
          "id_chat": "chat1",
          "chatName": "Project Alpha",
          "photo": 'assets/pictures/default_pfp.png',
          "isDM": false,
          "participants": ["user1", "user2", "user33"],
          "unreadMessages": 2,
          "lastMessage": {
            "message_id": "msg3",
            "isMedia": false,
            "text": "Reminder: Meeting at 3 PM today.",
            "sender": "user1",
            "date": new Date("2024-05-10T08:45:00Z")
          },
          "messages": [
            {
              "message_id": "msg1",
              "isMedia": false,
              "text": "Hi team, are we ready for today's sprint review?",
              "sender": "user1",
              "date": new Date("2024-05-10T07:30:00Z")
            },
            {
              "message_id": "msg2",
              "isMedia": false,
              "text": "I've updated the Trello board with the latest tasks.",
              "sender": "user2",
              "date": new Date("2024-05-10T07:45:00Z")
            },
            {
              "message_id": "msg3",
              "isMedia": false,
              "text": "Reminder: Meeting at 3 PM today.",
              "sender": "user1",
              "date": new Date("2024-05-10T08:45:00Z")
            }
          ]
        },
        {
          "id_chat": "chat2",
          "chatName": "Direct with user33",
          "isDM": true,
          "participants": ["user1", "user33"],
          "unreadMessages": 1,
          "lastMessage": {
            "message_id": "msg6",
            "isMedia": true,
            "media": "http://example.com/image.jpg",
            "text": "Here's the design mockup.",
            "sender": "user33",
            "date": new Date("2024-05-10T09:00:00Z")
          },
          "messages": [
            {
              "message_id": "msg4",
              "isMedia": false,
              "text": "Could you send over the latest UI designs?",
              "sender": "user1",
              "date": new Date("2024-05-10T08:50:00Z")
            },
            {
              "message_id": "msg5",
              "isMedia": true,
              "media": "http://example.com/sketch.png",
              "text": "Just sketching some ideas.",
              "sender": "user1",
              "date": new Date("2024-05-10T08:55:00Z")
            },
            {
              "message_id": "msg6",
              "isMedia": true,
              "media": "http://example.com/image.jpg",
              "text": "Here's the design mockup.",
              "sender": "user33",
              "date": new Date("2024-05-10T09:00:00Z")
            }
          ]
        }

      ],
      "friends": ["user2", "user33"],
      "pendingRequests": []
    },
    {
      "username": "user2",
      "description": "User 2's description here",
      "status": false,
      "profilePicture": "http://example.com/user2.jpg",
      "chats": [
        {
          "id_chat": "chat1",
          "chatName": "Project Alpha",
          "photo": 'assets/pictures/default_pfp.png',
          "isDM": false,
          "participants": ["user1", "user2", "user33"],
          "unreadMessages": 0,
          "lastMessage": {
            "message_id": "msg3",
            "isMedia": false,
            "text": "Reminder: Meeting at 3 PM today.",
            "sender": "user1",
            "date": new Date("2024-05-10T08:45:00Z")
          },
          "messages": [
            {
              "message_id": "msg1",
              "isMedia": false,
              "text": "Hi team, are we ready for today's sprint review?",
              "sender": "user1",
              "date":  new Date("2024-05-10T07:30:00Z")
            },
            {
              "message_id": "msg2",
              "isMedia": false,
              "text": "I've updated the Trello board with the latest tasks.",
              "sender": "user2",
              "date": new Date("2024-05-10T07:45:00Z")
            }
          ]
        }
      ],
      "friends": ["user1", "user33"],
      "pendingRequests": []
    },
    {
      "username": "user33",
      "description": "User 3's description here",
      "status": true,
      "profilePicture": "http://example.com/user33.jpg",
      "chats": [
        {
          "id_chat": "chat2",
          "chatName": "Direct with user33",
          "isDM": true,
          "participants": ["user1", "user33"],
          "unreadMessages": 1,
          "lastMessage": {
            "message_id": "msg6",
            "isMedia": true,
            "media": "http://example.com/image.jpg",
            "text": "Here's the design mockup.",
            "sender": "user33",
            "date": new Date("2024-05-10T09:00:00Z")
          },
          "messages": [
            {
              "message_id": "msg4",
              "isMedia": false,
              "text": "Could you send over the latest UI designs?",
              "sender": "user1",
              "date": new Date("2024-05-10T08:50:00Z")
            },
            {
              "message_id": "msg5",
              "isMedia": true,
              "media": "http://example.com/sketch.png",
              "text": "Just sketching some ideas.",
              "sender": "user1",
              "date":  new Date("2024-05-10T08:55:00Z")
            },
            {
              "message_id": "msg6",
              "isMedia": true,
              "media": "http://example.com/image.jpg",
              "text": "Here's the design mockup.",
              "sender": "user33",
              "date": new Date("2024-05-10T09:00:00Z")
            }
          ]
        }
      ],
      "friends": ["user1", "user2"],
      "pendingRequests": []
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
