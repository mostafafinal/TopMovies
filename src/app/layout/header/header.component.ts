import { Component } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgbCollapseModule, RouterModule, RouterLink],
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
