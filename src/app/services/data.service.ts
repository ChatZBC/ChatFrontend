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
  username = 'TestUser';

  constructor(
    private messagesService: MessagesService,
    //private cdr: ChangeDetectorRef
  ) {
    this.hubUrl = 'https://localhost:7206/chathub?username=' + this.username;
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
        this.messagesService.addMessage(user + '\n' + message);
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
  /*
  public startConnection = (url: string) => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(url + '?username=' + this.username)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  // Send message to SignalR hub
  public SendMessage(message: string): void {
    this.hubConnection
      .send('SendMessage', this.username, message)
      .then(() => console.log('Message sent successfully'))
      .catch((err) => console.error('Error while sending message: ', err));
  }

  // constructor() {
  //   this.hubConnection = new SignalR.HubConnectionBuilder()
  //     .withUrl('https://localhost:7206/chathub?username=' + this.username, { withCredentials: false, skipNegotiation: true, transport: SignalR.HttpTransportType.WebSockets })
  //     .build();

  //   this.hubConnection.on('MessageReceived', (message) => {
  //     this.MessageReceived(message);
  //   });
  //   this.hubConnection.on('error', (error) => {
  //     this.ErrorReceived(error);
  //   });
  // }

  // public startConnection = () => {
  //   this.hubConnection
  //     .start()
  //     .then(() => {
  //       console.log('SignalR connection started');
  //       // Subscribe to data received event
  //       this.hubConnection.on('MessageReceived', (data) => {
  //         // Emit the received data
  //         console.log(data);
  //       });
  //     })
  //     .catch(err => console.log('Error while starting connection' + err))
  // }

  public MessageReceived(message: string) {
    console.log(message);
  }
  public ErrorReceived(error: string) {
    console.error(error);
  }

  public RequestUserList(): any {
    this.hubConnection.invoke('RequestUserList', (UserList: any) => {
      console.log(UserList);
      return UserList;
    });
  }*/
}
