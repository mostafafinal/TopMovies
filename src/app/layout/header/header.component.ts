import { Component, OnInit } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, RouterLink, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

import { UserService } from './../../services/user.service';
import { User } from '../../models/user';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgbCollapseModule, RouterModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isMenuCollapsed: boolean = true;
  loggedInSingal;
  loggedInLocal = sessionStorage.getItem('loggedIn');
  logOut: boolean = false;
  user: User = {} as User;

  constructor(
    private loginService: LoginService,
    private UserService: UserService,
    private router: Router
  ) {
    this.loggedInSingal = this.loginService.getData();
    if (this.loggedInLocal) {
      this.logOut = true;
    }
  }
  ngOnInit(): void {
    this.loadUser();
  }
  loadUser(): void {
    this.UserService.getUserData().subscribe((data: User) => {
      this.user = {
        ...data,
        image:
          data.image ||
          'https://th.bing.com/th/id/OIP.UY0H6jNLhhjKymJWT6HsPwHaHa?rs=1&pid=ImgDetMain',
      };
    });
  }

  userLogOut() {
    this.loginService.clearToken();
    this.loginService.setData(false);
    sessionStorage.removeItem('loggedIn');
    this.logOut = false;
    window.location.reload();
  }
  userPage() {
    this.router.navigate(['/userpage']);
  }
}
