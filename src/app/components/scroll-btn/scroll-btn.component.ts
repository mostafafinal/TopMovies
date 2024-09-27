import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-btn',
  standalone: true,
  imports: [],
  templateUrl: './scroll-btn.component.html',
  styleUrl: './scroll-btn.component.css',
})
export class ScrollBtnComponent {
  btnVisiblity = false;
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.btnVisiblity = window.scrollY > 500;
  }
  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
