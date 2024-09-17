export interface Movies {
  id: String;
  title: String;
  image: String;
  date: String;
  overview: String;
  rating: Number;
  genres: String;
}
export interface AllMoives{
  movies: Movies[];
  message:String
}
