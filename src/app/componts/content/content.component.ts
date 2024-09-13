import { Component } from '@angular/core';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {
  imges:string[]=['python.jpg','Network virtu concepts.jpg','intro of com Net fun.jpg','into to Network securtiy.jpg']
  imges1:string[]=['Network virtu concepts.jpg','intro of com Net fun.jpg','into to Network securtiy.jpg',]
  isTextVisible: boolean = false;

}
