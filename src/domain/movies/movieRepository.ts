import { IMovie } from "../shared/types";

export abstract class MovieRepository {
    abstract createMovie(movieData: Omit<IMovie, 'id'>): Promise<IMovie>;
    abstract deleteMovie(id: number): Promise<void>;
    abstract getAllMovies(): Promise<IMovie[]>;
    abstract getMovieById(id: number): Promise<IMovie | null>;
    abstract updateMovie(movieData: IMovie): Promise<IMovie>;
  }