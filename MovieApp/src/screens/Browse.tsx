import React, { useEffect, useState, useCallback } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MovieApiService from "../services/MovieApiService";
import { Movie } from "../app/types";
import MovieCard from "../components/MovieCard";
import { Picker } from "@react-native-picker/picker";

export default function Browse({ navigation }: any) {
  const [movies, setMovies] = useState<Movie[] | any[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[] | any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const totalPages = 10;
  const [searchQuery, setSearchQuery] = useState("");

  const fetchMovies = useCallback(async () => {
    try {
      setIsLoading(true);
      const movieService = new MovieApiService();
      const data = await movieService.fetchMovies(page);
      setMovies(data.docs);
      // setTotalPages(data.pages);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("Не удалось загрузить фильмы. Пожалуйста, попробуйте позже.");
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  useEffect(() => {
    if (movies) {
      let result = [...movies];

      if (searchQuery) {
        result = result.filter((movie) =>
          movie.name?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      setFilteredMovies(result);
    }
  }, [searchQuery, movies]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FC094C" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="white" />
        </Pressable>

        <View style={styles.searchContainer}>
          <Icon
            name="search"
            size={24}
            color="#CCCCCC"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Поиск фильмов..."
            placeholderTextColor="#999999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {filteredMovies && filteredMovies.length > 0 ? (
          filteredMovies
            .filter((movie) => movie && movie.poster)
            .map((movie) => (
              <MovieCard key={movie.id} movie={movie} navigation={navigation} />
            ))
        ) : (
          <Text style={styles.noMoviesText}>Фильмы не найдены</Text>
        )}

        <View style={styles.pagination}>
          <TouchableOpacity
            onPress={handlePrevPage}
            disabled={page === 1}
            style={[styles.pageButton, page === 1 && styles.pageButtonDisabled]}
          >
            <Text style={styles.pageButtonText}>{"< Назад"}</Text>
          </TouchableOpacity>
          <Text style={styles.pageNumber}>
            {page} / {totalPages}
          </Text>
          <TouchableOpacity
            onPress={handleNextPage}
            disabled={page === totalPages}
            style={[
              styles.pageButton,
              page === totalPages && styles.pageButtonDisabled,
            ]}
          >
            <Text style={styles.pageButtonText}>{"Вперед >"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B1819",
  },
  scrollContent: {
    paddingTop: 80,
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1B1819",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1B1819",
  },
  errorText: {
    color: "#FC094C",
    fontSize: 16,
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2A2627",
    borderRadius: 20,
    paddingHorizontal: 16,
    marginHorizontal: 24,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    paddingVertical: 12,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 24,
    marginBottom: 16,
  },
  pickerWrapper: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: "#2A2627",
    borderRadius: 20,
    overflow: "hidden",
  },
  picker: {
    color: "#FFFFFF",
    backgroundColor: "transparent",
  },
  noMoviesText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 24,
  },
  pageButton: {
    backgroundColor: "#FC094C",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  pageButtonDisabled: {
    backgroundColor: "rgba(252, 9, 76, 0.5)",
  },
  pageButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  pageNumber: {
    color: "white",
    fontSize: 14,
  },
});
