import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  showHeader: boolean = true;
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if (event.url) {
        const hideHeaderPaths = ['/login', '/signup'];
        this.showHeader = !hideHeaderPaths.includes(event.url);
      }
    });
  }
}
