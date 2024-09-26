import { Routes } from '@angular/router';
import { MoviesPageComponent } from './components/movies-page/movies-page.component';
import { FavoritesPageComponent } from './components/favorites-page/favoritespage.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { DetailsPageComponent } from './components/details-page/details-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';
import { ForLaterPageComponent } from './components/forlater-page/forlater.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePageComponent,
  },
  { path: 'movies', component: MoviesPageComponent },
  {
    path: 'favorites',
    component: FavoritesPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'forlater',
    component: ForLaterPageComponent,
    canActivate: [authGuard],
  },
  { path: 'detailspage/:id', component: DetailsPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'userpage', component: UserPageComponent, canActivate: [authGuard] },
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', redirectTo: '/notfound', pathMatch: 'full' },
];
