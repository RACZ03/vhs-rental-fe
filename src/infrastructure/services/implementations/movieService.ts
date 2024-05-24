import { IMovie, MovieRepository, MovieService } from "../../../domain";

export class MovieServiceImpl implements MovieService {
  constructor(private MovieRepository: MovieRepository) {}
  
  async createMovie(MovieData: Omit<IMovie, "id">): Promise<IMovie> {
    return this.MovieRepository.createMovie(MovieData);
  }

  async deleteMovie(id: number): Promise<void> {
    return this.MovieRepository.deleteMovie(id);
  }

  async getAllMovies(): Promise<IMovie[]> {
    return this.MovieRepository.getAllMovies();
  }

  async getMovieById(id: number): Promise<IMovie | null> {
    return this.MovieRepository.getMovieById(id);
  }

  async updateMovie(MovieData: IMovie): Promise<IMovie> {
    return this.MovieRepository.updateMovie(MovieData);
  }
}
