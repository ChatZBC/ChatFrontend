import { Injectable } from '@angular/core';

import * as SignalR from '@microsoft/signalr'


@Injectable({
  providedIn: 'root'
})
export class DataService {
  public data: any;
  private hubConnection : signalR.HubConnection
    public startConnection = () => {
      this.hubConnection = new SignalR.HubConnectionBuilder()
                                  .withUrl('https://localhost:5001')
                                  .build();
      this.hubConnection
        .start()
        .then(() => console.log('Connection started'))
        .catch(err => console.log('Error while starting connection' + err))
    }

    public sendMessage = () => {
      this.hubConnection.on('Message',(data) => {
        this.data = data;
        console.log(data)
      })
    }
}
