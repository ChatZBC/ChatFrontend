import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  constructor(private myService: DataService, private router: Router) {}
  username: string = "";
  showLoginPopup = true;
  invalidUsername = false;

  isValidUsername(): boolean {
    return this.username.trim().length > 0;
  }
  
  setUsername(){
    if (this.isValidUsername()) {
      this.invalidUsername = false;
      sessionStorage.setItem('Username',this.username);
      this.router.navigate(['/Chat'])
    }
    else {
      this.invalidUsername = true;
      console.error('Invalid Username')
    }
  }
}
