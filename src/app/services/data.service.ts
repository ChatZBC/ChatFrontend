import { Injectable } from '@angular/core';

import * as signalR from '@microsoft/signalr'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  hubUrl: string;
  connection: any;
  private hubConnection!: signalR.HubConnection
  username = 'TestUser'
  
  constructor(){
    this.hubUrl = 'https://localhost:7206/chathub?username='+this.username;
  }

  public async initiateSignalrConnection(): Promise<void> {
    try {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(this.hubUrl)
        .build();

      await this.connection.start({ withCredentials: false });

      console.log(`SignalR connection success! connectionId: ${this.connection.connectionId}`);
    }
    catch (error) {
      console.log(`SignalR connection error: ${error}`);
    }
  }


  public startConnection = (url: string) => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(url+'?username='+this.username)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  // Send message to SignalR hub
  public SendMessage(message: string): void {
    this.hubConnection.send('SendMessage', this.username, message)
      .then(() => console.log('Message sent successfully'))
      .catch(err => console.error('Error while sending message: ', err));
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
    })
  }
}
