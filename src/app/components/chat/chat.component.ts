import { Component, OnInit } from '@angular/core';
import {
  DefaultHttpClient,
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
} from '@microsoft/signalr';
import { DataService } from '../../services/data.service';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit {
  messageText: string = '';
  messageHistory: string[] = [];
  hubconnection?: HubConnection;

  constructor(private dataService: DataService, private messagesService: MessagesService) {}

  ngOnInit(): void {
    console.log('Connected');
    this.dataService.JoinHub();
  }

  SendMessageTest() {
    if (this.messageText && this.messageText.trim() !== '') {
      // Check if messageText is not empty
      this.dataService.SendMessage(this.messageText);
      this.messageText = ''; // Clear messageText after sending the message
    } else {
      console.error('Error: no text');
    }
  }

  getMessages(): string[] {
    return this.messagesService.messages;
  }
}
