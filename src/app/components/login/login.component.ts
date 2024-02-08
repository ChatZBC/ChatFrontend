import { Component } from '@angular/core';
import { DefaultHttpClient, HttpTransportType, HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(){}
  hubconnection?:HubConnection;

  ngOnInit(){
    DefaultHttpClient
    sessionStorage.setItem("username", "William");
    this.hubconnection = new HubConnectionBuilder().withUrl('https://localhost:7206/chathub?username=William', {withCredentials: false, skipNegotiation:true,transport: HttpTransportType.WebSockets}).build();
    this.hubconnection.on("MessageReceived", (message)=>console.log(message));
    this.hubconnection.on("userlist", (message)=>console.log(message));
    this.hubconnection.start().then(()=>console.log("Connnection started")).catch((err)=>console.log(err));
  }
  
  GetUsers(){
    this.hubconnection!.invoke("RequestUserList","William").then((message)=>console.log(message)).catch((err)=>console.log(err));
  }
  
}
