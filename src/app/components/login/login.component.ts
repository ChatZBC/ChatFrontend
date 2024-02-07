import { Component } from '@angular/core';
import { HttpTransportType, HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(){}
  hubconnection?:HubConnection;

  ngOnInit(){
    this.hubconnection = new HubConnectionBuilder().withUrl('https://localhost:7206/chathub', {withCredentials: false, skipNegotiation:true,transport: HttpTransportType.WebSockets}).build();
    this.hubconnection.on("MessageReceived", (message)=>console.log(message));
    this.hubconnection.start().then(()=>console.log("Connnection started")).catch((err)=>console.log(err));
  }
  
}
