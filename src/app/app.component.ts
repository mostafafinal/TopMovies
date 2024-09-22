import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SignupPageComponent } from "./components/signup-page/signup-page.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, SignupPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'movies';
  showHeader: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if (event.url) {
        // Add the paths where the header should not be displayed
        const hideHeaderPaths = ['/login', '/signup'];
        console.log(event.url);
        this.showHeader = !hideHeaderPaths.includes(event.url);
      }
    });
  }
}
