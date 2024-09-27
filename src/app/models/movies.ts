export interface Movies {
  _id: string;
  title: String;
  image: String;
  date: string;
  overview: string;
  rating: any;
  isReleased: boolean;
  isAdult: boolean;
  original_language: string;
  tagline: string;
  genres: string[];
  production_companies: string[];
  production_countries: string[];
  spoken_languages: string[];
  keywords: string[];
  vote_average: number;
  vote_count: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
