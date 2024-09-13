import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class HomePageComponent implements OnInit {
  movies = [
    {
      title: 'Kung Fu Games',
      id: 1,
      genre: 'أكشن',
      quality: '1080p',
      rating: 6.5,
      image:
        'https://i.pinimg.com/236x/18/d7/4e/18d74ef46e722828f75cca91b009f4a5.jpg',
      description: 'حكي هذا الفيلم عن رجل مشغول دائما في عميلم مترجم اون لاين',
      expandedMovieId: null,
      releaseYear: 2001,
    },
    {
      title: 'Kung Fu Games',
      id: 2,
      genre: 'أكشن',
      quality: '1080p',
      rating: 6.5,
      image:
        'https://i.pinimg.com/236x/00/3c/63/003c63ff84c1f1954f64273da184f8fe.jpg',
      description:
        'حكي هذا الفيلم عن رجل مشغول دائما في عمله. كان مشغولا لدرجة انه لا يوجد لديه وقت ليكال الضغط على هذا الجهاز, ',
      expandedMovieId: null,
      releaseYear: 2001,
    },
    {
      title: 'Kung Fu Games',
      id: 3,
      genre: 'أكشن',
      quality: '1080p',
      rating: 6.5,
      image:
        'https://i.pinimg.com/564x/04/da/49/04da4953c9301f9cd8e4556ad1f8a75a.jpg',
      description:
        'حكي هذا الفيلم عن رجل مشغول دائما في عمله. كان مشغولا لدرجة انه لا ين للوقتلم مترجم اون لاين',
      expandedMovieId: null,
      releaseYear: 2001,
    },
    {
      title: 'Kung Fu Games',
      id: 4,
      genre: 'أكشن',
      quality: '1080p',
      rating: 6.5,
      image:
        'https://i.pinimg.com/564x/8c/e3/5f/8ce35f08a33293522c4d60cbc5e642be.jpg',
      description:
        'حكي هذا الفيلم عن رجل مشغول دائما فاينبح وكان غط على هذا الجهاز, ',
      expandedMovieId: null,
      releaseYear: 2001,
    },
  ];

  isLoading = true;

  ngOnInit() {
    // Simulate fetching data asynchronously
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  showMore(movie: any): void {
    // Toggle movie description expansion
    this.movies = this.movies.map((m) =>
      m.id === movie.id
        ? { ...m, expandedMovieId: m.expandedMovieId ? null : movie.id }
        : m
    );
  }

  isExpanded(movie: any): boolean {
    return movie.expandedMovieId === movie.id;
  }

  trackByMovieId(index: number, movie: any): number {
    return movie.id;
  }
}
