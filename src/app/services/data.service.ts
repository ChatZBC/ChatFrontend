import { Injectable } from '@angular/core';

import * as SignalR from '@microsoft/signalr'


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private hubConnection: SignalR.HubConnection;
  username = 'Test';

  constructor() {
    this.hubConnection = new SignalR.HubConnectionBuilder()
    .withUrl('https://localhost:7206/chathub', { withCredentials: false, skipNegotiation: true, transport: SignalR.HttpTransportType.WebSockets })
    .build();
  }

  public data: any;

  public startConnection = () => {
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection' + err))
  }

  public MessageReceived = () => {
    this.hubConnection.on('MessageReceived', (message) => {
      console.log(message)
      this.data = message;
    })
  }
  public SendMessage = () => {

  }
}
