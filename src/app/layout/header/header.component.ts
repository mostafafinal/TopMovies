import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isMenuCollapsed: boolean = true;
  loggedInSingal;
  loggedInLocal = localStorage.getItem('loggedIn');
  logOut: boolean = false;

  constructor(private loginService: LoginService) {
    this.loggedInSingal = this.loginService.getData();
    if (this.loggedInLocal) {
      this.logOut = true;
    }
  }

  userLogOut() {
    this.loginService.clearToken();
    this.loginService.setData(false);
    localStorage.removeItem('loggedIn');
    this.logOut = false;
  }
}
