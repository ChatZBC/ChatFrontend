import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  constructor(private myService: DataService) {}
  username: string = "";
  showLoginPopup = true;
  
  setUsername(){
    this.myService.username = this.username;
  }
}
