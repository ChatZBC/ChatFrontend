import { Injectable } from '@angular/core'; //, ChangeDetectorRef
import {
  DefaultHttpClient,
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
} from '@microsoft/signalr';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  hubUrl: string;
  hubconnection?: HubConnection;
  username: any;

  constructor(private messagesService: MessagesService) {
    // this.hubUrl = 'https://localhost:7206/chathub?username=' + this.SetUsername();
    // this.hubUrl = 'http://192.168.1.246:8080/chatHub?username=' + this.SetUsername();
    this.SetUsername();
    this.hubUrl = 'http://192.168.1.246:8080/chatHub?username=' + this.username;
  }

  public async SetUsername() {
    const userName = sessionStorage.getItem('Username')
    if (userName == null){
      this.username = 'Error';
    } else {
      this.username = userName;
    }
  }

  public async JoinHub(): Promise<void> {
    try {
      DefaultHttpClient;
      this.hubconnection = new HubConnectionBuilder()
        .withUrl(this.hubUrl, {
          withCredentials: false,
          skipNegotiation: true,
          transport: HttpTransportType.WebSockets,
        })
        .build();
      this.hubconnection.on('MessageReceived', (user, message) => {
        this.messagesService.addMessage(user + ': ' + message);
        // this.cdr.detectChanges(); // Trigger change detection
      });
      this.hubconnection.on('userlist', (message) => console.log(message));
      this.hubconnection
        .start()
        .then(() => console.log('Connnection started'))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(`SignalR connection error: ${error}`);
    }
  }

  public SendMessage(message: string) {
    this.hubconnection
      ?.invoke('SendMessage', this.username, message)
      .catch((err) => console.log(err)); //.then((message)=>console.log(message))
  }
}
