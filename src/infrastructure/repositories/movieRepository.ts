import { Movie, MovieRepository } from "../../domain";
import axios from "../backend/vhs-rental-be-php";

export default class MovieRepositoryImpl implements MovieRepository {
  async createMovie(movieData: Omit<Movie, "id">): Promise<Movie> {
    try {
      const response = await axios.post("/movies", movieData);
      return response.data;
    } catch (error) {
      throw new Error("Error al crear película");
    }
  }

  async deleteMovie(id: number): Promise<void> {
    try {
      await axios.delete(`/movies/${id}`);
    } catch (error) {
      throw new Error("Error al eliminar película");
    }
  }

  async getAllMovies(): Promise<Movie[]> {
    try {
      const response = await axios.get("/movies");
      return response.data;
    } catch (error) {
      throw new Error("Error al obtener películas: ");
    }
  }

  async getMovieById(id: number): Promise<Movie | null> {
    try {
      const response = await axios.get(`/movies/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Error al obtener película por ID");
    }
  }

  async updateMovie(movieData: Movie): Promise<Movie> {
    try {
      const response = await axios.put(`/movies/${movieData.id}`, movieData);
      return response.data;
    } catch (error) {
      throw new Error("Error al actualizar película");
    }
  }
}
