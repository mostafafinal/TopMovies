import { Routes } from '@angular/router';
import { MoviesPageComponent } from './components/movies-page/movies-page.component';
import { TvShowsPageComponent } from './components/tv-shows-page/tv-shows-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { DetailsPageComponent } from './components/details-page/details-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  { path: 'movies', component: MoviesPageComponent },
  { path: 'tvshows', component: TvShowsPageComponent },
  { path: 'detailspage', component:DetailsPageComponent },
];
