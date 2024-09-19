import { Component } from '@angular/core';
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
  loggedIn;

  constructor(private loginService: LoginService) {
    this.loggedIn = this.loginService.getData();
  }

  userLogOut() {
    this.loginService.clearToken();
    this.loginService.setData(false);
  }
}
