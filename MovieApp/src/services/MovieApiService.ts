import axios, { AxiosInstance } from "axios";
import { API_KEY } from "../../config";
import { Movie } from "../app/types";
import { ApiResponse, Genre } from "./types";

class MovieApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: "https://api.kinopoisk.dev/v1.4",
      headers: {
        accept: "application/json",
        "X-API-KEY": API_KEY,
      },
    });
  }

  async fetchMovies(
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse> {
    try {
      const response = await this.api.get<ApiResponse>("/movie", {
        params: {
          page: page,
          limit: limit,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching movies:", error);
      throw error;
    }
  }

  async fetchGenres(): Promise<Genre[]> {
    try {
      const response = await this.api.get("/movie/possible-values-by-field", {
        params: {
          field: "genres.name",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching genres:", error);
      throw error;
    }
  }

  async fetchMovieById(id: number): Promise<Movie> {
    try {
      const response = await this.api.get<Movie>(`/movie/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching movie by id:", error);
      throw error;
    }
  }
}

export default MovieApiService;
