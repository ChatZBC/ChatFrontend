import { Component, OnInit } from '@angular/core';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  messages!: string[];
  messageText: string = '';
  userlist!: string[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.startConnection();

  }

  public SendMessage() {
    this.dataService.SendMessage(this.messageText)
  }


  public RequestUserlist(){
    this.userlist = this.dataService.RequestUserList();
  }
}


