import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  constructor(private myService: DataService) {}
  username: string = "";
  setUsername(){
    this.myService.username = this.username;
  }
}
