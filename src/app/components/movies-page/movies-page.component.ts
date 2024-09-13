import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Movies } from '../../models/movies';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movies-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movies-page.component.html',
  styleUrl: './movies-page.component.css',
})
export class MoviesPageComponent {
  allMovies: Movies[] = [];
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

  trackByMovieId(movie: any): number {
    return movie.id;
  }
  constructor(private movieService: MoviesService) {}

  ngOnInit(): void {
    this.getMovies();
  }
  getMovies() {
    this.movieService.getMovies().subscribe((data) => {
      this.allMovies = data.movies;
      console.log(this.allMovies);
    });
  }
}
